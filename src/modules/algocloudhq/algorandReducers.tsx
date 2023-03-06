import { combineReducers } from 'redux';
import overview from 'src/modules/algocloudhq/overview/overviewReducers';
import global from 'src/modules/algocloudhq/global/globalReducers';
import favorite from 'src/modules/algocloudhq/favorite/favoriteReducers';
import asset from 'src/modules/algocloudhq/asset/assetReducers';
import pool from 'src/modules/algocloudhq/pool/poolReducers';

export default combineReducers({
  overview,
  global,
  favorite,
  asset,
  pool,
});
