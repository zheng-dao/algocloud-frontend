import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algocloudhq/asset/show/assetShowActions';
import selectors from 'src/modules/algocloudhq/asset/show/assetShowSelectors';
import noteSelectors from 'src/modules/note/noteSelectors';
import authSelectors from 'src/modules/auth/authSelectors';
import settingsSelectors from 'src/modules/settings/settingsSelectors';
import { formatPercent, formattedNum } from 'src/modules/algocloudhq/utils';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import AssetChart from 'src/view/algocloudhq/components/AssetChart';
import PoolsTable from 'src/view/algocloudhq/pages/asset/show/PoolsTable';
import { SectionTitleBar, SectionTitle } from 'src/view/algocloudhq/styled';
import { images } from 'src/images/images';
import NoNotes, { NoteCard, NoteModal } from 'src/view/algocloudhq/components/Notes';
import noteActions from 'src/modules/note/noteActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import ReactTooltip from 'react-tooltip';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window, CustomStyles, CustomClasses, ChannelHeaderProps, useChannelStateContext, Avatar } from 'stream-chat-react';
import config from 'src/config';
import Spinner from 'src/view/shared/Spinner';

import 'stream-chat-react/dist/css/index.css';
import '@stream-io/stream-chat-css/dist/css/index.css';

const apiKey = config.STREAM_API_KEY;

const options = { state: true, watch: true, presence: true, limit: 8 };

const sort = {
  last_message_at: -1,
  updated_at: -1,
  cid: 1,
};

