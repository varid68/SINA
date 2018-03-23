/* eslint camelcase: 0 */
import React from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';

import PropTypes from 'prop-types';
import ModalFilter from './ModalFilter';

const { width, height } = Dimensions.get('window');
const heightLoader = height - (25 + (height / 5) + 50 + 72);

export default class TabLocal extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    point: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    selectedSemester: PropTypes.string.isRequired,
    changeSemester: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false,
      modalVisibility: false,
      left: 0,
      right: 0,
    };
  }

  onLayout = (event) => {
    const left = (width - event.nativeEvent.layout.width) / 2;
    this.setState({ left });
  }

  onLayout2 = (event) => {
    const right = (width - event.nativeEvent.layout.width) / 2;
    this.setState({ right });
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

  beginScrolling = () => {
    this.setState({ isScrolling: true });
  }

  endScrolling = () => {
    this.setState({ isScrolling: false });
  }

  closeModal = () => {
    this.setState({ modalVisibility: false });
  }

  renderListItem = (index, item) => {
    const { id_matkul, mata_kuliah } = item;
    const { sks, semester, nilai_akhir } = item;

    return (
      <View style={styles.listItemContainer}>
        <View style={{ flex: 2 }}>
          <Text style={styles.idMatkul}>{id_matkul}</Text>
          <Text style={styles.matkul}>{mata_kuliah.toUpperCase()}{'\n'}</Text>
          <Text style={styles.sks}>SKS: {sks.toUpperCase()}
            ••••• SEMESTER: {semester.toUpperCase()}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={this.getGradeImage(nilai_akhir)}
            style={styles.image} />
        </View>
      </View>
    );
  }

  render() {
    const { fetching, point, user } = this.props;
    const { changeSemester, selectedSemester } = this.props;
    const { isScrolling, modalVisibility } = this.state;

    return (
      <View>
        {fetching ?
          <View style={styles.loaderContainer}>
            <Image source={require('../../images/loader.gif')} />
          </View> :
          <View>
            <FlatList
              data={point}
              renderItem={
                ({ index, item }) => this.renderListItem(index, item)
              }
              keyExtractor={item => item.id_matkul}
              extraData={this.props}
              onScrollBeginDrag={this.beginScrolling}
              onScrollEndDrag={this.endScrolling} />
            {isScrolling ?
              <View
                style={[styles.notifContainer, { left: this.state.left }]}
                onLayout={event => this.onLayout(event)}>
                <Text style={styles.notifContent}>Semester {selectedSemester}</Text>
              </View> : null}
            {!isScrolling ?
              <Button
                style={[styles.fabContainer, { right: this.state.right }]}
                onLayout={e => this.onLayout2(e)}
                onPress={() => this.setState({ modalVisibility: true })}>
                <Icon name="ios-funnel" style={styles.filterIcon} />
                <Text style={styles.filterText}>filter</Text>
              </Button> : null}
          </View>
        }

        <ModalFilter
          user={user}
          selectedSemester={selectedSemester}
          changeSemester={changeSemester}
          closeModal={this.closeModal}
          modalVisibility={modalVisibility} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  idMatkul: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  matkul: {
    fontSize: 13,
    marginBottom: -5,
  },
  sks: {
    fontSize: 12,
    color: '#e91e63',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightLoader,
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
  fabContainer: {
    position: 'absolute',
    bottom: 5,
    height: 33,
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0,
    borderRadius: 17,
    backgroundColor: '#C51665',
  },
  filterIcon: {
    marginLeft: 10,
    marginRight: 5,
    fontSize: 28,
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
});
