import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const heightTabContent = height / 4.5;
const widthImg = width / 5;

export default class PointTotal extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    fetchIndeks: PropTypes.func.isRequired,
    point: PropTypes.array.isRequired,
    indeks: PropTypes.object.isRequired,
  }

  state = {
    totalSks: 0,
    ipk: 0,
    indeksPrestasi: 0,
    semester: '',
  }

  componentWillMount() {
    const { nim } = this.props.user;
    this.props.fetchIndeks(nim);
  }

  componentWillReceiveProps(nextProps) {
    let semester = null;
    switch (this.props.user.semester) {
      case 'I': semester = null;
        break;

      case 'II': semester = 'I';
        break;

      case 'Akselerasi I': semester = 'II';
        break;

      case 'III': semester = 'Akselerasi I';
        break;

      case 'IV': semester = 'III';
        break;

      default: semester = 'IV';
        break;
    }

    if (this.props.point != nextProps.point) {
      if (nextProps.point.length > 0) {
        const { ipk } = this.props.indeks;
        const indeksPrestasi = this.props.indeks.indeks_prestasi.filter(item => item.semester == semester).map(item => item.ip);
        const totalSks = nextProps.point.reduce((a, b) => {
          const toNumber = Number(b.sks);
          return a + toNumber;
        }, 0);
        this.setState({ ipk, totalSks, indeksPrestasi, semester });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Text style={styles.gradeText}>Your Grade Point!</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descPoint}>IPK Utama</Text>
            <Text style={styles.point}>-----</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descPoint}>IP -> {this.state.semester}</Text>
            <Text style={styles.point}>{this.state.indeksPrestasi}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descPoint2}>Total IPK</Text>
            <Text style={styles.point2}>{this.state.ipk}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descPoint2}>Total SKS</Text>
            <Text style={styles.point2}>{this.state.totalSks}</Text>
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
