import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StatusBar, Linking, Dimensions, Alert, BackHandler, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Content, Icon } from 'native-base';

import PropTypes from 'prop-types';
import StatusBarComp from '../components/StatusBarComp';
import PopupMenu from '../components/PopupMenu';

import { resetDrawer, setModalVisible } from '../actions/directive';

const { height, width } = Dimensions.get('window');
const heightHeader = height / 4;

class Account extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    user: PropTypes.array.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    resetDrawer: PropTypes.func.isRequired,
  }

  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0,0,0,0.20)',
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    Linking.addEventListener('url', this.beriBintang);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.beriBintang);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willDisappear':
        this.handleBackPress(false);
        break;

      default:
        break;
    }
  }

  handleBackButton = () => {
    this.props.resetDrawer();
  }

  handleBackPress = (isLogout) => {
    if (isLogout) this.props.setModalVisible();
    this.props.navigator.popToRoot({ animated: false });
    this.props.resetDrawer();
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
      [{ text: 'OK' }],
      { cancelable: false },
    );
  }

  beriBintang = () => {
    const url = 'https://play.google.com/store/apps/details?id=name.ratson.uiexplorer';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  renderHeader = () => (
    <Header hasTabs style={{ backgroundColor: '#4caf50' }}>
      <StatusBar backgroundColor="#3d8c40" />
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
        <Text style={styles.title}>My Account</Text>
      </Body>
      <Right>
        <PopupMenu
          actions={['Tentang aplikasi', 'Beri bintang 5']}
          onPress={this.showPopup} />
      </Right>
    </Header >
  )

  renderName = () => (
    <View style={styles.imageContainer}>
      <Image
        source={require('../images/two.png')}
        style={{ borderRadius: 70 }} />
      <Text style={{ color: '#fff', fontSize: 17 }}>{this.props.user[0].nama}</Text>
      <Text style={{ color: '#fff', fontSize: 12 }}>{this.props.user[0].nim}</Text>
    </View>
  )

  render() {
    return (
      <Container>
        <StatusBarComp />
        {this.renderHeader()}
        {this.renderName()}

        <Content style={{ backgroundColor: '#eee' }}>
          <View style={styles.version}>
            <Text style={{ flex: 1 }}>About</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>Version 2.0.0</Text>
          </View>
          <View style={styles.language}>
            <Text stylw={{ flex: 1 }}>Language</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>English</Text>
          </View>
          <TouchableOpacity
            style={styles.logout}
            onPress={() => this.handleBackPress(true)}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.directiveReducer.user,
});

const mapDispatchToProps = dispatch => ({
  setModalVisible: () => dispatch(setModalVisible()),
  resetDrawer: () => dispatch(resetDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);

const styles = StyleSheet.create({
  containerMenu: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  title: {
    marginLeft: -15,
    color: '#fff',
    fontSize: 17,
    width: width - 70,
  },
  imageContainer: {
    backgroundColor: '#4caf50',
    height: heightHeader,
    justifyContent: 'center',
    alignItems: 'center',
  },
  version: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginBottom: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  language: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  logout: {
    flex: 1,
    backgroundColor: '#fff',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    flex: 1,
    textAlign: 'center',
    color: 'red',
  },
});
