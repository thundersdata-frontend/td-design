import React from 'react';
import { Image, View } from 'react-native';
import { Tabs } from '@td-design/react-native-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;
const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: '#0189fb' }} />;
const ForthRoute = () => <View style={{ flex: 1, backgroundColor: '#00ff00' }} />;
const FifthRoute = () => <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} />;

const scenes01 = [
  {
    key: 'first',
    title: 'First',
    scene: FirstRoute,
  },
  {
    key: 'second',
    title: 'Second',
    scene: SecondRoute,
  },
  {
    key: 'third',
    title: 'Third',
    scene: ThirdRoute,
  },
  {
    key: 'forth',
    title: 'Forth',
    scene: ForthRoute,
  },
  {
    key: 'fifth',
    title: 'Fifth',
    scene: FifthRoute,
  },
];

const scenes02 = [
  {
    key: 'first',
    title: 'First',
    scene: FirstRoute,
  },
  {
    key: 'second',
    title: 'Second2222',
    scene: SecondRoute,
  },
  {
    key: 'third',
    title: 'Third333333333',
    scene: ThirdRoute,
  },
];

const scenes03 = [
  {
    key: 'first',
    title: 'First',
    scene: FirstRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'second',
    title: 'Second',
    scene: SecondRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/wode_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/wode_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'third',
    title: 'Third',
    scene: ThirdRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
];

export function TabsDemo() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Tabs scenes={scenes01} swipeEnabled /> */}
      {/* <Tabs scenes={scenes02} swipeEnabled /> */}
      {/* <Tabs scenes={scenes03} swipeEnabled showIcon={false} /> */}
      {/* <Tabs scenes={scenes03} swipeEnabled showIcon indicatorStyle={{ backgroundColor: 'red' }} /> */}
      <Tabs scenes={scenes03} swipeEnabled showIcon showIndicator={false} />
    </SafeAreaView>
  );
}
