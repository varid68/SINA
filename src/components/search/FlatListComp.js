import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, FlatList, Animated, TouchableOpacity, Easing, StyleSheet } from 'react-native';
import { Container, Icon } from 'native-base';

import PropTypes from 'prop-types';
import ModalFilter from './ModalFilter';

class FlatListComp extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    listSchedule: PropTypes.array.isRequired,
  }

  state = {
    isVisible: false,
    isEmpty: false,
    translateY: new Animated.Value(0),
    offset: 0,
    upLimiter: 0,
    downLimiter: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.listSchedule != nextProps.listSchedule) {
      if (nextProps.listSchedule.length < 1) {
        this.setState({ isEmpty: true });
      } else {
        this.setState({ isEmpty: false });
      }
    }
  }

  closeModal = () => this.setState({ isVisible: false });

  toggleModal = () => this.setState({ isVisible: !this.state.isVisible });

  randImage = () => {
    const source = [require('../../images/one.png'), require('../../images/two.png'), require('../../images/three.png')];
    const random = source[Math.floor(Math.random() * source.length)];
    return random;
  }

  downToUp = () => {
    Animated.timing(
      this.state.translateY,
      {
        toValue: 100,
        easing: Easing.bounce,
        duration: 500,
      },
    ).start();
  }

  UpToDown = () => {
    Animated.timing(
      this.state.translateY,
      {
        toValue: 0,
        easing: Easing.bounce,
        duration: 500,
      },
    ).start();
  }

  scroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.state.offset ? 'down' : 'up';
    this.state.offset = currentOffset;
    if (direction == 'up' && this.state.upLimiter == 0) {
      this.UpToDown();
      this.setState({ upLimiter: 1, downLimiter: 0 });
    }
    if (direction == 'down' && this.state.downLimiter == 0) {
      this.downToUp();
      this.setState({ downLimiter: 1, upLimiter: 0 });
    }
  }

  renderFab = () => {
    const animation = {
      transform: [{ translateY: this.state.translateY }],
    };

    return (
      <Animated.View style={[styles.view, animation]}>
        <TouchableOpacity
          style={styles.fab}
          onPress={this.toggleModal}>
          <Icon
            name="funnel"
            style={{ color: '#fff' }} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderListItem = (index, item) => (
    <View style={styles.containerListItem}>
      <View style={styles.imageContainer}>
        <Image
          source={this.randImage()}
          style={styles.image} />
      </View>
      <View style={styles.matkulContainer}>
        <Text style={styles.id_matkul}>{item.id_matkul}</Text>
        <Text style={styles.matkul}>{item.mata_kuliah}</Text>
        <Text style={styles.dosen}>{item.nama}</Text>
        <Text style={styles.hari}>Semester {item.semester} ••••• {item.hari}</Text>
      </View>
      <View style={styles.hourContainer}>
        <Text style={styles.hour}>{item.pukul}</Text>
        <View style={styles.classroomContainer}>
          <Text style={{ fontSize: 20 }}>{item.ruang}</Text>
        </View>
      </View>
    </View>
  )

  render() {
    const { fetching, listSchedule } = this.props;
    const { isEmpty, isVisible } = this.state;

    return (
      <Container>
        {isEmpty ?
          <Text style={{ textAlign: 'center' }}>Tidak ada Hasil..</Text> :
          null
        }
        {fetching ?
          <Text>Loading..</Text> :
          <FlatList
            data={listSchedule}
            renderItem={
              ({ index, item }) => this.renderListItem(index, item)
            }
            keyExtractor={item => item.id_matkul}
            onScroll={this.scroll}
            extraData={this.props} />
        }

        <ModalFilter
          {...this.props}
          closeModal={this.closeModal}
          isVisible={isVisible} />
        {this.renderFab()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.providerReducer.fetching,
  listSchedule: state.providerReducer.filteredListSchedule,
});

export default connect(mapStateToProps)(FlatListComp);

const styles = StyleSheet.create({
  containerListItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  matkulContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  id_matkul: {
    flex: 0,
    fontSize: 16,
    color: '#333',
  },
  matkul: {
    flex: 2,
    fontSize: 13,
  },
  dosen: {
    flex: 1,
    fontSize: 11,
    color: '#e91e63',
  },
  hari: {
    flex: 1,
    fontSize: 12,
    color: '#3D8C40',
  },
  hourContainer: {
    flex: 0,
    flexDirection: 'column',
  },
  hour: {
    fontSize: 11,
    textAlign: 'right',
  },
  classroomContainer: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    borderRadius: 30,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
