import React, {Component} from 'react';
import {Animated, Text, Easing} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Ionicons';
import {SmartRefreshControl} from 'react-native-refreshview';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
export default class HuaWeiRefreshControl extends Component {
  state = {
    text: '下拉刷新',
    rotate: new Animated.Value(0),
    refreshing: false,
  };
  _onPullDownToRefresh = () => {
    this.setState({
      text: '下拉刷新',
      refreshing: false,
    });
    Animated.timing(this.state.rotate, {
      toValue: 0,
      duration: 197,
      useNativeDriver: true,
      easing: Easing.linear(),
    }).start();
  };
  _onReleased = () => {
    this.setState({
      refreshing: true,
      text: '正在刷新',
    });
  };
  _onReleaseToRefresh = () => {
    this.setState({
      text: '释放刷新',
    });
    Animated.timing(this.state.rotate, {
      toValue: 1,
      duration: 197,
      useNativeDriver: true,
      easing: Easing.linear(),
    }).start();
  };
  _onRefresh = () => {
    let {onRefresh} = this.props;
    onRefresh && onRefresh();
  };
  finishRefresh = params => {
    this._refreshc && this._refreshc.finishRefresh(params);
  };
  render() {
    return (
      <SmartRefreshControl
        primaryColor="#ffcc03"
        style={{flex: 1}}
        ref={ref => (this._refreshc = ref)}
        children={this.props.children}
        onRefresh={this._onRefresh}
        onPullDownToRefresh={this._onPullDownToRefresh}
        onHeaderReleased={this._onReleased}
        onReleaseToRefresh={this._onReleaseToRefresh}
        onHeaderMoving={e => {
          console.log(e.nativeEvent.percent);
        }}
        headerHeight={150}
        // renderHeader={<ClassicsHeader />}
        // renderHeader={<MaterialHeader />}
        // renderHeader={<StoreHouseHeader />}
      />
    );
  }
}
