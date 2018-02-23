/* eslint no-unreachable: 0 */
const initialState = {
  listNews: [],
  listModul: [],
  filteredListModul: [],
  listSchedule: [],
  filteredListSchedule: [],
  point: [],
  indeks: [],
  calendar: [],
  fetching: false,
  error: null,
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
      };
      break;

    case 'FETCH_CALENDAR_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
      break;

    case 'FETCH_MODUL_PENDING':
      return { ...state, fetching: true };
      break;

    case 'FETCH_MODUL_FULFILLED':
      return {
        ...state,
        fetching: false,
        listModul: action.payload.data,
        filteredListModul: action.payload.data,
      };
      break;

    case 'FETCH_MODUL_REJECTED':
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
      };
      break;

    case 'FETCH_SCHEDULE_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
      break;

    case 'FETCH_POINT_PENDING':
      return { ...state, fetching: true };
      break;

    case 'FETCH_POINT_FULFILLED':
      return {
        ...state,
        fetching: false,
        point: action.payload.data,
      };
      break;

    case 'FETCH_POINT_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
      break;

    case 'FETCH_INDEKS_PENDING':
      return { ...state, fetching: true };
      break;

    case 'FETCH_INDEKS_FULFILLED':
      return {
        ...state,
        fetching: false,
        indeks: action.payload.data,
      };
      break;

    case 'FETCH_INDEKS_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
      break;

    case 'FILTER_LIST_MODUL':
      return {
        ...state,
        filteredListModul: action.payload,
        isFiltering: true,
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
