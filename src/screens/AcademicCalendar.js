import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import { fetchCalendar } from '../actions/provider';

import StatusBarComp from '../components/StatusBarComp';
import MyHeader from '../components/MyHeader';
import TimeLine from '../components/academic-calendar/TimeLine';

const AcademicCalendar = props => (
  <Container >
    <StatusBarComp />
    <MyHeader
      title="Academic calendar 2017"
      fromTab={false}
      {...props} />
    <TimeLine
      {...props} />
  </Container >
);

AcademicCalendar.navigatorStyle = {
  navBarHidden: true,
  statusBarColor: '#3d8c40',
};

const mapStateToProps = state => ({
  calendar: state.providerReducer.calendar,
  fetching: state.providerReducer.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchCalendar: () => {
    dispatch(fetchCalendar());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AcademicCalendar);
