import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import Indicator from './Indicator';
import { UIActivityIndicatorProps } from './type';

export default class UIActivityIndicator extends PureComponent<UIActivityIndicatorProps> {
  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 12,
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
    const outputRange = Array.from(new Array(count), (_, index) => Math.max(1.0 - index * (1 / (count - 1)), 0));

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop()!);
    }

    outputRange.unshift(...outputRange.slice(-1));

    const barStyle = {
      width: size! / 10,
      height: size! / 4,
      borderRadius: size! / 20,
      backgroundColor,
      opacity: progress.interpolate({ inputRange, outputRange }),
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle} />
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
    alignItems: 'center',
  },
});
