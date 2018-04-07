import React from 'react';
import {
  View, Text, TouchableOpacity, Linking,
  WebView, StatusBar, StyleSheet, Alert,
} from 'react-native';
import { Header, Body, Right, Icon } from 'native-base';

import PropTypes from 'prop-types';
import StatusBarComp from '../StatusBarComp';
import PopupMenu from '../PopupMenu';

export default class NewsDetail extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
  }

  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0,0,0,0.20)',
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

  renderHeader = () => (
    <Header style={{ backgroundColor: '#4caf50' }}>
      <StatusBar backgroundColor="#3d8c40" />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => this.props.navigator.pop()}>
        <Icon
          name="md-close"
          style={styles.closeIcon} />
      </TouchableOpacity>
      <Body>
        <Text style={styles.title}>News Detail</Text>
      </Body>
      <Right>
        <PopupMenu
          actions={['Tentang aplikasi', 'Beri bintang 5']}
          onPress={this.showPopup} />
      </Right>
    </Header >
  )

  renderLoading = () => (
    <Text>Please Wait... loading</Text>
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBarComp />
        {this.renderHeader()}
        <WebView
          source={{ html: this.props.content }}
          renderLoading={this.renderLoading}
          startInLoadingState
          style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
    height: 55,
  },
  closeIcon: {
    color: '#fff',
    fontSize: 30,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 15,
  },
  image: {
    width: 90,
    height: 90,
    alignSelf: 'center',
  },
});
