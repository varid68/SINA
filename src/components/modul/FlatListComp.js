import React from 'react';
import { connect } from 'react-redux';
import { Text, Image, View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem } from 'native-base';

import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';

import { fetchModul } from '../../actions/provider';

const height = Dimensions.get('window').height - 50;

class FlatListComp extends React.Component {
  static propTypes = {
    fetchModul: PropTypes.func.isRequired,
    filteredListModul: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
  }

  state = {
    isEmpty: false,
  }

  componentWillMount() {
    this.props.fetchModul();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filteredListModul != nextProps.filteredListModul) {
      if (nextProps.filteredListModul.length < 1) {
        this.setState({ isEmpty: true });
      } else {
        this.setState({ isEmpty: false });
      }
    }
  }

  // checkFileExist(title) {
  //   const { fs } = RNFetchBlob;
  //   const { DownloadDir } = fs.dirs;
  //   RNFetchBlob.fs.exists(`${DownloadDir}/${title}`)
  //     .then((exist) => {
  //       const a = exist ? 'ada' : 'gak ada';
  //       alert(a)
  //     });
  // }

  download = (url, title) => {
    const { config, fs } = RNFetchBlob;
    const { DownloadDir } = fs.dirs;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${DownloadDir}/${title}`,
        description: 'Document',
      },
    };
    config(options).fetch('GET', url).then(() => {
      // console.log(res);
    });
  }

  extention = (filename) => {
    const result = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    return result;
  }

  ModuleName = (name) => {
    const result = name.split('.');
    return result[0];
  }

  random = () => {
    const result = Math.floor((Math.random() * 300) + 1);
    return result;
  }

  renderListItem = (index, item) => (
    <Card>
      <CardItem style={styles.cardItem}>
        <Image source={require('../../images/cover-book.jpg')} />
        <View style={styles.descContainer}>
          <View style={{ flex: 2 }}>
            <Text style={{ color: '#47423E' }}>{this.ModuleName(item.title)}</Text>
          </View>
          <View style={{ flex: 0, marginBottom: 3 }}>
            <Text style={{ color: '#e91e63', fontSize: 12 }}>{item.nama}</Text>
          </View>
          <View style={{ flex: 0, marginBottom: 3 }}>
            <Text style={{ color: '#8F8986', fontSize: 11 }}>{item.matkul}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.descFile}>
              <FontAwesome
                name="download"
                style={{ fontSize: 16 }} />
              {this.random()} | {this.extention(item.title)} | {item.size}
            </Text>
            <Text
              onPress={() => this.download(item.link, item.title)}
              style={styles.unduh}><FontAwesome name="save" /> Unduh
            </Text>
          </View>
        </View>
      </CardItem>
    </Card>
  );

  render() {
    const { filteredListModul, fetching } = this.props;

    return (
      <Container>
        <Content style={{ padding: 5 }}>
          {this.state.isEmpty ?
            <Text style={{ textAlign: 'center' }}>Tidak ada Hasil...</Text> :
            null
          }
          {!fetching ?
            <FlatList
              data={filteredListModul}
              renderItem={
                ({ index, item }) => this.renderListItem(index, item)
              }
              keyExtractor={item => item.id}
              extraData={this.props} /> :
            <View style={styles.emptyContainer}>
              <Image source={require('../../images/loading.gif')} />
            </View>
          }
        </Content>

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  listModul: state.providerReducer.listModul,
  fetching: state.providerReducer.fetching,
  filteredListModul: state.providerReducer.filteredListModul,
  isFiltering: state.providerReducer.isFiltering,
});

const mapDispatchToProps = dispatch => ({
  fetchModul: () => dispatch(fetchModul()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlatListComp);

const styles = StyleSheet.create({
  white: {
    color: '#fff',
  },
  cardItem: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  descContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
  },
  descFile: {
    flex: 1,
    color: '#8F8986',
    fontSize: 12,
  },
  unduh: {
    flex: 0,
    textAlign: 'right',
    color: '#8F8986',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
