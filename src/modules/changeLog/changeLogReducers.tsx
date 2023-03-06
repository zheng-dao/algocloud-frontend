import list from 'src/modules/changeLog/list/changeLogListReducers';
import form from 'src/modules/changeLog/form/changeLogFormReducers';
import view from 'src/modules/changeLog/view/changeLogViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});