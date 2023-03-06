import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/changeLog/list/changeLogListActions';
import selectors from 'src/modules/changeLog/list/changeLogListSelectors';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import moment from 'moment';

function ChangeLogTable(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doReset());
    dispatch(actions.doFetch());
  }, [dispatch]);

  const [
    recordIdToDestroy,
    setRecordIdToDestroy,
  ] = useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );

  const hasPermissionToEdit = useSelector(
    selectors.selectPermissionToEdit
  );;

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  return (
    <>
      <TableWrapper>
        <div className="table-responsive">
          <table className="table table-striped mt-2">
            <thead className="thead">
              <tr>
                {
                  hasPermissionToEdit && <TableColumnHeader className="th-checkbox">
                    {hasRows && (
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="table-header-checkbox"
                          checked={Boolean(isAllSelected)}
                          onChange={doToggleAllSelected}
                        />
                        <label
                          htmlFor="table-header-checkbox"
                          className="custom-control-label"
                        >
                          &#160;
                        </label>
                      </div>
                    )}
                  </TableColumnHeader>
                }

                <TableColumnHeader
                  onSort={doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={'date'}
                  label={i18n('changeLog.fields.date')}
                />
                <TableColumnHeader
                  onSort={doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={'description'}
                  label={i18n(
                    'changeLog.fields.description',
                  )}
                />
                <TableColumnHeader className="th-actions-sm" />
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={100}>
                    <Spinner />
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={100}>
                    <div className="d-flex justify-content-center">
                      {i18n('table.noData')}
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row) => (
                  <tr key={row.id}>
                    {
                      hasPermissionToEdit && <td className="th-checkbox" scope="row">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`table-header-checkbox-${row.id}`}
                            checked={selectedKeys.includes(
                              row.id,
                            )}
                            onChange={() =>
                              doToggleOneSelected(row.id)
                            }
                          />
                          <label
                            htmlFor={`table-header-checkbox-${row.id}`}
                            className="custom-control-label"
                          >
                            &#160;
                          </label>
                        </div>
                      </td>
                    }
                    <td>
                      {moment(row.date).format(
                        'YYYY-MM-DD',
                      )}
                    </td>
                    <td style={{ whiteSpace: 'pre-wrap'}}>{row.description}</td>
                    {
                      hasPermissionToEdit &&
                      <td className="td-actions">
                        <Link
                          className="btn btn-link"
                          to={`/change-logs/${row.id}/edit`}
                        >
                          {i18n('common.edit')}
                        </Link>
                        <button
                          className="btn btn-link"
                          onClick={() =>
                            setRecordIdToDestroy(row.id)
                          }
                        >
                          {i18n('common.destroy')}
                        </button>
                      </td>
                    }
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
        />
      </TableWrapper>
      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default ChangeLogTable;
