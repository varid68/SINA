/* eslint camelcase:0 */
import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, Image, StatusBar, Linking, Dimensions,
  ScrollView, Alert, BackHandler, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Container, Header, Left, Body, Right, Content, Icon } from 'native-base';

import PropTypes from 'prop-types';
import StatusBarComp from '../components/StatusBarComp';
import PopupMenu from '../components/PopupMenu';

import { resetDrawer, setModalVisible } from '../actions/directive';

const { height, width } = Dimensions.get('window');
const heightHeader = (height / 4) + 30;
const widthFooter = width - 20;

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
    this.state = {
      semester: [],
    };
  }

  componentWillMount() {
    const semester = ['I', 'II', 'Akselerasi I', 'III', 'IV', 'Akselerasi II'];
    this.setState({ semester });
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
    Linking.openURL(url).catch();
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

  renderSmallDot = (item, index) => {
    let x = item;
    if (item === 'Akselerasi I') x = 'A1';
    if (item === 'Akselerasi II') x = 'A2';

    return (
      <View style={{ flexDirection: 'column' }} key={index}>
        <View style={styles.smallDot} />
        <Text style={{ marginTop: 8 }}>{x}</Text>
      </View>
    );
  }

  renderBigDot = (item, index) => {
    let x = item;
    if (item === 'Akselerasi I') x = 'A1';
    if (item === 'Akselerasi II') x = 'A2';

    return (
      <View style={{ flexDirection: 'column' }} key={index}>
        <View style={styles.outerBigDot} />
        <View style={styles.innerBigDot} />
        <Text style={styles.content}>{x}</Text>
      </View>
    );
  }

  renderName = () => (
    <View style={styles.container}>

      <View style={styles.nameContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{this.props.user.nama}</Text>
        </View>
        <Image
          source={require('../images/two.png')}
          style={{ borderRadius: 70 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{this.props.user.nim}</Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.semesterTextContainer}>
          <Text style={styles.semesterText}>SEMESTER</Text>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>

        <View style={styles.dotContainer}>
          {this.state.semester.map((item, i) =>
            (item === this.props.user.semester ?
              this.renderBigDot(item, i) : this.renderSmallDot(item, i)
            ))}
        </View>
      </View>
    </View>
  )

  render() {
    const { alamat, jurusan, ttl, tahun_masuk } = this.props.user; // eslint-disable-line

    return (
      <Container>
        <StatusBarComp />
        {this.renderHeader()}
        {this.renderName()}

        <Content style={{ backgroundColor: '#f4f4f4' }}>
          <ScrollView>
            <View style={styles.padding15}>
              <Text style={{ color: '#e91e63' }}>• alamat</Text>
              <Text style={styles.headingContent}>{alamat}</Text>
            </View>

            <View style={styles.padding15}>
              <Text style={{ color: '#e91e63' }}>• program studi</Text>
              <Text style={styles.headingContent}>{jurusan}</Text>
            </View>

            <View style={styles.padding15}>
              <Text style={{ color: '#e91e63' }}>• tahun masuk</Text>
              <Text style={styles.headingContent}>{tahun_masuk}</Text>
            </View>

            <View style={styles.padding15}>
              <Text style={{ color: '#e91e63' }}>• tempat, tgl lahir</Text>
              <Text style={styles.headingContent}>{ttl}</Text>
            </View>
          </ScrollView>

        </Content>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => this.handleBackPress(true)} >
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </Container >
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
  container: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: '#4caf50',
    height: heightHeader,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  nameContainer: {
    flex: 1.5,
    flexDirection: 'row',
    height: heightHeader / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    color: '#fff',
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  semesterTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  semesterText: {
    backgroundColor: 'rgba(255,255,255, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 10,
    fontSize: 10,
  },
  lineContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: -25,
  },
  line: {
    flex: 1,
    borderBottomColor: '#263238',
    borderBottomWidth: 2,
    borderRadius: 10,
  },
  dotContainer: {
    flex: 1,
    width: 360,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  smallDot: {
    width: 10,
    height: 10,
    backgroundColor: '#263238',
    borderRadius: 5,
    marginTop: -7,
  },
  outerBigDot: {
    width: 20,
    height: 20,
    backgroundColor: '#263238',
    borderRadius: 10,
    marginTop: -12,
  },
  innerBigDot: {
    width: 10,
    height: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    marginTop: -15,
    marginLeft: 5,
  },
  content: {
    paddingLeft: 7,
    marginTop: 10,
  },
  classContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    elevation: 5,
  },
  class: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  padding15: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  heading: {
    fontSize: 20,
    paddingTop: 2,
    color: '#4caf50',
  },
  headingText: {
    fontWeight: 'bold',
    color: '#000',
  },
  headingContent: {
    paddingLeft: 15,
    paddingTop: 5,
    color: '#333',
    fontSize: 16,
  },
  logout: {
    width: widthFooter,
    backgroundColor: '#F44336',
    marginHorizontal: 10,
    position: 'absolute',
    bottom: 10,
    borderRadius: 5,
  },
  logoutText: {
    padding: 10,
    color: '#fff',
    textAlign: 'center',
  },
});
