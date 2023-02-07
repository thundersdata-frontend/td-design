import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { ViewStyle } from 'react-native';
import { Animated, Easing, View } from 'react-native';

import Indicator from './Indicator';
import { MaterialIndicatorProps } from './type';

export default class MaterialIndicator extends PureComponent<MaterialIndicatorProps> {
  static displayName = 'MaterialIndicator';
  static defaultProps = {
    animationDuration: 4000,
    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  _renderComponent = ({ index, progress }: { index: number; progress: Animated.Value }) => {
    const { size, color, animationDuration } = this.props;

    const frames = (60 * animationDuration!) / 1000;
    const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);

    const sa = 7.5;
    const ea = 30;

    const sequences = 3;
    const rotations = 5;

    const inputRange = Array.from(new Array(frames), (_, frameIndex) => frameIndex / (frames - 1));
    const outputRange = Array.from(new Array(frames), (_, frameIndex) => {
      let _progress = (2 * sequences * frameIndex) / (frames - 1);
      const rotation = index ? +(360 - sa) : -(180 - sa);

      const sequence = Math.ceil(_progress);

      if (sequence % 2) {
        _progress = _progress - sequence + 1;
      } else {
        _progress = sequence - _progress;
      }

      const direction = index ? -1 : +1;

      return direction * (180 - (sa + ea)) * easing(_progress) + rotation + 'deg';
    });

    const layerStyle = {
      width: size,
      height: size,
      transform: [
        {
          rotate: 90 - sa + 'deg',
        },
        {
          rotate: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', 360 * rotations + 'deg'],
          }),
        },
      ],
    };

    const viewportStyle = {
      width: size,
      height: size,
      transform: [
        {
          translateY: index ? -size! / 2 : 0,
        },
        {
          rotate: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    };

    const containerStyle: ViewStyle = {
      width: size,
      height: size! / 2,
      overflow: 'hidden',
    };

    const offsetStyle = index ? { top: size! / 2 } : null;

    const lineStyle: ViewStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderRadius: size! / 2,
      borderWidth: size! / 20,
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={layerStyle}>
          <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
            <Animated.View style={viewportStyle}>
              <Animated.View style={containerStyle} collapsable={false}>
                <Animated.View style={lineStyle} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  };

  render() {
    const { style, size: width, size: height, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator style={{ width, height }} renderComponent={this._renderComponent} {...props} count={2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
