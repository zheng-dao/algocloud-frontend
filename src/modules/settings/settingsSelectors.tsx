import { createSelector } from 'reselect';

const selectRaw = (state) => state.settings;

const selectSettings = createSelector(
  [selectRaw],
  (raw) => raw.settings,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const selectChangeLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.changeLoading),
);

const selectTheme = createSelector(
  [selectRaw],
  (raw) => raw.theme,
);

const settingsSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectChangeLoading,
  selectSettings,
  selectTheme,
  selectRaw,
};

export default settingsSelectors;
