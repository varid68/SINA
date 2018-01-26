import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import { Container, Button, Icon } from 'native-base';

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


  renderFab = () => (
    <Button
      onPress={this.toggleModal}
      style={styles.fab}>
      <Icon
        name="md-funnel"
        style={styles.fabIcon} />
    </Button>
  );

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
      <View style={styles.pukulContainer}>
        <Text style={styles.pukul}>{item.pukul}</Text>
        <View style={{ height: 55, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>{item.ruang}</Text>
        </View>
      </View>
    </View>
  )

  render() {
    const { fetching, listSchedule } = this.props;

    return (
      <Container>
        {this.state.isEmpty ?
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
            extraData={this.props} />
        }

        <ModalFilter
          {...this.props}
          closeModal={this.closeModal}
          isVisible={this.state.isVisible} />
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
  pukulContainer: {
    flex: 0,
    flexDirection: 'column',
  },
  pukul: {
    fontSize: 11,
    textAlign: 'right',
  },
  fab: {
    height: 55,
    width: 55,
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#409944',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 30,
  },
});
