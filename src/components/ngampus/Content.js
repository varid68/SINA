import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryLine, VictoryChart, VictoryScatter, VictoryLabel, VictoryTheme } from 'victory-native';

import PropTypes from 'prop-types';

export default class AnimatedTimingSpin extends React.Component {
  static propTypes = {
    ip: PropTypes.array.isRequired,
    fetchIndeks: PropTypes.func.isRequired,
  };

  state = {
    indeksPrestasi: [],
  };

  componentWillMount() {
    if (this.props.ip === undefined) this.props.fetchIndeks();
    else this.drawingChart();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ip != undefined) this.drawingChart();
  }

  drawingChart = () => {
    const sort = this.props.ip.slice().sort((a, b) => {
      if (a.semester < b.semester) return -1;
      if (a.semester > b.semester) return 1;
      return 0;
    });

    const a1 = sort.filter(item => item.semester == 'Akselerasi I');
    const a2 = sort.filter(item => item.semester == 'Akselerasi II');

    if (a1.length != 0 && a2.length != 0) {
      sort.splice(0, 1);
      sort.splice(3, 0, a1[0]);
    }

    if (a1.length != 0 && a2.length == 0) {
      sort.splice(0, 1);
      sort.splice(2, 0, a1[0]);
    }

    if (a2.length != 0) {
      sort.splice(0, 1);
      sort.splice(5, 0, a2[0]);
    }

    for (let i = 0; i < sort.length; i += 1) {
      sort[i].y = sort[i].ip;
      delete sort[i].ip;
      delete sort[i].semester;
    }

    const indeksPrestasi = sort.map((item) => {
      const o = { y: Number(item.y) };
      return o;
    });

    const o = [{ y: 3.00 }];
    const pp = [...o, ...indeksPrestasi];
    this.setState({ indeksPrestasi: pp });
  }

  render() {
    const { indeksPrestasi } = this.state;

    return (
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
    );
  }
}

const styles = StyleSheet.create({
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
