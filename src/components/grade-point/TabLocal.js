/* eslint camelcase: 0 */
import React from 'react';
import { View, Text, FlatList, Image, Dimensions, Easing, Animated, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';

import PropTypes from 'prop-types';
import ModalFilter from './ModalFilter';

const { height } = Dimensions.get('window');
const heightLoader = height - (25 + (height / 5) + 50 + 72);

export default class TabLocal extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    scores: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    selectedSemester: PropTypes.string.isRequired,
    selectedTab: PropTypes.any.isRequired,
    changeSemester: PropTypes.func.isRequired,
    scoresLength: PropTypes.number.isRequired,
  }

  state = {
    modalVisibility: false,
    translateY: new Animated.Value(0),
    upLimiter: 0,
    downLimiter: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.scores != nextProps.scores) {
      setTimeout(() => {
        this.downToUp();
      }, 1500);
    }
    if (nextProps.selectedTab == '0') this.upToDown();
    if (nextProps.selectedTab == '1') this.downToUp();
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

  closeModal = () => {
    this.setState({ modalVisibility: false });
  }

  beginScrolling = () => {
    if (this.state.downLimiter == 0) {
      this.upToDown();
      this.setState({ downLimiter: 1, upLimiter: 0, isScrolling: true });
    }
  }

  endScrolling = () => {
    if (this.state.upLimiter == 0) {
      this.downToUp();
      this.setState({ downLimiter: 0, upLimiter: 1, isScrolling: false });
    }
  }

  downToUp = () => {
    Animated.timing(
      this.state.translateY,
      {
        toValue: -100,
        easing: Easing.exp,
        duration: 700,
      },
    ).start();
  }

  upToDown = () => {
    Animated.timing(
      this.state.translateY,
      {
        toValue: 0,
        duration: 700,
      },
    ).start();
  }

  renderFloatingText = () => {
    const animation = {
      transform: [{ translateY: this.state.translateY }],
    };
    const { selectedSemester } = this.props;

    return (
      <Animated.View style={[styles.notifContainer, animation]}>
        <Text style={styles.notifContent}>SEMESTER {selectedSemester}</Text>
      </Animated.View>
    );
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
    const {
      fetching, scores, user, scoresLength,
      changeSemester, selectedSemester,
    } = this.props;
    const { isScrolling, modalVisibility } = this.state;

    return (
      <View>
        {fetching ?
          <View style={styles.loaderContainer}>
            <Image source={require('../../images/loader.gif')} />
          </View> :
          <View>
            <FlatList
              data={scores}
              renderItem={
                ({ index, item }) => this.renderListItem(index, item)
              }
              keyExtractor={item => item.id_matkul}
              extraData={this.props}
              onScrollBeginDrag={this.beginScrolling}
              onScrollEndDrag={this.endScrolling} />
            {this.renderFloatingText()}
            {!isScrolling ?
              <Button
                style={[styles.fabContainer]}
                onPress={() => this.setState({ modalVisibility: true })}>
                <Icon
                  name="ios-funnel"
                  style={styles.filterIcon} />
                <Text style={styles.filterText}>filter</Text>
              </Button> : null}
          </View>
        }

        <ModalFilter
          user={user}
          selectedSemester={selectedSemester}
          changeSemester={changeSemester}
          closeModal={this.closeModal}
          scoresLength={scoresLength}
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
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
  notifContent: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#fff',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 5,
    height: 33,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: '#C51665',
  },
  filterIcon: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 25,
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
});
