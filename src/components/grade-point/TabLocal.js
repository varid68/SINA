import React from 'react';
import { View, Text, FlatList, Image, Picker, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

export default class TabLocal extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    point: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  getGradeImage = (Point) => {
    const point = Number(Point);
    let image = '';
    if (point <= 100 && point >= 92) {
      image = require('../../images/A.png');
    } else if (point <= 91 && point >= 84) {
      image = require('../../images/A-min.png');
    } else if (point <= 83 && point >= 75) {
      image = require('../../images/B-plus.png');
    } else if (point <= 74 && point >= 67) {
      image = require('../../images/B.png');
    } else if (point <= 66 && point >= 59) {
      image = require('../../images/B-min.png');
    } else if (point <= 58 && point >= 50) {
      image = require('../../images/C-plus.png');
    } else if (point <= 49 && point >= 42) {
      image = require('../../images/C.png');
    } else if (point <= 41 && point >= 34) {
      image = require('../../images/C-min.png');
    } else if (point <= 33 && point >= 25) {
      image = require('../../images/D-plus.png');
    } else {
      image = require('../../images/D.png');
    }
    return image;
  }

  renderListItem = (index, item) => (
    <View style={styles.listItemContainer}>
      <View style={{ flex: 2 }}>
        <Text style={styles.kode}>{item.id_matkul}</Text>
        <Text style={styles.matkul}>{item.mata_kuliah.toUpperCase()}{'\n'}</Text>
        <Text style={styles.sks}>SKS: {item.sks.toUpperCase()} ••••• SEMESTER: {item.semester.toUpperCase()}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={this.getGradeImage(item.nilai_akhir)}
          style={styles.image} />
      </View>
    </View>
  );

  renderPicker = () => (
    <View style={{ backgroundColor: '#eee' }}>
      <View style={styles.pickerContainer} >
        <Picker
          style={{ height: 30 }}
          itemStyle={{ fontSize: 12 }}
          selectedValue={this.state.selected}
          onValueChange={value => this.setState({ selected: value })}>
          <Picker.Item label="Filter berdasarkan semester" value="none" />
          <Picker.Item label="Semester I" value="I" />
          <Picker.Item label="Semester II" value="II" />
          <Picker.Item label="Akselerasi I" value="Akselerasi I" />
          <Picker.Item label="Semester III" value="III" />
          <Picker.Item label="Semester IV" value="IV" />
          <Picker.Item label="Akselerasi II" value="Akselerasi II" />
        </Picker>
      </View>
    </View>
  )

  render() {
    const { fetching, point } = this.props;

    return (
      <View>
        {fetching ?
          <Text>Loading...</Text> :
          <View>
            {this.renderPicker()}
            <FlatList
              data={point}
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
    flexDirection: 'row',
    backgroundColor: '#eee',
    marginBottom: 5,
    padding: 10,
  },
  kode: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  matkul: {
    fontSize: 13,
  },
  sks: {
    fontSize: 12,
    color: '#e91e63',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: 60,
    height: 60,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 5,
    marginRight: 20,
    marginBottom: 5,
    marginLeft: 20,
  },
});
