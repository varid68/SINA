import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import PropTypes from 'prop-types';

import StatusBarComp from '../components/StatusBarComp';
import Header from '../components/MyHeader';
import Content from '../components/ngampus/Content';

import { resetDrawer } from '../actions/directive';
import { fetchIndeks } from '../actions/provider';

class Ngampus extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    resetDrawer: PropTypes.func.isRequired,
  };

  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0,0,0,0.20)',
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willDisappear':
        this.handleBackPress();
        break;

      default:
        break;
    }
  }

  handleBackButton = () => {
    this.props.resetDrawer();
  }

  handleBackPress = () => {
    this.props.navigator.popToRoot({
      animated: false,
    });
  }

  render() {
    return (
      <Container>
        <StatusBarComp />
        <Header
          {...this.props}
          title="Grafik nilai"
          fromTab />
        <Content {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ip: state.providerReducer.indeks.indeks_prestasi,
  fetching: state.providerReducer.fetching,
  error: state.providerReducer.error,
  nim: state.directiveReducer.user.nim,
});

const mapDispatchToProp = dispatch => ({
  resetDrawer: () => dispatch(resetDrawer()),
  fetchIndeks: nim => dispatch(fetchIndeks(nim)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(Ngampus);
