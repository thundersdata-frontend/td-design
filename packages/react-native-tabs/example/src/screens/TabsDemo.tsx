import React from 'react';
import { View } from 'react-native';
import { Tabs } from '@td-design/react-native-tabs';

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;
const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: '#0189fb' }} />;
const ForthRoute = () => <View style={{ flex: 1, backgroundColor: '#00ff00' }} />;
const FifthRoute = () => <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} />;

const scenes01 = [
  {
    key: 'first',
    title: 'First11111111',
    scene: FirstRoute,
  },
  {
    key: 'second',
    title: 'Second22222222',
    scene: SecondRoute,
  },
  {
    key: 'third',
    title: 'Third3333333333333',
    scene: ThirdRoute,
  },
  {
    key: 'forth',
    title: 'Forth44444444444444',
    scene: ForthRoute,
  },
  {
    key: 'fifth',
    title: 'Fifth555555555555555555',
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

export function TabsDemo() {
  // return <Tabs scenes={scenes01} swipeEnabled scrollEnabled={false} />;
  return <Tabs scenes={scenes02} swipeEnabled scrollEnabled={false} />;
}
