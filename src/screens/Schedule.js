import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import { setModalVisible, storeUser } from '../actions/directive';

import ModalLogin from '../components/schedule/ModalLogin';
import StatusBarComp from '../components/StatusBarComp';
import HeaderSchedule from '../components/schedule/HeaderSchedule';
import DateSchedule from '../components/schedule/DateSchedule';
import TabContainer from '../components/schedule/TabContainer';

const Schedule = props => (
  <Container>
    <StatusBarComp />
    <ModalLogin {...props} />
    <HeaderSchedule {...props} />
    <DateSchedule {...props} />
    <TabContainer {...props} />
  </Container>
);

Schedule.navigatorStyle = {
  navBarHidden: true,
  statusBarColor: 'rgba(0,0,0,0.20)',
};

const mapStateToProps = state => ({
  date: state.directiveReducer.dateTab,
  isVisible: state.directiveReducer.isVisible,
});

const mapDispatchToProps = dispatch => ({
  setModalVisible: () => dispatch(setModalVisible()),
  storeUser: user => dispatch(storeUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Schedule);
