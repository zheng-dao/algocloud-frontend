import { createSelector } from 'reselect';

const selectRaw = (state) => state.changeLog.form;

const selectChangeLog = createSelector(
  [selectRaw],
  (raw) => raw.changeLog,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const changeLogFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectChangeLog,
  selectRaw,
};

export default changeLogFormSelectors;
