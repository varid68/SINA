import React from 'react';
import { View, Text, FlatList, Dimensions, Image, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

export default class TabMain extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    point: PropTypes.array.isRequired,
  }

  state = {
    first: 0,
    second: 0,
    third: 0,
    left: 0,
    selectedSemester: 'I',
  };

  componentWillMount() {
    // const result = [...this.props.point.reduce((mp, o) => {
    //   if (!mp.has(o.semester)) mp.set(o.semester, Object.assign({ length: 0 }, o));
    //   mp.get(o.semester).length += 1;
    //   return mp;
    // }, new Map()).values()];

    // const key = result.map(item => item.semester);
    // const val = result.map(item => item.length);
    // const a = Object.assign({}, ...key.map((n, index) => ({ [n]: val[index] })));
  }

  onLayout = (e) => {
    const widthScreen = Dimensions.get('window').width;
    const left = (widthScreen - e.nativeEvent.layout.width) / 2;
    this.setState({ left });
  }

  getGradeImage = (Point) => {
    const point = Number(Point);
    let image = '';
    if (point <= 100 && point >= 92) image = require('../../images/A.png');
    else if (point <= 91 && point >= 84) image = require('../../images/A-min.png');
    else if (point <= 83 && point >= 75) image = require('../../images/B-plus.png');
    else if (point <= 74 && point >= 67) image = require('../../images/B.png');
    else if (point <= 66 && point >= 59) image = require('../../images/B-min.png');
    else if (point <= 58 && point >= 50) image = require('../../images/C-plus.png');
    else if (point <= 49 && point >= 42) image = require('../../images/C.png');
    else if (point <= 41 && point >= 34) image = require('../../images/C-min.png');
    else if (point <= 33 && point >= 25) image = require('../../images/D-plus.png');
    else image = require('../../images/D.png');
    return image;
  }

  checking = (e) => {
    const scroll = e.nativeEvent.contentOffset.y;
    if (scroll > 0 && scroll < 400 && this.state.first == 0) {
      this.setState({ first: 1, second: 0, third: 0, selectedSemester: 'I' });
    }
    if (scroll > 400 && scroll < 850 && this.state.second == 0) {
      this.setState({ first: 0, second: 1, third: 0, selectedSemester: 'AKSELERASI I' });
    }
    if (scroll > 850 && this.state.third == 0) {
      this.setState({ first: 0, second: 0, third: 1, selectedSemester: 'III' });
    }
  }

  renderListItem = (index, item) => (
    <View>
      <View style={styles.listItemContainer}>
        <View style={{ flex: 2 }}>
          <Text style={styles.kode}>{item.id_matkul}</Text>
          <Text style={styles.matkul}>{item.mata_kuliah}{'\n'}</Text>
          <Text style={styles.sks}>SKS: {item.sks} ••••• Semester: {item.semester}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={this.getGradeImage(item.nilai_akhir)}
            style={styles.image} />
        </View>
      </View>
    </View>
  );

  render() {
    const { point, fetching } = this.props;
    const { selectedSemester } = this.state;

    return (
      <View>
        {fetching ?
          <Text>Loading...</Text> :
          <View>
            <FlatList
              data={point}
              renderItem={
                ({ index, item }) => this.renderListItem(index, item)
              }
              onScroll={e => this.checking(e)}
              keyExtractor={item => item.id_matkul}
              extraData={this.props} />
            <View
              style={[styles.notifContainer, { left: this.state.left }]}
              onLayout={e => this.onLayout(e)} >
              <Text style={styles.notifContent}>SEMESTER {selectedSemester}</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    marginBottom: 5,
    padding: 10,
  },
  kode: {
    marginBottom: 10,
    fontSize: 17,
    color: '#333',
  },
  matkul: {
    fontSize: 13,
  },
  sks: {
    fontSize: 12,
    color: '#e91e62',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: 60,
    height: 60,
  },
  notifContainer: {
    backgroundColor: '#4caf50',
    position: 'absolute',
    top: 5,
    borderRadius: 12,
  },
  notifContent: {
    color: '#fff',
    fontSize: 10,
    padding: 5,
  },
});
