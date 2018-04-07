import React from 'react';
import { Text, TouchableOpacity, Alert, Linking, StatusBar, StyleSheet } from 'react-native';
import { Header, Left, Body, Icon, Right } from 'native-base';

import PropTypes from 'prop-types';

import PopupMenu from '../../components/PopupMenu';

export default class MyHeader extends React.Component {
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
      'If you have any trouble while using this application, feel free to get in touch with me on email',
      [{ text: 'OKAY' }],
      { cancelable: false },
    );
  }

  beriBintang = () => {
    const url = 'https://play.google.com/store/apps/details?id=name.ratson.uiexplorer';
    Linking.openURL(url).catch();
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  render() {
    return (
      <Header
        hasTabs
        style={{ backgroundColor: '#4caf50' }}>
        <StatusBar
          translucent
          backgroundColor="rgba(0,0,0,0.2)" />
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
          <Text style={{ color: '#fff', marginLeft: -20 }}>Grade Point Average</Text>
        </Body>
        <Right>
          <PopupMenu
            actions={['Tentang aplikasi', 'Beri bintang 5']}
            onPress={this.showPopup} />
        </Right>
      </Header>
    );
  }
}


const styles = StyleSheet.create({
  containerMenu: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
});
