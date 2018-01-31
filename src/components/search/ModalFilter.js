/* eslint object-curly-newline: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker, TouchableOpacity, CheckBox, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-native-modal';

import { filterListSchedule } from '../../actions/directive';

class ModalFilter extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    listSchedule: PropTypes.array.isRequired,
    filterListSchedule: PropTypes.func.isRequired,
  };

  state = {
    listDosen: [],
    selectedDosen: '- none -',
    selectedDay: '- none -',
    selectedSemester: '- none -',
    checked: false,
  };

  componentWillMount() {
    const none = {
      nid: 'none',
      nama: '- none -',
      kd_matkul: 'none',
    };

    axios({
      method: 'get',
      url: 'http://chylaceous-thin.000webhostapp.com/public/dosen/',
    })
      .then((res) => {
        const push = [none, ...res.data];
        this.setState({ listDosen: push });
      });
  }

  toggleCheckbox = () => this.setState({ checked: !this.state.checked });

  filter = () => {
    const { selectedDosen, selectedDay, selectedSemester, checked } = this.state;
    const { listSchedule } = this.props;

    let filtered = [];
    if (selectedDosen != '- none -') {
      filtered = listSchedule.slice().filter(item => item.nama == selectedDosen);
    } else filtered = listSchedule;

    if (selectedSemester != '- none -') {
      filtered = filtered.filter(item => item.semester == selectedSemester);
    }

    if (selectedDay != '- none -') {
      filtered = filtered.filter(item => item.hari == selectedDay);
    }

    if (checked) {
      const a = filtered.slice().sort((n1, n2) => {
        if (n1.hari < n2.hari) return 1;
        if (n1.hari > n2.hari) return -1;
        return 0;
      });

      const b = a.filter(item => item.hari != 'sabtu');
      const c = a.filter(item => item.hari == 'sabtu');
      filtered = b.concat(c);
    }

    this.props.filterListSchedule(filtered);
    this.props.closeModal();
  }

  renderContent = () => (
    <View style={styles.modalContent}>
      <Text>Filter Schedule Kuliah</Text>
      <View style={styles.line} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1, alignSelf: 'center' }}>Nama dosen</Text>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selectedDosen}
          style={{ flex: 1 }}
          onValueChange={itemValue => this.setState({ selectedDosen: itemValue })}>
          {Object.keys(this.state.listDosen).map(key => (<Picker.Item
            label={this.state.listDosen[key].nama.split(' ').slice(0, 2).join(' ')}
            value={this.state.listDosen[key].nama}
            key={key} />))}
        </Picker>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1, alignSelf: 'center' }}>Semester</Text>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selectedSemester}
          style={{ flex: 1 }}
          onValueChange={itemValue => this.setState({ selectedSemester: itemValue })}>
          <Picker.Item label="- none -" value="- none -" />
          <Picker.Item label="Satu" value="I" />
          <Picker.Item label="Dua" value="II" />
          <Picker.Item label="Akselerasi I" value="Akselerasi I" />
          <Picker.Item label="Tiga" value="III" />
          <Picker.Item label="Empat" value="IV" />
        </Picker>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Text style={{ flex: 1, alignSelf: 'center' }}>Hari mengajar</Text>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selectedDay}
          style={{ flex: 1 }}
          onValueChange={itemValue => this.setState({ selectedDay: itemValue })}>
          <Picker.Item label="- none -" value="- none -" />
          <Picker.Item label="Senin" value="Senin" />
          <Picker.Item label="Selasa" value="Selas" />
          <Picker.Item label="Rabu" value="Rabu" />
          <Picker.Item label="Kamis" value="Kamis" />
          <Picker.Item label="Jumat" value="Jumat" />
          <Picker.Item label="Sabtu" value="Sabtu" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={this.toggleCheckbox}
        style={{ flexDirection: 'row', marginTop: -8, marginBottom: 10, alignItems: 'center' }}>
        <CheckBox value={this.state.checked} />
        <Text> Urutkan berdasarkan hari mengajar</Text>
      </TouchableOpacity>

      <Button
        block
        success
        style={{ borderRadius: 5, backgroundColor: '#00a63f' }}
        onPress={this.filter} >
        <Text style={{ color: '#fff', marginTop: 3 }}>Tampilkan hasil</Text>
      </Button>
    </View>
  );

  render() {
    return (
      <Modal
        onBackdropPress={() => this.props.closeModal()}
        isVisible={this.props.isVisible}
        style={styles.bottomModal}>
        {this.renderContent()}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  listSchedule: state.providerReducer.listSchedule,
});

const mapDispatchToProps = dispatch => ({
  filterListSchedule: newList => dispatch(filterListSchedule(newList)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalFilter);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  line: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    marginTop: 10,
  },
});
