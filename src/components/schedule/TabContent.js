import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import FlatList from './FlatListComp';

const { height } = Dimensions.get('window');
const heightTab = height / 5;
const heightLoader = height - (25 + 56 + heightTab + 50);
// 25 => status bar, 56 => tinggi header, 50 => tinggi tabClicker

export default class TabContent extends React.Component {
  static propTypes = {
    marker: PropTypes.string.isRequired,
    listSchedule: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
  }

  state = {
    schedule: [],
  }

  componentWillMount() {
    const { listSchedule, marker } = this.props;

    const schedule = listSchedule.filter((item) => {
      if (item.hari == marker) return item;
      return false;
    });
    this.setState({ schedule });
  }

  componentWillReceiveProps(nextProps) {
    const { marker, listSchedule } = this.props;
    if (listSchedule != nextProps.listSchedule) {
      const schedule = nextProps.listSchedule.filter((item) => {
        if (item.hari == marker) return item;
        return false;
      });
      this.setState({ schedule });
    }
  }

  render() {
    const { schedule } = this.state;
    const { fetching } = this.props;

    return (
      <View>
        {fetching ?
          <View style={styles.loaderContainer}>
            <Image
              source={require('../../images/loader.gif')}
              style={styles.loader} />
          </View> :
          <FlatList list={schedule} />
        }
      </View >
    );
  }
}


const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightLoader,
  },
  loader: {
    height: 50,
    width: 50,
  },
});
