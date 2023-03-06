import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/algorand/asset/show/assetShowActions';
import selectors from 'src/modules/algorand/asset/show/assetShowSelectors';
import noteSelectors from 'src/modules/note/noteSelectors';
import { formatPercent, formattedNum } from 'src/modules/algorand/utils';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import AssetChart from 'src/view/algorand/components/AssetChart';
import PoolsTable from 'src/view/algorand/pages/asset/show/PoolsTable';
import { SectionTitleBar, SectionTitle } from 'src/view/algorand/styled';
import { images } from 'src/images/images';
import NoNotes, { NoteCard, NoteModal } from 'src/view/algorand/components/Notes';
import noteActions from 'src/modules/note/noteActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import ReactTooltip from 'react-tooltip';

const AssetShowPage = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const assetId = match.params.assetId;
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(actions.doReset());
    dispatch(actions.doFetch(assetId));
    dispatch(noteActions.doFetch(assetId))
  }, [dispatch, assetId]);

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

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Assets', '/algorand/assets'],
          [`Asset-${assetName}`]
        ]}
      />
      <div className='row' style={{ paddingTop: 20 }}>
        <div className='col-sm-12 flex-row' style={{ display: 'flex', alignItems: 'center' }}>
          <img className='token' src={image} style={{ width: 40, marginRight: 10, objectFit: 'contain', float: 'left', marginBottom: 8 }}></img>

          <h3 style={{ marginRight: 10, display: 'flex' }}>{asset['unitName']}          {
            asset.isVerified && 
                   <span
                data-tip={i18n('common.headlineVerified')}
                data-for="shield-verified-help-tooltip"
                data-html={true}
              >
                <div  style={{ fontSize: "22px", cursor: 'pointer', marginTop: '-6px', marginLeft: '2px' }}
                  className="bi bi-shield-check text-primary"
                />
                <ReactTooltip id="shield-verified-help-tooltip" />
              </span>
          }</h3>

          <h5 className='text-info mobile' style={{ marginRight: 20 }}>{priceData.length > 0 ? formattedNum(priceData[priceData.length - 1]['close'], true) : formattedNum(0)}</h5>
          <h6 className={(parseFloat(formatPercent(asset['lastDayPriceChange'], 3)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayPriceChange'], 2)}</h6>
         
        </div>
      </div>
      <div className='row'>
        <div className="assets-mobile col-lg-4 col-sm-12 d-flex flex-column justify-content-between">
          <ContentWrapper style={{ flex: 1 }} className="assets-mobile-card card-hover-2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 className="grow">Liqudity</h6>

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
            <h5 className='text-info-2 mobile'>{formattedNum(asset['liquidity'], true)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{ flex: 1 }} className="assets-mobile-card card-hover-2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 className="grow">Volume</h6>

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
            <h5 className='text-info-2 mobile'>{formattedNum(asset['lastDayVolume'], true)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{ flex: 1 }} className="assets-mobile-card card-hover-2">

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 className="grow">Price</h6>

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
            <h5 className='text-info-2 mobile'>{priceData.length > 0 ? formattedNum(priceData[priceData.length - 1]['close'], true) : formattedNum(0)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{ flex: 1 }} className="assets-mobile-card card-hover-2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 className="grow">Market Cap</h6>
            </div>
            <h5 className='text-info-2 mobile'>{formattedNum(asset['marketCap'], true)}</h5>
          </ContentWrapper>
        </div>
        <div className="asset-m0 col-lg-8 col-sm-12 ">
          <AssetChart
            color='--var(algoucloud-primary)'
            data={asset}
            assetData={assetData}
            priceData={priceData}
          />
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

      <ContentWrapper className="card-hover">
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
