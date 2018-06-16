import React from 'react';
import { View, Text, FlatList, Dimensions, Image, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

const height = Dimensions.get('window').height / 2;
export default class FlatListComp extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
  }

  renderListItem = (index, item) => (
    <View style={styles.containerListItem}>
      <View style={{ flex: 0 }}>
        <Image
          source={require('../../images/one.png')}
          style={styles.image} />
      </View>
      <View style={styles.matkulContainer}>
        <View style={{ flexDirection: 'row', height: 30 }}>
          <Text style={styles.kode}>{item.id_matkul}</Text>
          <Text style={{ marginLeft: 20, marginTop: 2 }}> {item.sks} sks</Text>
        </View>
        <Text style={styles.matkul}>{item.mata_kuliah}</Text>
        <Text style={styles.dosen}>{item.nama}</Text>
      </View>
      <View style={styles.pukulContainer}>
        <Text style={styles.pukul}>{item.pukul}</Text>
        <View style={styles.ruangContainer}>
          <Text style={{ fontSize: 20 }}>{item.ruang}</Text>
        </View>
      </View>
    </View>
  )

  render() {
    const { list } = this.props;

    return (
      <View>
        {list.length < 1 ?
          <View style={styles.emptyContainer}>
            <Text>Oops.. Its like no schedule</Text>
            <Text style={{ fontSize: 12 }}>Let&apos;s have fun..</Text>
            <Image source={require('../../images/empty.png')} />
          </View> :
          <FlatList
            data={list}
            renderItem={
              ({ index, item }) => this.renderListItem(index, item)
            }
            keyExtractor={item => item.id_matkul}
            extraData={this.props} />
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerListItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  matkulContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  kode: {
    fontSize: 17,
    color: '#333',
  },
  matkul: {
    marginTop: 2,
    fontSize: 13,
  },
  dosen: {
    fontSize: 11,
    color: '#e91e63',
  },
  pukulContainer: {
    flex: 0,
    flexDirection: 'column',
  },
  pukul: {
    fontSize: 11,
    textAlign: 'right',
  },
  ruangContainer: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height,
  },
});
