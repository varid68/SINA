import React from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity, Alert, Linking, StyleSheet } from 'react-native';
import { Header, Left, Icon, Body, Right } from 'native-base';

import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import PopupMenu from '../PopupMenu';

export default class MyHeader extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    sendFeedback: PropTypes.func.isRequired,
  }

  componentDidMount() {
    Linking.addEventListener('url', this.beriBintang);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.beriBintang);
  }

  showPopup = (eventName, index) => {
    if (eventName !== 'itemSelected') return;
    if (index === 0) this.toggleModal();
    else this.beriBintang();
  }

  toggleModal = () => {
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

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require('../../images/Ball.gif')} />
    </View>
  );

  render() {
    const { navigator, sendFeedback, isVisible } = this.props;

    return (
      <Header style={{ backgroundColor: '#4caf50' }}>
        <StatusBar backgroundColor="#3d8c40" />
        <Left>
          <TouchableOpacity
            style={styles.sendIcon}
            onPress={() => navigator.pop()}>
            <Icon
              name="close"
              style={{ color: '#fff' }} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={styles.title}>Give a Feedback</Text>
        </Body>
        <Right>
          <TouchableOpacity
            style={styles.sendIcon}
            onPress={sendFeedback} >
            <Icon
              name="send"
              style={{ color: '#fff' }} />
          </TouchableOpacity>
          <PopupMenu
            actions={['Tentang aplikasi', 'Beri bintang 5']}
            onPress={this.showPopup} />
        </Right>
        <Modal isVisible={isVisible}>{this.renderModalContent()}</Modal>
      </Header >
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: -15,
    color: '#fff',
    fontSize: 18,
  },
  sendIcon: {
    width: 45,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
