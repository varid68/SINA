/* eslint max-len:0 */
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
    user: PropTypes.object.isRequired,
    selectedSemester: PropTypes.string.isRequired,
    changeSemester: PropTypes.func.isRequired,
  };

  state = {
    filteredPoint: [],
    point: [],
  };

  componentWillMount() {
    const { nim } = this.props.user;
    this.props.fetchPoint(nim);
  }

  componentWillReceiveProps(nextProps) {
    const { point, selectedSemester } = this.props;
    if (point != nextProps.point || selectedSemester != nextProps.selectedSemester) {
      if (nextProps.point.length > 0) {
        const filtered = nextProps.point.filter(item => item.semester == nextProps.selectedSemester);
        this.setState({
          filteredPoint: filtered,
          point: nextProps.point,
        });
      }
    }
  }

  render() {
    const { point, filteredPoint } = this.state;
    const {
      fetching, user,
      selectedSemester, changeSemester,
    } = this.props;

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
            changeSemester={changeSemester}
            selectedSemester={selectedSemester}
            user={user}
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
