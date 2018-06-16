/* eslint no-unreachable: 0 */
const initialState = {
  listNews: [],
  listSchedule: [],
  filteredListSchedule: [],
  scores: [],
  filteredScores: [],
  ips: [],
  filteredIps: [],
  ipk: 0,
  calendar: [],
  fetching: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_PENDING':
      return { ...state, fetching: true };
      break;

    case 'FETCH_NEWS_FULFILLED':
      return {
        ...state,
        fetching: false,
        listNews: action.payload.data.list,
        error: '',
      };
      break;

    case 'FETCH_NEWS_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
      break;

    case 'FETCH_CALENDAR_PENDING':
      return { ...state, fetching: true };
      break;

    case 'FETCH_CALENDAR_FULFILLED':
      return {
        ...state,
        fetching: false,
        calendar: action.payload.data,
        error: '',
      };
      break;

    case 'FETCH_CALENDAR_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
      break;

    case 'FETCH_SCHEDULE_PENDING':
      return { ...state, fetching: true };
      break;

    case 'FETCH_SCHEDULE_FULFILLED':
      return {
        ...state,
        fetching: false,
        listSchedule: action.payload.data,
        filteredListSchedule: action.payload.data,
        error: '',
      };
      break;

    case 'FETCH_SCHEDULE_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
      break;

    case 'FETCH_GRADE_POINT_PENDING':
      return { ...state, fetching: true };
      break;

    case 'FETCH_GRADE_POINT_FULFILLED':
      return {
        ...state,
        fetching: false,
        scores: action.payload.data.finalScores,
        ips: action.payload.data.ips,
        ipk: action.payload.data.ipk,
        error: '',
      };
      break;

    case 'FETCH_GRADE_POINT_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
      break;

    case 'FILTER_LIST_SCHEDULE':
      return {
        ...state,
        filteredListSchedule: action.payload,
        isFiltering: true,
      };
      break;

    default:
      break;
  }
  return state;
};

export default reducer;
