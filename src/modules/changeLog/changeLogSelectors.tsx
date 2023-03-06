import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';

const selectPermissionToEdit = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    currentUser.superadmin
);

const changeLogSelectors = {
  selectPermissionToEdit
};

export default changeLogSelectors;
