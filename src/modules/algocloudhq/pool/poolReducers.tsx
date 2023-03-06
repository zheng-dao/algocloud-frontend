import { combineReducers } from 'redux';

import list from 'src/modules/algocloudhq/pool/list/poolListReducers';
import show from 'src/modules/algocloudhq/pool/show/poolShowReducers';

export default combineReducers({
  list,
  show,
});