const AssetShowPage = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const assetId = match.params.assetId;
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const selectTheme = useSelector(settingsSelectors.selectTheme);
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(actions.doReset());
    dispatch(actions.doFetch(assetId));
    dispatch(noteActions.doFetch(assetId));
  }, [dispatch, assetId]);

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const loading = useSelector(selectors.selectLoading);
  const asset = useSelector(selectors.selectAsset);
  const pools = useSelector(selectors.selectPools);
  const assetName = useSelector(selectors.selectAssetName);
  const assetData = useSelector(selectors.selectDailyAssetData);
  const priceData = useSelector(selectors.selectHourlyPrices);
  const notes = useSelector(noteSelectors.selectNotes);
  let image = asset['assetId'] === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${asset['assetId']}.png`;
  for (let i = 0; i < images?.length; i++) {
    const img = images[i];
    let id = parseInt(img.split('-')[1]);
    if (id === asset['assetId']) {
      image = `/assets/asa-list/${img}/icon.png`;
      break;
    }
  }

  const userToConnect = { id: currentUser.id, name: currentUser.fullName, image: userAvatar };
  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey, {
        enableInsights: true,
        enableWSFallback: true,
      });
      const userToken = client.devToken(userToConnect.id);
      // await client.disconnect();
      await client.connectUser(userToConnect, userToken);
      const channel = client.channel('messaging', assetId, {
        image: image,
        name: assetName,
      });
      await channel.watch();
      await channel.addMembers([userToConnect.id]);
      setChatClient(client);
      setChannel(channel);
    };
    setCount(count + 1);
    if (!loading) {
      setTimeout(() => {
        if (count === 2) {
          setCount(0);
          initChat();
        }
      }, 500);
    }

    // return () => chatClient?.disconnectUser();
  }, [loading]);

  useEffect(() => {
    console.log('selectTheme: ', selectTheme);
    if (selectTheme === "dark" || selectTheme === null) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [selectTheme]);

  useEffect(() => {
    /*
     * Get the actual rendered window height to set the container size properly.
     * In some browsers (like Safari) the nav bar can override the app.
     */
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();

    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);


  const handleOpenCreateNoteModal = () => {
    setOpenCreateModal(true);
  }

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  }

  const onDeleteNote = (d) => {
    setCurrentNote(d.id);
    setShowDeleteModal(true);
  }

  const handleDeleteNote = () => {
    setShowDeleteModal(false);
    dispatch(noteActions.doDeleteNote(currentNote));
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  }

  const onEditNote = (d) => {
    setCurrentNote(d);
    setOpenCreateModal(true);
  }

  const customStyles: CustomStyles = {
    '--border': '#141924',

  };

  const customClasses: CustomClasses = {
    chat: 'custom-chat',
    thread: 'custom-thread',
    // messageList: 'custom-message-list'
  };

  const CustomChannelHeader = (props: ChannelHeaderProps) => {
    const { title } = props;

    const { channel } = useChannelStateContext();
    const { name, image, member_count } = channel.data || {};

    return (
      <div className='d-flex align-items-center channel-header'>
        <Avatar image={image} name={name} shape='rounded' size={35} />
        <div>{title || name} {member_count} online</div>
      </div>
    );
  };

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algocloudhq.menu'), '/algocloudhq'],
          ['Assets', '/algocloudhq/assets'],
          [`Asset-${assetName}`]
        ]}
      />
      <div className='row' style={{ paddingTop: 20 }}>
        <div className="ol-token-card" style={{ maxWidth: "100%", alignItems: "center" }}>
          <div className="token-card" style={{ width: "min-content" }}>
            <img className='token card-token' alt="" src={image} style={{ width: 60 }}></img>
          </div>
          <div className="col-sm w-130">
            <div className='d-flex align-items-center'>
              <h5 className="banner-ticker mr-2" >{asset['unitName']}</h5>
              {/* <h6 className={(parseFloat(formatPercent(asset['lastDayPriceChange'], 3)) < 0) ? 'text-danger' : 'text-success'}
                style={{ marginLeft: '5px' }}
              >
                {formatPercent(asset['lastDayPriceChange'], 2)}
              </h6> */}
              {
                asset.isVerified && <span
                  data-tip={i18n('common.headlineVerified')}
                  data-for="shield-verified-help-tooltip"
                  data-html={true}
                >
                  <div style={{ fontSize: "22px", cursor: 'pointer', marginTop: '-5px', marginLeft: '2px' }}
                    className="bi bi-shield-check text-primary"
                  />
                  <ReactTooltip id="shield-verified-help-tooltip" />
                </span>
              }
            </div>

            <h6 className='ww'>{asset.name}</h6>
          </div>
          <div className="p-2 col-sm w-130">
            <div className='d-flex align-items-center'>
              <h6 className="ww">Liquidity</h6>
              <div className={(parseFloat(formatPercent(asset['lastDayLiquidityChange'], 6)) < 0) ? 'ms-2 badge badge-soft-warning rounded-pill' : 'ms-2 badge badge-soft-info rounded-pill'} style={{ display: 'flex', alignItems: 'center' }}>
                <span className={(parseFloat(formatPercent(asset['lastDayLiquidityChange'], 6)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayLiquidityChange'], 2)}
                  {asset['lastDayLiquidityChange'] ? (parseFloat(formatPercent(asset['lastDayLiquidityChange'], 6)) < 0) ? <span>{'  '}<i
                    className={`fas fa-arrow-down`}
                  ></i></span> : <span>{'  '}<i
                    className={`fas fa-arrow-up`}
                  ></i></span> : ''}
                </span>
              </div>
            </div>

            <h5 className="banner-ticker" >{formattedNum(asset['liquidity'], true)}</h5>
          </div>
          <div className="p-2 col-sm w-130">
            <div className='d-flex align-items-center'>
              <h6 className="ww">Volume</h6>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div className={(parseFloat(formatPercent(asset['lastDayVolumeChange'], 6)) < 0) ? 'ms-2 badge badge-soft-warning rounded-pill' : 'ms-2 badge badge-soft-info rounded-pill'} style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={(parseFloat(formatPercent(asset['lastDayVolumeChange'], 6)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayVolumeChange'], 2)}
                    {asset['lastDayVolumeChange'] ? (parseFloat(formatPercent(asset['lastDayVolumeChange'], 6)) < 0) ? <span>{'  '}<i
                      className={`fas fa-arrow-down`}
                    ></i></span> : <span>{'  '}<i
                      className={`fas fa-arrow-up`}
                    ></i></span> : ''}
                  </span>
                </div>
              </div>
            </div>
            <h5 className='banner-ticker'>{formattedNum(asset['lastDayVolume'], true)}</h5>

          </div>
          <div className="p-2 col-sm w-130">
            <div className='d-flex align-items-center'>
              <h6 className="ww">Price</h6>
              <div className={(parseFloat(formatPercent(asset['lastDayPriceChange'], 6)) < 0) ? 'ms-2 badge badge-soft-warning rounded-pill' : 'ms-2 badge badge-soft-info rounded-pill'} style={{ display: 'flex', alignItems: 'center' }}>
                <span className={(parseFloat(formatPercent(asset['lastDayPriceChange'], 6)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayPriceChange'], 2)}
                  {asset['lastDayPriceChange'] ? (parseFloat(formatPercent(asset['lastDayPriceChange'], 6)) < 0) ? <span>{'  '}<i
                    className={`fas fa-arrow-down`}
                  ></i></span> : <span>{'  '}<i
                    className={`fas fa-arrow-up`}
                  ></i></span> : ''}
                </span>
              </div>
            </div>
            <h5 className='banner-ticker ' >{priceData.length > 0 ? formattedNum(priceData[priceData.length - 1]['close'], true) : formattedNum(0)}</h5>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className="assets-mobile col-lg-8 col-sm-12 ">
          <AssetChart
            color='--var(algoucloud-primary)'
            data={asset}
            assetData={assetData}
            priceData={priceData}
          />
        </div>
        <div className="asset-m0 chat-section col-lg-4 col-sm-12 d-flex flex-column justify-content-between">

          <ContentWrapper style={{ flex: 1, maxHeight: 525, padding: 0 }} className="assets-mobile-card card-hover-2 chat-mobile-card">
            {
              loading && <Spinner />
            }
            {
              !loading && chatClient &&
              <Chat client={chatClient}
                customClasses={customClasses}
                customStyles={customStyles}
                theme={`messaging ${theme}`}>
                <Channel channel={channel}>
                  <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                    <Thread />
                  </Window>
                </Channel>
              </Chat>
            }
          </ContentWrapper>
        </div>
      </div>

      <ContentWrapper className="card-hover">
        <SectionTitleBar className="table-header">
          <SectionTitle>Top Pools</SectionTitle>
        </SectionTitleBar>
        <PoolsTable
          assetId={assetId}
          pools={pools}
        />
      </ContentWrapper>

      {
        openCreateModal && (
          <NoteModal
            onClose={handleCloseCreateModal}
            cancelText={i18n('note.modal.cancel')}
            okText={i18n('note.modal.okText')}
            assetId={assetId}
            note={currentNote}
          />
        )
      }

      {
        showDeleteModal && (
          <ConfirmModal
            title={i18n('note.modal.delete_title')}
            okText={i18n('note.delete')}
            cancelText={i18n('note.modal.cancel')}
            onConfirm={handleDeleteNote}
            onClose={handleCloseDeleteModal}
          />
        )
      }
    </>
  )
}

export default AssetShowPage;
