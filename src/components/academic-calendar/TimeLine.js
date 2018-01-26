import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-listview';

import PropTypes from 'prop-types';

export default class TimeLine extends Component {
  static propTypes = {
    fetchCalendar: PropTypes.func.isRequired,
    calendar: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.props.fetchCalendar();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.fetching ?
          <View style={styles.emptyContainer}>
            <Image source={require('../../images/loading.gif')} />
          </View> :
          <Timeline
            style={styles.list}
            data={this.props.calendar}
            circleSize={20}
            circleColor="#e91e63"
            lineColor="#9c27b0"
            timeContainerStyle={{ minWidth: 0 }}
            detailContainerStyle={{ marginTop: -10 }}
            descriptionStyle={{ color: 'gray' }}
            innerCircle="dot"
            options={{
              style: { paddingTop: 5 },
            }} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
