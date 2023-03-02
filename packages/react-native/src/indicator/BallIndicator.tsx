import React, { PureComponent } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import Indicator from './Indicator';
import { BallIndicatorProps } from './type';

export default class BallIndicator extends PureComponent<BallIndicatorProps> {
  static displayName = 'BallIndicator';
  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 8,
    size: 36,
  };

  renderComponent = ({ index, count, progress }: { index: number; count: number; progress: Animated.Value }) => {
    const { size, color: backgroundColor } = this.props;
    const angle = (index * 360) / count;

    const layerStyle = {
      transform: [
        {
          rotate: angle + 'deg',
        },
      ],
    };

    const inputRange = Array.from(new Array(count + 1), (_, index) => index / count);
    const outputRange = Array.from(new Array(count), (_, index) => 1.2 - (0.5 * index) / (count - 1));

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop()!);
    }

    outputRange.unshift(...outputRange.slice(-1));

    const ballStyle = {
      margin: size! / 20,
      backgroundColor,
      width: size! / 5,
      height: size! / 5,
      borderRadius: size! / 10,
      transform: [
        {
          scale: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    );
  };

  render() {
    const { style, size: width, size: height, ...props } = this.props;

    return (
      <View style={style}>
        <Indicator style={{ width, height }} renderComponent={this.renderComponent} {...props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
