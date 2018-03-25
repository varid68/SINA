import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Tabs, Tab } from 'native-base';

import PropTypes from 'prop-types';
import moment from 'moment';
import TabContent from './TabContent';

import { setDate } from '../../actions/directive';

class TabContainer extends React.Component {
  static propTypes = {
    setDate: PropTypes.func.isRequired,
    fetchSchedule: PropTypes.func.isRequired,
    listSchedule: PropTypes.array.isRequired,
  }

  state = {
    day: 0,
    dayList: [],
  }

  componentWillMount() {
    const dayList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const day = Number(moment().format('d')) - 1;
    this.setState({ day, dayList });
  }

  changeDate(i) {
    const selisih = i - this.state.day;
    const now = moment().add(selisih, 'd').format('ll');
    this.props.setDate(now);
  }

  render() {
    const { dayList } = this.state;

    return (
      <Tabs
        initialPage={this.state.day}
        tabBarUnderlineStyle={styles.tabContainer}
        onChangeTab={({ i }) => this.changeDate(i)} >
        {dayList.map(item => (
          <Tab
            key={item}
            heading={item.substr(0, 3)}
            textStyle={styles.white}
            tabStyle={styles.green}
            activeTabStyle={styles.green}
            activeTextStyle={styles.white}>
            <TabContent
              {...this.props}
              marker={item} />
          </Tab>
        ))}
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  listSchedule: state.providerReducer.listSchedule,
  fetching: state.providerReducer.fetching,
  isVisible: state.directiveReducer.isVisible,
  user: state.directiveReducer.user,
});

const mapDispatchToProps = dispatch => ({
  setDate: newDate => dispatch(setDate(newDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabContainer);

const styles = StyleSheet.create({
  white: {
    color: '#fff',
  },
  green: {
    backgroundColor: '#4caf50',
  },
  tabContainer: {
    backgroundColor: '#e91e63',
    borderBottomWidth: 2,
    marginBottom: -2,
  },
});
