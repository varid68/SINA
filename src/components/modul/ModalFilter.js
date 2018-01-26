import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-native-modal';

import { filterListModul } from '../../actions/directive';

class ModalFilter extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    listModul: PropTypes.array.isRequired,
    filterListModul: PropTypes.func.isRequired,
  };

  state = {
    listDosen: [],
    selectedDosen: '- none -',
    selectedFormat: '- none -',
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

  filter = () => {
    const { selectedDosen, selectedFormat } = this.state;
    const { listModul } = this.props;

    let filtered = [];
    if (selectedDosen != '- none -') {
      filtered = listModul.slice().filter(item => item.nama == selectedDosen);
    } else filtered = listModul;

    if (selectedFormat != '- none -') {
      filtered = filtered.filter((item) => {
        const i = item.title.split('.')[1];
        if (i == selectedFormat) return i;
      });
    }
    this.props.filterListModul(filtered);
    this.props.closeModal();
  }

  renderContent = () => (
    <View style={styles.modalContent}>
      <Text>Filter Modul</Text>
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

      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Text style={{ flex: 1, alignSelf: 'center' }}>Format file</Text>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selectedFormat}
          style={{ flex: 1 }}
          onValueChange={itemValue => this.setState({ selectedFormat: itemValue })}>
          <Picker.Item label="- none -" value="- none -" />
          <Picker.Item label="Pdf" value="pdf" />
          <Picker.Item label="Word" value="doc" />
          <Picker.Item label="Excel" value="xls" />
          <Picker.Item label="Rar" value="rar" />
        </Picker>
      </View>

      <Button
        block
        success
        style={{ borderRadius: 5, backgroundColor: '#00a63f' }}
        onPress={this.filter} >
        <Text style={{ color: '#fff' }}>Tampilkan hasil</Text>
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
  listModul: state.providerReducer.listModul,
});

const mapDispatchToProps = dispatch => ({
  filterListModul: newList => dispatch(filterListModul(newList)),
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
