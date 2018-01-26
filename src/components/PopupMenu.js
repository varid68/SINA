import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UIManager, findNodeHandle, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const ICON_SIZE = 24;

export default class PopupMenu extends Component {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      icon: null,
    };
  }

  onError = () => false

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress,
      );
    }
  }


  onRef = (icon) => {
    if (!this.state.icon) {
      this.setState({ icon });
    }
  }


  render() {
    return (
      <TouchableOpacity
        style={style.button}
        onPress={this.onPress}>
        <Icon
          name="more"
          size={ICON_SIZE}
          color="#fff"
          style={{ color: '#fff' }}
          ref={this.onRef} />
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  button: {
    width: 45,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
