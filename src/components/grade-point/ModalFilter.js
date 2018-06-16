import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

export default class ModalFilter extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalVisibility: PropTypes.bool.isRequired,
    changeSemester: PropTypes.func.isRequired,
    scoresLength: PropTypes.number.isRequired,
  };

  state = {
    semester: [],
    selected: '- none -',
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.scoresLength != nextProps.scoresLength) {
      let semester = null;
      switch (nextProps.scoresLength) {
        case 0: semester = ['- none -'];
          break;

        case 1: semester = ['- none -', 'I'];
          break;

        case 2: semester = ['- none -', 'I', 'II'];
          break;

        case 3: semester = ['- none -', 'I', 'II', 'Akselerasi I'];
          break;

        case 4: semester = ['- none -', 'I', 'II', 'Akselerasi I', 'III'];
          break;

        case 5: semester = ['- none -', 'I', 'II', 'Akselerasi I', 'III', 'IV'];
          break;

        default: semester = ['- none -', 'I', 'II', 'Akselerasi I', 'III', 'IV', 'Akselerasi II'];
          break;
      }

      this.setState({ semester });
    }
  }

  filter = () => {
    const { selected } = this.state;
    const { changeSemester, closeModal } = this.props;
    if (selected != '- none -') changeSemester(this.state.selected);
    closeModal();
  }

  renderContent = () => (
    <View style={styles.modalContent}>
      <Text>Filter indeks nilai</Text>
      <View style={styles.line} />

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1, alignSelf: 'center' }}>Semester</Text>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selected}
          style={{ flex: 1 }}
          onValueChange={value => this.setState({ selected: value })}>
          {this.state.semester.map(item => (<Picker.Item
            label={item}
            value={item}
            key={item}
          />))}
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
        isVisible={this.props.modalVisibility}
        style={styles.bottomModal}>
        {this.renderContent()}
      </Modal>
    );
  }
}


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
