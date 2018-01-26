import React from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

export default class AnimatedTimingSpin extends React.Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(1);
  }

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
      },
    ).start(() => this.spin());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.container}>
        <Animated.Image
          style={{ transform: [{ rotate: spin }] }}
          source={require('../../images/react-icons.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 600,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
