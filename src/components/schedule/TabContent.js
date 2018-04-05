import React from 'react';
import { View, Image, Dimensions } from 'react-native';

import PropTypes from 'prop-types';
import FlatList from './FlatListComp';

const { height } = Dimensions.get('window');
const heightTab = height / 5;
const heightLoading = height - (25 + heightTab + 50 + 72);

export default class TabContent extends React.Component {
  static propTypes = {
    marker: PropTypes.string.isRequired,
    listSchedule: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    user: PropTypes.any.isRequired,
  }

  state = {
    schedule: [],
  }

  componentWillMount() {
    const { listSchedule, marker, user } = this.props;

    const schedule = listSchedule.filter((item) => {
      if (item.hari == marker && item.semester == user.semester) return item;
      return false;
    });
    this.setState({ schedule });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listSchedule != nextProps.listSchedule) {
      const { marker, user } = this.props;

      const schedule = nextProps.listSchedule.filter((item) => {
        if (item.hari == marker && item.semester == user.semester) return item;
        return false;
      });
      this.setState({ schedule });
    }
  }

  render() {
    const { schedule } = this.state;

    return (
      <View>
        {this.props.fetching ?
          <View style={{ justifyContent: 'center', alignItems: 'center', height: heightLoading }}>
            <Image
              source={require('../../images/loader.gif')}
              style={{ height: 50, width: 50 }} />
          </View> :
          <FlatList list={schedule} />
        }
      </View >
    );
  }
}
