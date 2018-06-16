/* eslint arrow-body-style: 0, no-underscore-dangle: 0 */
import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const heightTabContent = (22.5 / 100) * height;
const widthImg = width / 5;

export default class PointTotal extends React.Component {
  static propTypes = {
    selectedSemester: PropTypes.string.isRequired,
    ipk: PropTypes.any.isRequired,
    ips: PropTypes.array.isRequired,
    scores: PropTypes.array.isRequired,
  }

  state = {
    ips: 0,
    totalIps: 0,
    totalSks: 0,
  }

  componentWillReceiveProps(nextProps) {
    const _totalIps = nextProps.ips.reduce((a, b) => {
      const toInt = Number(b.ip);
      return a + toInt;
    }, 0);

    const totalIps = Math.round(_totalIps * 100) / 100;

    const totalSks = nextProps.scores.reduce((a, b) => {
      const toInt = Number(b.sks);
      return a + toInt;
    }, 0);

    const ips = nextProps.ips.filter((item) => {
      return item.semester == nextProps.selectedSemester;
    }).map(item => item.ip);

    this.setState({ totalIps, totalSks, ips });
  }

  render() {
    const { ipk, selectedSemester } = this.props;
    const { totalIps, totalSks, ips } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Text style={styles.gradeText}>Your Grade Point!</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descPoint}>IPK Utama</Text>
            <Text style={styles.point}>{!ipk ? 0 : ipk}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descPoint}>IPS -&gt; {selectedSemester}</Text>
            <Text style={styles.point}>{ips}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descPoint2}>Total IPS</Text>
            <Text style={styles.point2}>{totalIps}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descPoint2}>Total SKS</Text>
            <Text style={styles.point2}>{totalSks}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={require('../../images/teacher-sitting.png')}
            style={{ height: heightTabContent, width: widthImg }} />
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  gradeText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  descPoint: {
    flex: 1.2,
    color: '#fff',
    marginBottom: 3,
  },
  descPoint2: {
    flex: 1.2,
    color: '#fff',
    marginBottom: 3,
    fontSize: 12,
  },
  point: {
    flex: 1,
    color: '#fff',
  },
  point2: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
  },
});
