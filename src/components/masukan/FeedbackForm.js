/* eslint object-curly-newline: 0 */
import React from 'react';
import {
  View, Text, TextInput, Image, CheckBox, Dimensions,
  Keyboard, ToastAndroid, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Container, Content, Form, Picker, Item } from 'native-base';

import PropTypes from 'prop-types';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import FirebaseClient from './FirebaseClient';

import Header from './MyHeader';

const width = Dimensions.get('window').width / 2.5;

export default class FeedbackForm extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0,0,0,0.20)',
  }

  state = {
    sender: this.props.user.nama,
    feedback: '',
    isVisible: false,
    checked: false,
    height: 0,
    imageName: '',
    imageType: '',
    pathImage: '',
    uri: require('../../images/masukan.png'),
  };

  onValueChange = sender => this.setState({ sender });

  updateSize = height => this.setState({ height });

  toggleCheckbox = () => this.setState({ checked: !this.state.checked });

  sendFeedback = async () => {
    const { pathImage, feedback, checked, imageType } = this.state;

    const storageRef = FirebaseClient.storage().ref();
    const imageRef = storageRef.child(`feedback/${this.state.imageName}`);

    const data = {
      sender: this.props.user.nama,
      feedback,
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    Keyboard.dismiss();
    if (feedback == '') {
      this.showToast('Silahkan isi kolom feedback terlebih dahulu..');
      return false;
    }

    if (checked) {
      if (pathImage == '') {
        this.showToast('Silahkan Masukkan screenshot terlebih dahulu..');
        return false;
      }
    }

    this.setState({ isVisible: true });
    if (checked) {
      const url = await imageRef.put(pathImage, { contentType: imageType });
      data.screenshoot = url.downloadURL;
    } else data.screenshoot = null;

    const response = await axios({
      method: 'post',
      url: 'https://chylaceous-thin.000webhostapp.com/public/feedback/',
      data,
    });
    this.setState({ isVisible: false }, () => {
      response.status == 'failed' ? this.showToast('Terjadi kesalahan..') : this.showToast('Terima kasih atas feedback anda..');
    });
    return true;
  }

  showToast = (text) => {
    ToastAndroid.showWithGravityAndOffset(text, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  };

  selectPhotoTapped = () => {
    const options = { title: null };

    ImagePicker.launchImageLibrary(options, (res) => {
      if (!res.didCancel && !res.error && !res.customButton) {
        this.setState({
          uri: { uri: res.uri },
          pathImage: res.path,
          imageType: res.type,
          imageName: res.fileName,
        });
      }
    });
  }

  render() {
    const { height, isVisible, sender, checked, uri } = this.state;

    return (
      <Container>
        <Header
          isVisible={isVisible}
          sendFeedback={this.sendFeedback}
          {...this.props} />
        <Content
          padder
          style={{ backgroundColor: '#eee' }}>
          <Form>
            <Picker
              mode="dropdown"
              selectedValue={sender}
              onValueChange={this.onValueChange} >
              <Item
                label={`Dari : ${this.props.user.nama}`}
                value={this.props.user.nama} />
              <Item
                label="Dari : anonim"
                value="anonim" />
            </Picker>

            <TextInput
              placeholder="Type Your feedback here.."
              editable
              multiline
              style={{ height }}
              onChangeText={text => this.setState({ feedback: text })}
              onContentSizeChange={e => this.updateSize(e.nativeEvent.contentSize.height)} />

            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity
                onPress={this.toggleCheckbox}
                style={{ flexDirection: 'row' }}>
                <CheckBox value={checked} />
                <Text style={{ marginTop: 5 }}> Sertakan screenshot</Text>
              </TouchableOpacity>
            </View>
          </Form>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.image}>
              <Image
                source={uri}
                style={{ flex: 1, width, height: width + 10 }} />
              <Text
                onPress={this.selectPhotoTapped}
                style={styles.imageSelector}>Klik disini untuk Memilih Screenshot
              </Text>
            </View>
            <Text style={{ flex: 1 }}>
              Kunjungi <Text style={{ color: '#4caf50' }}>Halaman Bantuan Hukum</Text> untuk meminta perubahan konten demi alasan hukum.{'\n'}
              Data <Text style={{ color: '#4caf50' }}>info sistem</Text> akan dikirimkan ke Google.{'\n'}
              lihat <Text style={{ color: '#4caf50' }}>kebijakan privasi</Text> dan <Text style={{ color: '#4caf50' }}>persyaratn layanan.</Text>
            </Text>
          </View>
        </Content >
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flexDirection: 'column',
    flex: 0,
    marginRight: 20,
  },
  imageSelector: {
    color: '#4caf50',
    width,
    fontSize: 12,
    textAlign: 'center',
  },
});
