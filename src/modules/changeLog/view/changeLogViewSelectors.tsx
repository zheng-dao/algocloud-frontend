import { createSelector } from 'reselect';

const selectRaw = (state) => state.changeLog.view;

const selectChangeLog = createSelector(
  [selectRaw],
  (raw) => raw.changeLog,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const changeLogViewSelectors = {
  selectLoading,
  selectChangeLog,
  selectRaw,
};

export default changeLogViewSelectors;
