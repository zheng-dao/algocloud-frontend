import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { formatPercent, formattedNum } from 'src/modules/algocloudhq/utils';
import actions from 'src/modules/algocloudhq/pool/show/poolShowActions';
import selectors from 'src/modules/algocloudhq/pool/show/poolShowSelectors';
import noteSelectors from 'src/modules/note/noteSelectors';
import authSelectors from 'src/modules/auth/authSelectors';
import settingsSelectors from 'src/modules/settings/settingsSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PoolChart from 'src/view/algocloudhq/components/PoolChart';
import { SectionTitleBar, SectionTitle } from 'src/view/algocloudhq/styled';
import NoNotes, { NoteCard, NoteModal } from 'src/view/algocloudhq/components/Notes';
import noteActions from 'src/modules/note/noteActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import { images } from 'src/images/images';
import ReactTooltip from 'react-tooltip';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window, CustomStyles, CustomClasses, ChannelHeaderProps, useChannelStateContext, Avatar } from 'stream-chat-react';
import config from 'src/config';
import Spinner from 'src/view/shared/Spinner';

import 'stream-chat-react/dist/css/index.css';

const apiKey = config.STREAM_API_KEY;

const PoolShowPage = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const address = match.params.address;

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const selectTheme = useSelector(settingsSelectors.selectTheme);
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(actions.doFetch(address));
  }, [dispatch, address]);

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );

  const loading = useSelector(selectors.selectLoading);
  const pool = useSelector(selectors.selectPool);
  const poolName = useSelector(selectors.selectPoolName);
  const chartData = useSelector(selectors.selectDailyPoolData);
  const rateOneData = useSelector(selectors.selectHourlyOneRates);
  const rateTwoData = useSelector(selectors.selectHourlyTwoRates);
  const notes = useSelector(noteSelectors.selectNotes);

  let image1 =
    pool.assetOneId === 0
      ? '/assets/asa-list/ALGO/icon.png'
      : `https://algoexplorer.io/images/assets/big/light/${pool.assetOneId}.png`;
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    let id = parseInt(img.split('-')[1]);
    if (id == pool.assetOneId) {
      image1 = `/assets/asa-list/${img}/icon.png`;
      break;
    }
  }
  let image2 =
    pool.assetTwoId === 0
      ? '/assets/asa-list/ALGO/icon.png'
      : `https://algoexplorer.io/images/assets/big/light/${pool.assetTwoId}.png`;
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    let id = parseInt(img.split('-')[1]);
    if (id == pool.assetTwoId) {
      image2 = `/assets/asa-list/${img}/icon.png`;
      break;
    }
  }

  useEffect(() => {
    dispatch(noteActions.doPoolFetch(pool.id));
  }, [dispatch, pool]);

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
      const channel = client.channel('messaging', address, {
        image: image1,
        name: poolName,
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

    return () => chatClient?.disconnectUser();
  }, [loading]);

  useEffect(() => {
    console.log('selectTheme: ', selectTheme);
    if (selectTheme === "dark" || selectTheme === null) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [selectTheme]);

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
    dispatch(noteActions.doDeletePoolNote(currentNote));
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  }

  const onEditNote = (d) => {
    setCurrentNote(d);
    setOpenCreateModal(true);
  }

  const customStyles: CustomStyles = {
    '--bg-gradient-end': '#ffffff',
    '--bg-gradient-start': '#070a0d',
    '--black': '#ffffff',
    '--blue-alice': '#00193d',
    '--border': '#141924',
    '--button-background': '#ffffff',
    '--button-text': '#005fff',
    '--grey': '#7a7a7a',
    '--grey-gainsboro': '#2d2f2f',
    '--grey-whisper': '#1c1e22',
    '--modal-shadow': '#000000',
    '--overlay': '#00000066',
    '--overlay-dark': '#ffffffcc',
    '--shadow-icon': '#00000080',
    '--targetedMessageBackground': '#302d22',
    '--transparent': 'transparent',
    '--white': '#101418',
    '--white-smoke': '#13151b',
    '--white-snow': '#070a0d',
  };

  const customClasses: CustomClasses = {
    chat: 'pool-custom-chat',
    thread: 'custom-thread',
    // messageList: 'custom-message-list'
  };

  const CustomChannelHeader = (props: ChannelHeaderProps) => {
    const { title } = props;

    const { channel } = useChannelStateContext();
    const { name, image, member_count } = channel.data || {};

    return (
      <div className='d-flex align-items-center channel-header'>
        <Avatar image={image1} name={name} shape='rounded' size={35} />
        <Avatar image={image2} name={name} shape='rounded' size={35} />
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
          ['Pools', '/algocloudhq/pools'],
          [`Pool (${poolName})`]
        ]}
      />
      <div className='row' style={{ paddingTop: 20 }}>
        <div className="ol-token-card" style={{ maxWidth: "100%", alignItems: "center" }}>
          <div className="d-flex token-card" style={{ width: "min-content" }}>
            <img className='token card-token' alt="" src={image1} style={{ width: 60, marginRight: 10 }}></img>
            <img className='token card-token' alt="" src={image2} style={{ width: 60, marginRight: 10 }}></img>
          </div>
          <div className="col-sm w-100">
            <h3 className='ww'>{poolName}</h3>
          </div>
          <div className="p-2 col-sm w-100">
            <div className='d-flex align-items-center'>
              <h6 className="ww">Liquidity</h6>
              <div className={(parseFloat(formatPercent(pool['lastDayLiquidityChange'], 6)) < 0) ? 'ms-2 badge badge-soft-warning rounded-pill' : 'ms-2 badge badge-soft-info rounded-pill'} style={{ display: 'flex', alignItems: 'center' }}>
                <span className={(parseFloat(formatPercent(pool['lastDayLiquidityChange'], 6)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(pool['lastDayLiquidityChange'], 2)}
                  {pool['lastDayLiquidityChange'] ? (parseFloat(formatPercent(pool['lastDayLiquidityChange'], 6)) < 0) ? <span>{'  '}<i
                    className={`fas fa-arrow-down`}
                  ></i></span> : <span>{'  '}<i
                    className={`fas fa-arrow-up`}
                  ></i></span> : ''}
                </span>
              </div>
            </div>

            <h5 className="banner-ticker" >{formattedNum(pool['liquidity'], true)}</h5>
          </div>
          <div className="p-2 col-sm w-100">
            <div className='d-flex align-items-center'>
              <h6 className="ww">Volume (24hrs)</h6>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div className={(parseFloat(formatPercent(pool['lastDayVolumeChange'], 6)) < 0) ? 'ms-2 badge badge-soft-warning rounded-pill' : 'ms-2 badge badge-soft-info rounded-pill'} style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={(parseFloat(formatPercent(pool['lastDayVolumeChange'], 6)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(pool['lastDayVolumeChange'], 2)}
                    {pool['lastDayVolumeChange'] ? (parseFloat(formatPercent(pool['lastDayVolumeChange'], 6)) < 0) ? <span>{'  '}<i
                      className={`fas fa-arrow-down`}
                    ></i></span> : <span>{'  '}<i
                      className={`fas fa-arrow-up`}
                    ></i></span> : ''}
                  </span>
                </div>
              </div>
            </div>
            <h5 className='banner-ticker'>{formattedNum(pool['lastDayVolume'], true)}</h5>

          </div>
          <div className="p-2 col-sm w-100">
            <div className='d-flex align-items-center'>
              <h6 className="ww">Volume (7days)</h6>
              <div className={(parseFloat(formatPercent(pool['lastWeekVolumeChange'], 6)) < 0) ? 'ms-2 badge badge-soft-warning rounded-pill' : 'ms-2 badge badge-soft-info rounded-pill'} style={{ display: 'flex', alignItems: 'center' }}>
                <span className={(parseFloat(formatPercent(pool['lastWeekVolumeChange'], 6)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(pool['lastWeekVolumeChange'], 2)}
                  {pool['lastWeekVolumeChange'] ? (parseFloat(formatPercent(pool['lastWeekVolumeChange'], 6)) < 0) ? <span>{'  '}<i
                    className={`fas fa-arrow-down`}
                  ></i></span> : <span>{'  '}<i
                    className={`fas fa-arrow-up`}
                  ></i></span> : ''}
                </span>
              </div>
            </div>
            <h5 className='banner-ticker' >{formattedNum(pool['lastWeekVolume'], true)}</h5>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="asset-m0 col-lg-8 col-sm-12">
          <PoolChart
            color='#687dfd'
            loading={loading}
            pool={pool}
            chartData={chartData}
            rateOneData={rateOneData}
            rateTwoData={rateTwoData}
          />
        </div>
        <div className="asset-m0 chat-section col-lg-4 col-sm-12 d-flex flex-column justify-content-between">

          <ContentWrapper style={{ flex: 1 }} className="assets-mobile-card card-hover-2 chat-mobile-card">
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
                    <CustomChannelHeader />
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
      {/* <ContentWrapper className="card-hover">
        <SectionTitleBar className="table-header">
          <SectionTitle>Notes</SectionTitle>
          <button role='button' className='btn btn-primary btn-rounded' onClick={handleOpenCreateNoteModal}>
            <i className='fas fa-plus'></i>
          </button>
        </SectionTitleBar>
        {
          notes?.length === 0 ? (
            <NoNotes />
          ) : (
            notes?.map((note, index) => {
              return (
                <NoteCard
                  key={`note-${index}`}
                  note={note}
                  onDelete={() => onDeleteNote(note)}
                  onEdit={() => onEditNote(note)}
                />
              )
            })
          )
        }
      </ContentWrapper> */}
      {
        openCreateModal && (
          <NoteModal
            onClose={handleCloseCreateModal}
            cancelText={i18n('note.modal.cancel')}
            okText={i18n('note.modal.okText')}
            assetId={pool.id}
            note={currentNote}
            isPoolNote={true}
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
  );
}

export default PoolShowPage;
