import React from 'react';
import { Text, TouchableOpacity, Alert, Linking, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { Header, Left, Icon, Body, Right } from 'native-base';

import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PopupMenu from '../components/PopupMenu';

const { width } = Dimensions.get('window');

export default class MyHeader extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    fromTab: PropTypes.bool.isRequired,
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

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  };

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
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { navigator, title } = this.props;

    return (
      <Header style={{ backgroundColor: '#4caf50' }}>
        <StatusBar
          backgroundColor="#3d8c40"
        />
        {!this.props.fromTab ?
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigator.pop()}>
            <FontAwesome
              name="caret-left"
              style={styles.backIcon} />
          </TouchableOpacity> :
          <Left>
            <TouchableOpacity
              style={styles.containerMenu}
              onPress={this.toggleDrawer}>
              <Icon
                name="menu"
                style={{ color: '#fff' }} />
            </TouchableOpacity>
          </Left>
        }
        <Body>
          <Text style={styles.title}>{title}</Text>
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
    height: 55,
  },
  backIcon: {
    color: '#fff',
    fontSize: 45,
  },
  title: {
    marginLeft: -15,
    color: '#fff',
    fontSize: 18,
    width: width - 70,
  },
});

