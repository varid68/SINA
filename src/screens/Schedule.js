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
    OneSignal.init('2c7ad97d-4e18-4c4c-b2fe-12016a3b1565', { kOSSettingsKeyAutoPrompt: true });
  }

  componentDidMount() {
    this.onReceived = this.onReceived.bind(this);
    this.onOpened = this.onOpened.bind(this);
    this.onIds = this.onIds.bind(this);
    this.onEmailRegistrationChange = this.onEmailRegistrationChange.bind(this);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.addEventListener('emailSubscription', this.onEmailRegistrationChange);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    OneSignal.removeEventListener('emailSubscription', this.onEmailRegistrationChange);
  }

  onEmailRegistrationChange(registration) {
    console.log('onEmailRegistrationChange: ', registration);
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
  jurusan: state.directiveReducer.user.jurusan,
});

const mapDispatchToProps = dispatch => ({
  setModalVisible: () => dispatch(setModalVisible()),
  fetchSchedule: (semester, jurusan) => dispatch(fetchSchedule(semester, jurusan)),
  storeUser: user => dispatch(storeUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Schedule);
