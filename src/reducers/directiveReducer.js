/* eslint no-unreachable: 0 */
import moment from 'moment';
import 'moment/locale/id';

const fullDate = moment().format('ll');
const initialState = {
  drawer: false,
  dateTab: fullDate,
  isVisible: true,
  user: [],
  selectedSemester: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, dateTab: action.payload };
      break;

    case 'SET_MODAL_VISIBLE':
      return { ...state, isVisible: !state.isVisible };
      break;

    case 'STORE_USER': {
      let semester = null;
      switch (action.payload.semester) {
        case 'I': semester = null;
          break;

        case 'II': semester = 'I';
          break;

        case 'Akselerasi I': semester = 'II';
          break;

        case 'III': semester = 'Akselerasi I';
          break;

        case 'IV': semester = 'III';
          break;

        default: semester = 'IV';
          break;
      }

      return { ...state, user: action.payload, selectedSemester: semester };
      break;
    }

    case 'RESET_DRAWER':
      return { ...state, drawer: !state.drawer };
      break;

    case 'CHANGE_SELECTED_SEMESTER':
      return { ...state, selectedSemester: action.payload };
      break;

    default:
      return state;
      break;
  }
  return state;
};

export default reducer;
