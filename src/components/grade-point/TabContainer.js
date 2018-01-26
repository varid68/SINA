import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, Tab } from 'native-base';

import PropTypes from 'prop-types';

import TabLocal from './TabLocal';
import TabMain from './TabMain';

export default class TabContainer extends React.Component {
  static propTypes = {
    fetchPoint: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    point: PropTypes.array.isRequired,
    user: PropTypes.array.isRequired,
  };

  state = {
    filteredPoint: [],
    point: [],
  };

  componentWillMount() {
    const { nim } = this.props.user[0];
    this.props.fetchPoint(nim);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.point != nextProps.point) {
      if (nextProps.point.length > 0) {
        const filtered = nextProps.point.filter(item => item.semester == 'I');
        this.setState({
          filteredPoint: filtered,
          point: nextProps.point,
        });
      }
    }
  }

  render() {
    const { point, filteredPoint } = this.state;
    const { fetching } = this.props;

    return (
      <Tabs
        tabBarUnderlineStyle={styles.tabContainer}>
        <Tab
          heading={`LOCAL (${filteredPoint.length})`}
          textStyle={styles.white}
          tabStyle={{ backgroundColor: '#4caf50' }}
          activeTabStyle={{ backgroundColor: '#4caf50' }}
          activeTextStyle={styles.white}>
          <TabLocal
            fetching={fetching}
            point={filteredPoint} />
        </Tab>
        <Tab
          heading={`MAIN (${point.length})`}
          textStyle={styles.white}
          tabStyle={{ backgroundColor: '#4caf50' }}
          activeTabStyle={{ backgroundColor: '#4caf50' }}
          activeTextStyle={styles.white}>
          <TabMain
            fetching={fetching}
            point={point} />
        </Tab>
      </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  white: {
    fontSize: 13,
    color: '#fff',
  },
  tabContainer: {
    backgroundColor: '#e91e63',
    borderBottomWidth: 2,
    marginBottom: -2,
  },
});
