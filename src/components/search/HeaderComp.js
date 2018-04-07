import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity, Linking, Alert,
  StatusBar, Dimensions, StyleSheet,
} from 'react-native';
import { Header, Item, Input, Icon } from 'native-base';

import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PopupMenu from '../../components/PopupMenu';

import { filterListSchedule } from '../../actions/directive';

const { width } = Dimensions.get('window');

class HeaderComp extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    listSchedule: PropTypes.array.isRequired,
    filterListSchedule: PropTypes.func.isRequired,
  }

  state = {
    value: '',
  };

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

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  };

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
    Linking.openURL(url);
  }

  pop = () => {
    this.props.navigator.pop();
  }

  reset = () => {
    this.setState({ value: '' });
    this.props.filterListSchedule(this.props.listSchedule);
  }

  searchList = (value) => {
    this.setState({ value });
    const { listSchedule } = this.props;
    const pola = new RegExp(value);

    const result = listSchedule.filter((item) => {
      const isExist = pola.test(item.mata_kuliah);
      if (isExist) return item;
      return false;
    });
    this.props.filterListSchedule(result);
  }

  render() {
    return (
      <Header
        searchBar
        rounded
        style={{ backgroundColor: '#4caf50', paddingRight: 0 }}>
        <StatusBar backgroundColor="#3d8c40" />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={this.pop}>
          <FontAwesome
            name="caret-left"
            style={styles.backIcon} />
        </TouchableOpacity>

        <Item>
          <Input
            placeholder="Cari Mata Kuliah disini.."
            placeholderTextColor="#fff"
            autoCapitalize="words"
            value={this.state.value}
            style={styles.textInput}
            onChangeText={value => this.searchList(value)} />
          <TouchableOpacity
            onPress={this.reset}>
            <Icon
              name="md-close"
              style={styles.closeIcon} />
          </TouchableOpacity>
        </Item>

        <PopupMenu
          actions={['Tentang aplikasi', 'Beri bintang 5']}
          onPress={this.showPopup} />
      </Header>
    );
  }
}


const mapStateToProps = state => ({
  listSchedule: state.providerReducer.listSchedule,
});

const mapDisptachToProps = dispatch => ({
  filterListSchedule: newList => dispatch(filterListSchedule(newList)),
});

export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(HeaderComp);

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
    height: 50,
  },
  backIcon: {
    color: '#fff',
    fontSize: 45,
  },
  closeIcon: {
    backgroundColor: '#409944',
    color: '#fff',
    height: 45,
    paddingTop: 10,
  },
  title: {
    marginLeft: -15,
    color: '#fff',
    fontSize: 18,
    width: width - 70,
  },
  textInput: {
    backgroundColor: '#409944',
    color: '#fff',
    fontSize: 14,
  },
});

