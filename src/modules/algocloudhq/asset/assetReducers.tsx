import { combineReducers } from 'redux';

import list from 'src/modules/algocloudhq/asset/list/assetListReducers';
import show from 'src/modules/algocloudhq/asset/show/assetShowReducers';

export default combineReducers({
  list,
  show,
});
