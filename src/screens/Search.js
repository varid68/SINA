import React from 'react';
import { Container } from 'native-base';

import PropTypes from 'prop-types';

import StatusBarComp from '../components/StatusBarComp';
import Header from '../components/search/HeaderComp';
import FlatListComp from '../components/search/FlatListComp';

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

export default Search;
