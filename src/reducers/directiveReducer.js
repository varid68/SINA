/* eslint no-unreachable: 0 */
import moment from 'moment';
import 'moment/locale/id';

const fullDate = moment().format('ll');
const initialState = {
  drawer: false,
  dateTab: fullDate,
  isVisible: true,
  user: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, dateTab: action.payload };
      break;

    case 'SET_MODAL_VISIBLE':
      return { ...state, isVisible: !state.isVisible };
      break;

    case 'STORE_USER':
      return { ...state, user: action.payload };
      break;

    case 'RESET_DRAWER':
      return { ...state, drawer: !state.drawer };
      break;

    default:
      return state;
      break;
  }
  return state;
};

export default reducer;
