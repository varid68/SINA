/* eslint arrow-body-style: 0 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, Tab } from 'native-base';

import PropTypes from 'prop-types';

import TabLocal from './TabLocal';
import TabMain from './TabMain';

export default class TabContainer extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    scores: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    selectedSemester: PropTypes.string.isRequired,
    changeSemester: PropTypes.func.isRequired,
  };

  state = {
    filteredScores: [],
    selectedTab: '',
    scoresLength: 0,
  };

  componentWillReceiveProps(nextProps) {
    const { selectedSemester, scores } = this.props;
    if (scores != nextProps.scores || selectedSemester != nextProps.selectedSemester) {
      if (nextProps.scores.length > 0) {
        const filtered = nextProps.scores.filter((item) => {
          return item.semester == nextProps.selectedSemester;
        });

        const scoresLength = [...nextProps.scores.reduce((mp, o) => {
          if (!mp.has(o.semester)) mp.set(o.semester, Object.assign({ length: 0 }, o));
          mp.get(o.semester).length += 1;
          return mp;
        }, new Map()).values()];
        this.setState({ filteredScores: filtered, scoresLength: scoresLength.length });
      }
    }
  }

  changeTab(i) {
    this.setState({ selectedTab: i });
  }

  render() {
    const { filteredScores, selectedTab, scoresLength } = this.state;
    const {
      fetching, user, scores,
      selectedSemester, changeSemester,
    } = this.props;

    return (
      <Tabs
        tabBarUnderlineStyle={styles.tabContainer}
        onChangeTab={({ i }) => this.changeTab(i)} >
        <Tab
          heading={`LOCAL (${filteredScores.length})`}
          textStyle={styles.white}
          tabStyle={{ backgroundColor: '#4caf50' }}
          activeTabStyle={{ backgroundColor: '#4caf50' }}
          activeTextStyle={styles.white}>
          <TabLocal
            changeSemester={changeSemester}
            selectedTab={selectedTab}
            selectedSemester={selectedSemester}
            user={user}
            fetching={fetching}
            scores={filteredScores}
            scoresLength={scoresLength} />
        </Tab>
        <Tab
          heading={`MAIN (${scores.length})`}
          textStyle={styles.white}
          tabStyle={{ backgroundColor: '#4caf50' }}
          activeTabStyle={{ backgroundColor: '#4caf50' }}
          activeTextStyle={styles.white}>
          <TabMain
            fetching={fetching}
            scores={scores} />
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
