import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/algocloudhq/asset/show/assetShowActions';
import selectors from 'src/modules/algocloudhq/asset/show/assetShowSelectors';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import PoolTable from 'src/view/algocloudhq/components/PoolTable';
import Pagination from 'src/view/shared/table/Pagination';

function PoolsTable({ assetId, pools }) {
  const dispatch = useDispatch();

  const loading = useSelector(
    selectors.selectLoading,
  );

  const pagination = useSelector(
    selectors.selectPagination,
  );

  const hasRows = useSelector(
    selectors.selectHasRows,
  );

  const sorter = useSelector(
    selectors.selectSorter,
  );

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';

    dispatch(
      actions.doChangeSort(
        assetId,
        {
          field,
          order,
        }
      ),
    );
  };

  const doPagination = (pagination) => {
    dispatch(actions.doChangePagination(assetId, pagination));
  };

  return (
    <div className="top-assets-table">
      <TableWrapper >
        <PoolTable
          loading={loading}
          pools={pools}
          hasRows={hasRows}
          sorter={sorter}
          doChangeSort={doChangeSort}
        />
      </TableWrapper>
      <Pagination
        onChange={doPagination}
        disabled={loading}
        pagination={pagination}
      />
    </div>
  )
}

export default PoolsTable;
