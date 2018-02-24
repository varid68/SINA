/* eslint-disable */

export function setModalVisible() {
  return {
    type: 'SET_MODAL_VISIBLE',
  };
}

export function storeUser(user) {
  return {
    type: 'STORE_USER',
    payload: user,
  };
}

export function setDate(newDate) {
  return {
    type: 'SET_DATE',
    payload: newDate,
  };
}

export function filterListModul(newList) {
  return {
    type: 'FILTER_LIST_MODUL',
    payload: newList,
  };
}

export function filterListSchedule(newList) {
  return {
    type: 'FILTER_LIST_SCHEDULE',
    payload: newList,
  };
}

export function resetDrawer() {
  return {
    type: 'RESET_DRAWER',
  };
}

export function changeSemester(semester) {
  return {
    type: 'CHANGE_SELECTED_SEMESTER',
    payload: semester,
  };
}
