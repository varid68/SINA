/* eslint no-console: 0, class-methods-use-this:0  */
import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import OneSignal from 'react-native-onesignal';

import { setModalVisible, storeUser } from '../actions/directive';
import { fetchSchedule } from '../actions/provider';

import ModalLogin from '../components/schedule/ModalLogin';
import StatusBarComp from '../components/StatusBarComp';
import HeaderSchedule from '../components/schedule/HeaderSchedule';
import DateSchedule from '../components/schedule/DateSchedule';
import TabContainer from '../components/schedule/TabContainer';

class Schedule extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0,0,0,0.20)',
  };

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log('Device had been registered for push notifications!', notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <Container>
        <StatusBarComp />
        <ModalLogin {...this.props} />
        <HeaderSchedule {...this.props} />
        <DateSchedule {...this.props} />
        <TabContainer {...this.props} />
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  date: state.directiveReducer.dateTab,
  isVisible: state.directiveReducer.isVisible,
  error: state.providerReducer.error,
});

const mapDispatchToProps = dispatch => ({
  setModalVisible: () => dispatch(setModalVisible()),
  fetchSchedule: () => dispatch(fetchSchedule()),
  storeUser: user => dispatch(storeUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Schedule);
