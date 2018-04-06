import React from 'react';
import { StyleSheet, View, Text, Image, ToastAndroid, Dimensions } from 'react-native';
import { VictoryLine, VictoryChart, VictoryScatter, VictoryLabel, VictoryTheme } from 'victory-native';

import PropTypes from 'prop-types';

const height = Dimensions.get('window').height - 60;
export default class AnimatedTimingSpin extends React.Component {
  static propTypes = {
    ip: PropTypes.array.isRequired,
    fetchIndeks: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    nim: PropTypes.string.isRequired,
    error: PropTypes.any.isRequired,
  };

  state = {
    indeksPrestasi: [{ y: 3.00 }, { y: 3.21 }],
  };

  componentWillMount() {
    this.props.fetchIndeks(this.props.nim);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ip != nextProps.ip) {
      this.drawingChart(nextProps.ip);
    }
    if (nextProps.error != '') this.showToast();
  }

  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Sepertinya server kami mengalami masalah..!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM, 25, 50,
    );
  };

  drawingChart = (indeks) => {
    let list = [];
    const a1 = indeks.filter(item => item.semester == 'Akselerasi I');
    const a2 = indeks.filter(item => item.semester == 'Akselerasi II');

    const filtered = indeks.sort((n1, n2) => {
      if (n1.semester > n2.semester) return 1;
      if (n1.semester < n2.semester) return -1;
      return 0;
    }).filter(e => e.semester != 'Akselerasi I' && e.semester != 'Akselerasi II');

    if (indeks.length < 3) list = filtered.map(e => e.ip);
    if (indeks.length == 3) list = filtered.concat(a1).map(e => e.ip);
    if (indeks.length > 3) {
      const indexToSplit = filtered.map(e => e.semester).indexOf('III');
      const first = filtered.slice(0, indexToSplit);
      const second = filtered.slice(indexToSplit);
      if (indeks.length == 6) list = first.concat(a1, second, a2).map(e => e.ip);
      else list = first.concat(a1, second).map(e => e.ip);
    }

    const converter = list.map(item => ({ y: Number(item) }));
    const indeksPrestasi = [{ y: 3.00 }].concat(converter);
    this.setState({ indeksPrestasi });
  }

  render() {
    const { indeksPrestasi } = this.state;
    const { fetching } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {fetching ?
          <View style={styles.loaderContainer}>
            <Image
              source={require('../../images/loader.gif')} />
          </View> :
          <View style={styles.container}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                domain={{ y: [2.4, 3.8] }}
                categories={{ x: ['I', 'II', 'A1', 'III', 'IV', 'A2'] }}
                interpolation="linear"
                style={{
                  data: { stroke: '#c43a31' },
                  parent: { border: '1px solid #ccc' },
                  labels: { fill: '#000' },
                }}
                data={indeksPrestasi}
                labels={d => d.y}
                labelComponent={<VictoryLabel dy={30} dx={13} />}
              />
              <VictoryScatter
                data={indeksPrestasi}
                categories={{ x: ['I', 'II', 'A1', 'III', 'IV', 'A2'] }}
                size={5}
                style={{ data: { fill: '#c43a31' } }}
              />
            </VictoryChart>
            <Text style={styles.semesterText}>Grafik Indeks Prestasi Mahasiswa</Text>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    height: 30,
    width: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  semesterText: {
    flex: 0,
  },
});
