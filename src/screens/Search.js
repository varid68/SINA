/* eslint no-unused-vars: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import PropTypes from 'prop-types';

import StatusBarComp from '../components/StatusBarComp';
import Header from '../components/search/HeaderComp';
import FlatListComp from '../components/search/FlatListComp';

import { filterListSchedule } from '../actions/directive';

const Search = props => (
  <Container>
    <StatusBarComp />
    <Header {...props} />
    <FlatListComp />
  </Container>
);

Search.propTypes = {
  navigator: PropTypes.object.isRequired,
};

Search.navigatorStyle = {
  navBarHidden: true,
  statusBarColor: 'rgba(0,0,0,0.20)',
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Search);
