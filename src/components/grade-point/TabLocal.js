import React from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';

import PropTypes from 'prop-types';

const width = (Dimensions.get('window').width / 2) - 25;
export default class TabLocal extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    point: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  componentWillMount() {
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

    this.setState({ selected: semester });
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

  renderListItem = (index, item) => (
    <View style={styles.listItemContainer}>
      <View style={{ flex: 2 }}>
        <Text style={styles.idMatkul}>{item.id_matkul}</Text>
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

  render() {
    const { fetching, point } = this.props;
    const { selected } = this.state;

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
              keyExtractor={item => item.id_matkul}
              extraData={this.props} />
            <View style={styles.notifContainer}>
              <Text style={styles.notifContent}>Semester {selected}</Text>
            </View>
            <Button style={styles.fabContainer}>
              <Icon name="ios-funnel" style={styles.filterIcon} />
              <Text style={styles.filterText}>filter</Text>
            </Button>
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
  idMatkul: {
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
  notifContainer: {
    backgroundColor: '#4caf50',
    position: 'absolute',
    top: 5,
    right: width,
    borderRadius: 12,
  },
  notifContent: {
    color: '#fff',
    fontSize: 10,
    padding: 5,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 5,
    right: width - 5,
    paddingTop: 0,
    paddingBottom: 0,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#C51665',
  },
  filterIcon: {
    marginLeft: 10,
    marginRight: 5,
    fontSize: 20,
  },
  filterText: {
    color: '#fff',
    marginRight: 10,
  },
});
