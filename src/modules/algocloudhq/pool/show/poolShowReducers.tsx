import actions from 'src/modules/algocloudhq/pool/show/poolShowActions';

const initialData = {
  loading: false,
  data: {
    'assetOneUnitName': '',
    'assetTwoUnitName': '',
    'assetOneReserves': '',
    'assetTwoReserves': '',
    'liquidity': '',
    'lastDayVolume': '',
    'lastWeekVolume': '',
    'lastDayLiquidityChange': 0,
    'lastDayVolumeChange': 0,
    'lastWeekVolumeChange': 0
  },
  hourlyOneRates: [] as Array<any>,
  hourlyTwoRates: [] as Array<any>,
  dailyOneRates: [] as Array<any>,
  dailyTwoRates: [] as Array<any>,
  hourlyPoolData: [] as Array<any>,
  dailyPoolData: [] as Array<any>,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.RESET) {
    return initialData;
  }

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
      data: payload.data,
      hourlyOneRates: payload.hourlyOneRates,
      hourlyTwoRates: payload.hourlyTwoRates,
      dailyOneRates: payload.dailyOneRates,
      dailyTwoRates: payload.dailyTwoRates,
      hourlyPoolData: payload.hourlyPoolData,
      dailyPoolData: payload.dailyPoolData,
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
