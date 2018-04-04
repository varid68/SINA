import React from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

export default class TabMain extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    point: PropTypes.array.isRequired,
  }

  state = {
    selectedSemester: 'I',
    list: [],
  };

  componentWillMount() {
    const { point } = this.props;

    const result = [...point.reduce((mp, o) => {
      if (!mp.has(o.semester)) mp.set(o.semester, Object.assign({ length: 0 }, o));
      mp.get(o.semester).length += 1;
      return mp;
    }, new Map()).values()];

    const key = result.map(item => item.semester);
    switch (key.length) {
      case 1: {
        const I = point.filter(item => item.semester == 'I');
        const list = [...I];
        this.setState({ list });
        break;
      }

      case 2: {
        const I = point.filter(item => item.semester == 'I');
        const II = point.filter(item => item.semester == 'II');
        const list = [...I, ...II];
        this.setState({ list });
        break;
      }

      case 3: {
        const I = point.filter(item => item.semester == 'I');
        const II = point.filter(item => item.semester == 'II');
        const A1 = point.filter(item => item.semester == 'Akselerasi I');
        const list = [...I, ...II, ...A1];
        this.setState({ list });
        break;
      }

      case 4: {
        const I = point.filter(item => item.semester == 'I');
        const II = point.filter(item => item.semester == 'II');
        const A1 = point.filter(item => item.semester == 'Akselerasi I');
        const III = point.filter(item => item.semester == 'III');
        const list = [...I, ...II, ...A1, ...III];
        this.setState({ list });
        break;
      }

      case 5: {
        const I = point.filter(item => item.semester == 'I');
        const II = point.filter(item => item.semester == 'II');
        const A1 = point.filter(item => item.semester == 'Akselerasi I');
        const III = point.filter(item => item.semester == 'III');
        const IV = point.filter(item => item.semester == 'IV');
        const list = [...I, ...II, ...A1, ...III, ...IV];
        this.setState({ list });
        break;
      }

      case 6: {
        const I = point.filter(item => item.semester == 'I');
        const II = point.filter(item => item.semester == 'II');
        const A1 = point.filter(item => item.semester == 'Akselerasi I');
        const III = point.filter(item => item.semester == 'III');
        const IV = point.filter(item => item.semester == 'IV');
        const A2 = point.filter(item => item.semester == 'Akselerasi II');
        const list = [...I, ...II, ...A1, ...III, ...IV, ...A2];
        this.setState({ list });
        break;
      }

      default:
        break;
    }
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
    const heightListitem = 80;
    const heightFlatlist = (58.5 / 100) * Dimensions.get('window').height;

    const result = [...this.state.list.reduce((mp, o) => {
      if (!mp.has(o.semester)) mp.set(o.semester, Object.assign({ length: 0 }, o));
      mp.get(o.semester).length += 1;
      return mp;
    }, new Map()).values()];

    let x = 0;
    const b = result.map((item) => {
      const a = ((item.length * heightListitem) + x) - heightFlatlist;
      x = (item.length * heightListitem) + x;
      const s = { semester: item.semester, scrollPosition: a };
      return s;
    });

    const offset = e.nativeEvent.contentOffset.y;

    for (let i = 0; i < b.length - 1; i += 1) {
      if (offset > b[i].scrollPosition && offset < b[i + 1].scrollPosition) {
        this.setState({ selectedSemester: b[i + 1].semester });
      }
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
    const { fetching } = this.props;
    const { selectedSemester, list } = this.state;

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
              onScroll={e => this.checking(e)}
              keyExtractor={item => item.id_matkul}
              extraData={this.props} />
            <View
              style={styles.notifContainer}>
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
    height: 75,
    flexDirection: 'row',
    backgroundColor: '#eee',
    marginBottom: 5,
    padding: 10,
  },
  kode: {
    marginBottom: 9,
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
    position: 'absolute',
    top: 10,
    backgroundColor: '#4caf50',
    alignSelf: 'center',
    borderRadius: 10,
  },
  notifContent: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#fff',
  },
});
