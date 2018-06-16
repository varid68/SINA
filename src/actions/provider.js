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

export function fetchSchedule(semester, jurusan) {
  return {
    type: 'FETCH_SCHEDULE',
    payload: axios.get(`http://chylaceous-thin.000webhostapp.com/public/schedule/${semester}/${jurusan}/`),
  };
}

export function fetchGradePoint(nim) {
  return {
    type: 'FETCH_GRADE_POINT',
    payload: axios.get('http://chylaceous-thin.000webhostapp.com/public/grade-point/' + nim),
  };
}
