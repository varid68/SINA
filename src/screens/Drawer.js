/* eslint class-methods-use-this: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const drawerWidth = width - (width / 8);

const initialState = {
  screen0: false,
  screen1: false,
  screen3: false,
  screen5: false,
  screen7: false,
  screen8: false,
};

class Drawer extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    drawer: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.drawer != nextProps.drawer) {
      this.setState(initialState);
      this.setState({ screen0: true });
    }
  }

  getStyle(el) {
    const style = el ? styles.btnContainer2 : styles.btnContainer;
    return style;
  }

  getStyleText(el, color) {
    const style = el ? [styles.btnText2, { color }] : [styles.btnText, { color: '#212121' }];
    return style;
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
    });
  };

  toPage = (screenName, el) => {
    this.setState(initialState);
    this.setState({ [el]: true });
    this.toggleDrawer();
    this.props.navigator.push({
      screen: screenName,
    });
  }

  render() {
    const { screen0, screen1, screen3 } = this.state; // eslint-disable-line
    const { screen4, screen5, screen6, screen7 } = this.state; // eslint-disable-line

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={require('../images/bg_banner.jpg')}
            style={styles.imageHeader} />

          <TouchableOpacity
            style={this.getStyle(screen0)}
            onPress={() => this.toPage('screen.Schedule', 'screen0')}>
            <Image
              source={require('../images/schedule2.png')}
              style={styles.imageIcon} />
            <Text style={this.getStyleText(screen0, '#0f9d58')}>Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={this.getStyle(screen1)}
            onPress={() => this.toPage('screen.GradePoint', 'screen1')}>
            <Image
              source={require('../images/grade-point.png')}
              style={styles.imageIcon} />
            <Text style={this.getStyleText(screen1, '#0f9d58')}>Grade Point</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={this.getStyle(screen3)}
            onPress={() => this.toPage('screen.News', 'screen3')}>
            <Image
              source={require('../images/news.png')}
              style={styles.imageIcon} />
            <Text style={this.getStyleText(screen3, '#ff1744')}>News</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={this.getStyle(screen5)}
            onPress={() => this.toPage('screen.Account', 'screen5')}>
            <Image
              source={require('../images/account.png')}
              style={styles.imageIcon} />
            <Text style={this.getStyleText(screen5, '#9c27b0')}>Account</Text>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity
            style={this.getStyle(screen7)}
            onPress={() => this.toPage('screen.About', 'screen7')}>
            <Image
              source={require('../images/about.png')}
              style={styles.imageIcon} />
            <Text style={styles.btnText}>About</Text>
          </TouchableOpacity>

          <View style={styles.line} />

          <View style={{ marginLeft: 15 }}>
            <TouchableOpacity
              onPress={() => this.toPage('screen.Feedback', 'screen8')}>
              <Text style={{ height: 35, color: '#444' }}>Give a Feedback</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View >
    );
  }
}

const mapStateToProps = state => ({
  drawer: state.directiveReducer.drawer,
});

export default connect(mapStateToProps)(Drawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: drawerWidth,
    backgroundColor: '#ffffff',
  },
  imageHeader: {
    width: drawerWidth,
    height: drawerWidth - 120,
    marginBottom: 10,
  },
  btnContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  imageIcon: {
    flex: 0,
    width: 24,
    height: 24,
  },
  btnText: {
    flex: 2,
    marginLeft: 25,
    fontSize: 15,
  },
  btnContainer2: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    backgroundColor: '#eee',
  },
  btnText2: {
    flex: 2,
    marginLeft: 25,
    fontSize: 15,
  },
  line: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    marginBottom: 15,
  },
});

