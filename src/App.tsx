import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import { Provider } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import jQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import { Router } from 'react-router-dom';

(window as any).$ = (window as any).jQuery = jQuery;

const store = configureStore();

const App = (props) => {
  return (
    <Provider store={store}>
      <Router history={getHistory()}>
        <RoutesComponent />
      </Router>
    </Provider>
  );
};

export default App;
