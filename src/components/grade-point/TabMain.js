import React from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');
const heightListitem = height * 0.13;
export default class TabMain extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    scores: PropTypes.array.isRequired,
  }

  state = {
    list: [],
  };

  componentWillMount() {
    const { scores } = this.props;
    let list = [];

    const howManyTypes = [...scores.reduce((mp, o) => {
      if (!mp.has(o.semester)) mp.set(o.semester, Object.assign({ length: 0 }, o));
      mp.get(o.semester).length += 1;
      return mp;
    }, new Map()).values()];

    const a1 = scores.filter(item => item.semester == 'Akselerasi I');
    const a2 = scores.filter(item => item.semester == 'Akselerasi II');

    const filtered = scores.sort((n1, n2) => {
      if (n1.semester > n2.semester) return 1;
      if (n1.semester < n2.semester) return -1;
      return 0;
    }).filter(item => item.semester != 'Akselerasi I' && item.semester != 'Akselerasi II');

    if (howManyTypes.length < 3) list = filtered;
    if (howManyTypes.length == 3) list = filtered.concat(a1);
    if (howManyTypes.length > 3) {
      const indexToSplit = filtered.map(e => e.semester).indexOf('III');
      const first = filtered.slice(0, indexToSplit);
      const second = filtered.slice(indexToSplit);
      if (howManyTypes.length == 6) list = first.concat(a1, second, a2);
      else list = first.concat(a1, second);
    }
    this.setState({ list });
  }

  getGradeImage = (Point) => {
    const point = Number(Point);
    let image = '';
    if (point <= 100 && point >= 85) image = require('../../images/A.png');
    else if (point <= 84 && point >= 80) image = require('../../images/A-min.png');
    else if (point <= 79 && point >= 75) image = require('../../images/B-plus.png');
    else if (point <= 74 && point >= 70) image = require('../../images/B.png');
    else if (point <= 69 && point >= 65) image = require('../../images/B-min.png');
    else if (point <= 64 && point >= 60) image = require('../../images/C-plus.png');
    else if (point <= 59 && point >= 55) image = require('../../images/C.png');
    else if (point <= 54 && point >= 50) image = require('../../images/C-min.png');
    else if (point <= 50 && point >= 40) image = require('../../images/D.png');
    else image = require('../../images/E.png');
    return image;
  }

  renderListItem = (index, item) => (
    <View style={styles.listItemContainer}>
      <View style={{ flex: 2 }}>
        <Text style={styles.kode}>{item.id_matkul}</Text>
        <Text numberOfLines={1} style={styles.matkul}>{item.mata_kuliah}{'\n'}</Text>
        <Text style={styles.sks}>SKS: {item.sks} ••••• Semester: {item.semester}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={this.getGradeImage(item.nilai_akhir)}
          style={styles.image} />
      </View>
    </View>
  );

  render() {
    const { fetching } = this.props;
    const { list } = this.state;

    return (
      <View>
        {fetching ?
          <Text>Loading...</Text> :
          <View>
            <FlatList
              data={list}
              renderItem={
                ({ index, item }) => this.renderListItem(index, item)
              }
              keyExtractor={item => item.id_matkul}
              extraData={this.props} />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    height: heightListitem,
    flexDirection: 'row',
    backgroundColor: '#eee',
    marginBottom: 5,
    padding: 10,
  },
  kode: {
    marginBottom: 7,
    fontSize: 17,
    color: '#333',
  },
  matkul: {
    fontSize: 13,
  },
  sks: {
    fontSize: 10,
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
});
