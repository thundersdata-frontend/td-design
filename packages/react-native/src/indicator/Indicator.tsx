import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

import { BaseIndicatorProps } from './type';

interface IndicatorProps extends BaseIndicatorProps {
  hideAnimationDuration: number;
  count: number;
  renderComponent: (values: { index: number; count: number; progress: Animated.Value }) => JSX.Element;
}

interface IndicatorState {
  progress: Animated.Value;
  hideAnimation: Animated.Value;
}

export default class Indicator extends PureComponent<IndicatorProps, IndicatorState> {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,
    animating: true,
    interaction: true,
    hidesWhenStopped: true,
    count: 1,
  };

  animationState: number;
  savedValue: number;

  constructor(props: IndicatorProps) {
    super(props);

    /*
     *  0 -> 1
     *    | startAnimation
     *    | resumeAnimation
     *
     *  1 -> -1
     *    | stopAnimation
     *
     * -1 -> 0
     *    | saveAnimation
     */
    this.animationState = 0;
    this.savedValue = 0;

    const { animating } = this.props;

    this.state = {
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0),
    };
  }

  componentDidMount() {
    const { animating } = this.props;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps: IndicatorProps) {
    const { animating } = this.props;

    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }

    if (animating !== prevProps.animating) {
      const { hideAnimation } = this.state;
      const { hideAnimationDuration: duration } = this.props;

      Animated.timing(hideAnimation, { toValue: animating ? 1 : 0, duration, useNativeDriver: true }).start();
    }
  }

  startAnimation() {
    const { progress } = this.state;
    const { interaction, animationEasing, animationDuration } = this.props;

    if (0 !== this.animationState) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    Animated.loop(animation).start();

    this.animationState = 1;
  }

  stopAnimation() {
    const { progress } = this.state;

    if (1 !== this.animationState) {
      return;
    }

    const listener = progress.addListener(({ value }) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => this.saveAnimation(value));
    });

    this.animationState = -1;
  }

  saveAnimation(value: number) {
    const { animating } = this.props;

    this.savedValue = value;
    this.animationState = 0;

    if (animating) {
      this.resumeAnimation();
    }
  }

  resumeAnimation() {
    const { progress } = this.state;
    const { interaction, animationDuration } = this.props;

    if (0 !== this.animationState) {
      return;
    }

    Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - this.savedValue) * animationDuration!,
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        progress.setValue(0);

        this.animationState = 0;
        this.startAnimation();
      }
    });

    this.savedValue = 0;
    this.animationState = 1;
  }

  renderComponent(_: any, index: number) {
    const { progress } = this.state;
    const { renderComponent, count } = this.props;

    if ('function' === typeof renderComponent) {
      return renderComponent({ index, count, progress });
    }

    return null;
  }

  render() {
    const { hideAnimation } = this.state;
    const { count, hidesWhenStopped, ...props } = this.props;

    const styles: any = props.style ? [props.style] : [];
    if (hidesWhenStopped) {
      styles.push({ opacity: hideAnimation });
    }

    return <Animated.View {...props}>{Array.from(new Array(count), this.renderComponent, this)}</Animated.View>;
  }
}
