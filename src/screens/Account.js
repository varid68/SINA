import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StatusBar, Linking, Dimensions, Alert, BackHandler, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Content, Icon } from 'native-base';

import PropTypes from 'prop-types';
import StatusBarComp from '../components/StatusBarComp';
import PopupMenu from '../components/PopupMenu';

import { resetDrawer, setModalVisible } from '../actions/directive';

const { height, width } = Dimensions.get('window');
const heightHeader = (height / 4) + 30;

class Account extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    user: PropTypes.any.isRequired,
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
      <View style={styles.imageContainer2}>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>Farid Tanwir</Text>
        </View>
        <Image
          source={require('../images/two.png')}
          style={{ borderRadius: 70 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>2116020</Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Text style={{backgroundColor:'background:rgba(255,255,255, 0.2)', paddingVertical:3, paddingHorizontal:7, borderRadius:10, fontSize:10}}>SEMESTER</Text>
        </View>
        <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15, marginTop:-25 }}>
          <View style={{ flex: 1, borderBottomColor: '#263238', borderBottomWidth: 2, borderRadius: 10 }} />
        </View>

        <View style={{ flex: 1, width: 360, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 }}>
          <View style={{flexDirection: 'column'}}>
            <View style={{ width: 10, height: 10, backgroundColor: '#263238', borderRadius: 5, marginTop: -7 }} />
            <Text style={{marginTop:8}}>I</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{ width: 20, height: 20, backgroundColor: '#263238', borderRadius: 10, marginTop: -12 }} />
            <View style={{ width: 10, height: 10, backgroundColor: '#4caf50', borderRadius: 5, marginTop: -15, marginLeft:5 }} />
            <Text style={{paddingLeft:7, marginTop:10}}>II</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{ width: 10, height: 10, backgroundColor: '#263238', borderRadius: 5, marginTop: -7 }} />
            <Text style={{marginTop:8}}>A1</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{ width: 10, height: 10, backgroundColor: '#263238', borderRadius: 5, marginTop: -7 }} />
            <Text style={{marginTop:8}}>III</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{ width: 10, height: 10, backgroundColor: '#263238', borderRadius: 5, marginTop: -7 }} />
            <Text style={{marginTop:8}}>IV</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{ width: 10, height: 10, backgroundColor: '#263238', borderRadius: 5, marginTop: -7 }} />
            <Text style={{marginTop:8}}>A2</Text>
          </View>
        </View>
      </View>
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
    flex: 0,
    flexDirection: 'column',
    backgroundColor: '#4caf50',
    height: heightHeader,
  },
  imageContainer2: {
    flex: 1.5,
    flexDirection: 'row',
    height: heightHeader / 2,
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
