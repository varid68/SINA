/* eslint no-console: 0 */
import React from 'react';
import {
  View, Text, Modal, Image, TouchableOpacity,
  StatusBar, ToastAndroid, Keyboard, StyleSheet,
} from 'react-native';
import { Container, Form, Label, Item, Input, Button, Icon } from 'native-base';

import axios from 'axios';
import PropTypes from 'prop-types';

export default class ModalLogin extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    error: PropTypes.any,
    setModalVisible: PropTypes.func.isRequired,
    fetchSchedule: PropTypes.func.isRequired,
    storeUser: PropTypes.func.isRequired,
  }

  state = {
    showPassword: true,
    username: '',
    password: '',
    isLoading: false,
    isEmpty: true,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.error != nextProps.error) {
      if (nextProps.error != '') {
        this.showToast('Sepertinya server kami mengalami masalah..');
      }
    }
  }

  togglePassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  checkValid = () => {
    const { username, password } = this.state;
    const isEmpty = username == '' || password == '';
    this.setState({ isEmpty });
  }

  handleDone = () => {
    Keyboard.dismiss();
    this.setState({ isLoading: true });
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    const { setModalVisible, storeUser, fetchSchedule } = this.props;

    axios({
      method: 'post',
      url: 'https://chylaceous-thin.000webhostapp.com/public/login/',
      data,
    }).then((response) => {
      const { semester, jurusan } = response.data;
      this.setState({ isLoading: false });
      if (response.data == 'Wrong Password') {
        this.showToast('Kombinasi Username & Password salah!');
      } else {
        setModalVisible();
        fetchSchedule(semester, jurusan);
        storeUser(response.data);
      }
    }).catch(() => {
      this.setState({ isLoading: false });
      this.showToast('Sepertinya server kami mengalami masalah..');
    });
  }

  showToast = (text) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25, 50,
    );
  };

  render() {
    const { showPassword, isLoading, isEmpty } = this.state;
    const { isVisible } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => console.log('Hello World')}
        visible={isVisible}>

        <Container style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.20)"
            translucent />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={require('../../images/amik.png')}
              style={styles.image} />
          </View>

          <Form>
            <Item
              floatingLabel
              style={{ marginLeft: 0 }}>
              <Label style={{ color: '#fff' }}>Username</Label>
              <Input
                autoCorrect={false}
                editable
                autoCapitalize="none"
                spellCheck={false}
                style={{ color: '#fff' }}
                onChangeText={(e) => {
                  this.setState({ username: e }, () => this.checkValid());
                }} />
            </Item>
            <Item
              floatingLabel
              style={{ marginLeft: 0 }}>
              <Label style={{ color: '#fff' }}>Password</Label>
              <Input
                autoCorrect={false}
                editable
                autoCapitalize="none"
                spellCheck={false}
                style={{ color: '#fff' }}
                secureTextEntry={showPassword}
                onChangeText={(e) => {
                  this.setState({ password: e }, () => this.checkValid());
                }} />
            </Item>
            {showPassword ?
              <TouchableOpacity
                onPress={this.togglePassword}
                style={{ marginTop: -30, alignSelf: 'flex-end' }}>
                <Icon name="eye-off" />
              </TouchableOpacity> :
              <TouchableOpacity
                onPress={this.togglePassword}
                style={{ marginTop: -30, alignSelf: 'flex-end' }}>
                <Icon name="eye" />
              </TouchableOpacity>
            }
          </Form>

          {!isEmpty ?
            <Button
              full
              style={styles.btnSubmit}
              onPress={this.handleDone}>
              <Text style={{ color: '#fff' }}>LOGIN</Text>
            </Button> :
            <Button
              full
              style={styles.btnSubmit}>
              <Text style={{ color: 'rgba(0,0,0,0.2)' }}>LOGIN</Text>
            </Button>
          }
          <Text style={styles.subInfo}>Need more information?</Text>
          {isLoading ?
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../images/loader.gif')}
                style={{ width: 35, height: 35 }} />
            </View> :
            null
          }
        </Container>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4caf50',
    padding: 30,
    justifyContent: 'center',
  },
  image: {
    flex: 0,
  },
  btnSubmit: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 30,
  },
  subInfo: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
});
