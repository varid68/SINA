/* eslint eqeqeq: 0 */
import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const heightTabContent = height / 5;
const widthImg = width / 7;

export default class DateSchedule extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      month: '',
      year: '',
    };
  }

  componentWillMount() {
    const split = this.props.date.split(' ');
    this.setState({
      date: split[0].length == 1 ? `0${split[0]}` : split[0],
      month: split[1],
      year: split[2],
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date != nextProps.date) {
      const split = nextProps.date.split(' ');
      this.setState({
        date: split[0].length == 1 ? `0${split[0]}` : split[0],
        month: split[1],
        year: split[2],
      });
    }
  }

  render() {
    const { date, month, year } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.mySchedule}>My Schedule</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.day}>{date}</Text>
            <Text style={styles.month}>{year}{'\n'}{month}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Image
            source={require('../../images/students.png')}
            style={styles.image} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: heightTabContent,
    backgroundColor: '#4caf50',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 2.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  mySchedule: {
    color: '#fff',
    fontSize: 30,
  },
  day: {
    color: '#fff',
    fontSize: 25,
    paddingRight: 5,
  },
  month: {
    color: '#fff',
    fontSize: 10,
    paddingTop: 2,
  },
  image: {
    flex: 1,
    height: heightTabContent,
    width: widthImg,
  },
});
