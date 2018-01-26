import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import PropTypes from 'prop-types';
import { fetchNews } from '../actions/provider';
import { resetDrawer } from '../actions/directive';

import StatusBarComp from '../components/StatusBarComp';
import Header from '../components/MyHeader';
import FlatListNews from '../components/news/FlatListNews';

class News extends React.Component {
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
          title="News"
          fromTab />
        <FlatListNews {...this.props} />
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  listNews: state.providerReducer.listNews,
  fetching: state.providerReducer.fetching,
  error: state.providerReducer.error,
});

const mapDispatchToProp = dispatch => ({
  fetchNews: () => dispatch(fetchNews()),
  resetDrawer: () => dispatch(resetDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(News);
