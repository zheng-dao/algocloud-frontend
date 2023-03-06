import actions from 'src/modules/algocloudhq/pools/poolsActions';

const initialData = {
  loading: false,
  list: [],
  show: {
    'assetOneUnitName': '',
    'assetTwoUnitName': '',
    'assetOneReserves': '',
    'assetTwoReserves': '',
    'liquidity': '',
    'lastDayVolume': '',
    'lastWeekVolume': '',
  },
  hourlyOneRates: [],
  hourlyTwoRates: [],
  dailyOneRates: [],
  dailyTwoRates: [],
  dailyPoolData: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }
  
  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      ...(payload.data)
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false
    };
  }

  return state;
};
