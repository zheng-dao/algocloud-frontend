import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { formatPercent, formattedNum } from 'src/modules/algorand/utils';
import actions from 'src/modules/algorand/pool/show/poolShowActions';
import selectors from 'src/modules/algorand/pool/show/poolShowSelectors';
import noteSelectors from 'src/modules/note/noteSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PoolChart from 'src/view/algorand/components/PoolChart';
import { SectionTitleBar, SectionTitle } from 'src/view/algorand/styled';
import NoNotes, { NoteCard, NoteModal } from 'src/view/algorand/components/Notes';
import noteActions from 'src/modules/note/noteActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import { images } from 'src/images/images';

const PoolShowPage = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const address = match.params.address;

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(actions.doFetch(address));
  }, [dispatch, address]);

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

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Pools', '/algorand/pools'],
          [`Pool (${poolName})`]
        ]}
      />

      {/* <ContentWrapper className="card-hover">
        <PageTitle>
          {loading && 'Pool'}
          {!loading && `Pool (${pool['assetOneUnitName']}-${pool['assetTwoUnitName']})`}
        </PageTitle>
      </ContentWrapper> */}
      <div className='row' style={{ paddingTop: 20 }}>
        <div className='col-sm-12 flex-row' style={{ display: 'flex', alignItems: 'center' }}>
          <img className='token' src={image1} style={{ width: 40, marginRight: 10, objectFit: 'contain', float: 'left', marginBottom: 8 }}></img>
          <img className='token' src={image2} style={{ width: 40, marginRight: 10, objectFit: 'contain', float: 'left', marginBottom: 8 }}></img>
          <h3 style={{ marginRight: 20 }}>{poolName}</h3>
          <h5 className='text-info' style={{ marginRight: 20 }}>{formattedNum(pool['lastDayVolume'], true)}</h5>
          <h6 className={(parseFloat(formatPercent(pool['lastDayVolumeChange'], 3)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(pool['lastDayVolumeChange'], 2)}</h6>
        </div>
      </div>

      <div className='row'>
        <div className="col-lg-4 col-sm-12 d-flex flex-column justify-content-between">
          <ContentWrapper style={{ flex: 1 }} className="card-hover-2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 className="grow">Liqudity</h6>

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

            <h5 className='text-info-2'>{formattedNum(pool['liquidity'], true)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{ flex: 1 }} className="card-hover-2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 className="grow">Volume (24hrs)</h6>

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
            <h5 className='text-info-2'>{formattedNum(pool['lastDayVolume'], true)}</h5>
          </ContentWrapper>
          <ContentWrapper style={{ flex: 1 }} className="card-hover-2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 className="grow">Volume (7days)</h6>

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

            <h5 className='text-info-2'>{formattedNum(pool['lastWeekVolume'], true)}</h5>
          </ContentWrapper>
          {/* <ContentWrapper style={{flex: 1}}>
            <h6>{`${pool['assetOneReserves']} ${pool['assetOneUnitName']}`}</h6>
            <h6>{`${pool['assetTwoReserves']} ${pool['assetTwoUnitName']}`}</h6>
          </ContentWrapper> */}
        </div>
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
      </div>
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
