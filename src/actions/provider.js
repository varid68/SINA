/* eslint-disable */
import axios from 'axios';

export function fetchNews() {
  return {
    type: 'FETCH_NEWS',
    payload: axios.get('http://chylaceous-thin.000webhostapp.com/public/news/'),
  };
}

export function fetchCalendar() {
  return {
    type: 'FETCH_CALENDAR',
    payload: axios.get('http://chylaceous-thin.000webhostapp.com/public/calendar/'),
  };
}

export function fetchModul() {
  return {
    type: 'FETCH_MODUL',
    payload: axios.get('http://chylaceous-thin.000webhostapp.com/public/modul/'),
  };
}

export function fetchSchedule(semester) {
  return {
    type: 'FETCH_SCHEDULE',
    payload: axios.get(`http://chylaceous-thin.000webhostapp.com/public/schedule/${semester}`),
  };
}

export function fetchPoint(nim) {
  return {
    type: 'FETCH_POINT',
    payload: axios.get('http://chylaceous-thin.000webhostapp.com/public/point/' + nim),
  };
}

export function fetchIpk(nim) {
  return {
    type: 'FETCH_IPK',
    payload: axios.get('http://chylaceous-thin.000webhostapp.com/public/ipk/' + nim),
  };
}
