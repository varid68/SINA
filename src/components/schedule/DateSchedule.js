import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const heightTabContent = height / 5;
const widthImg = width / 7;

export default class DateSchedule extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    jurusan: PropTypes.string.isRequired,
  }

  state = {
    date: '',
    month: '',
    year: '',
  };

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

  splitJurusan = (jurusan, isStarter) => {
    const spliter = jurusan.split(' ');
    const result = isStarter ? spliter[0] : spliter[1];
    return result;
  }

  render() {
    const { date, month, year } = this.state;
    const { jurusan } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.mySchedule}>My Schedule</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.day}>{date}</Text>
            <Text style={styles.month}>{year}{'\n'}{month}</Text>
          </View>
          <View style={styles.jurusanContainer}>
            <Text style={styles.jurusanUp}>{this.splitJurusan(jurusan, true)}</Text>
            <Text style={styles.jurusanDown}>{this.splitJurusan(jurusan, false)}</Text>
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
  jurusanContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  jurusanUp: {
    fontSize: 18,
    color: '#fff',
  },
  jurusanDown: {
    fontSize: 15,
    marginTop: 22,
    marginLeft: -20,
    color: '#fff',
  },
  image: {
    flex: 1,
    height: heightTabContent,
    width: widthImg,
  },
});
