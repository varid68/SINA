/* eslint no-console: 0 */
import React from 'react';
import { Text, TouchableOpacity, Alert, StatusBar, Linking, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';

import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import PopupMenu from '../PopupMenu';

export default class HeaderSchedule extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  componentDidMount() {
    Linking.addEventListener('url', this.beriBintang);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.beriBintang);
  }

  showPopup = (eventName, index) => {
    if (eventName !== 'itemSelected') return;
    if (index === 0) this.showAlert();
    else this.beriBintang();
  }

  showAlert = () => {
    Alert.alert(
      '',
      'If you have any trouble while using this application,' +
      'feel free to get in touch with me on email',
      [{ text: 'OKAY' }],
      { cancelable: false },
    );
  }

  beriBintang = () => {
    const url = 'https://play.google.com/store/apps/details?id=name.ratson.uiexplorer';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  };

  toSearchPage = () => {
    this.props.navigator.push({
      screen: 'push.Search',
      animated: true,
      animationType: 'slide-horizontal',
    });
  }

  toCalendarPage = () => {
    this.props.navigator.push({
      screen: 'push.AcademicCalendar',
      animated: true,
      animationType: 'slide-horizontal',
    });
  }

  render() {
    return (
      <Header
        style={styles.header}
        hasTabs>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0.20)"
          translucent />
        <Left>
          <TouchableOpacity
            style={styles.containerMenu}
            onPress={this.toggleDrawer}>
            <Icon
              name="menu"
              style={{ color: '#fff' }} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={styles.title}>Schedule</Text>
        </Body>
        <Right>
          <TouchableOpacity
            style={styles.containerIcon}
            onPress={this.toSearchPage}>
            <MaterialIcons
              name="search"
              style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerIcon}
            onPress={this.toCalendarPage}>
            <FontAwesome
              name="calendar"
              style={styles.calendarIcon} />
          </TouchableOpacity>
          <PopupMenu
            actions={['Tentang aplikasi', 'Beri bintang 5']}
            onPress={this.showPopup} />
        </Right>
      </Header>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4caf50',
    paddingRight: 0,
  },
  title: {
    color: '#fff',
    marginLeft: -20,
    fontSize: 16,
  },
  containerMenu: {
    width: 45,
    height: 50,
    justifyContent: 'center',
  },
  containerIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#fff',
    fontSize: 25,
  },
  calendarIcon: {
    color: '#fff',
    fontSize: 20,
  },
});
