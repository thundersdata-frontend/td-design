import React from 'react';
import { Text } from 'react-native';
import { Image, WhiteSpace } from '@td-design/react-native';
import { ActivityIndicator } from 'react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <WhiteSpace />
      <Text>不需要过度动画：</Text>
      <WhiteSpace />
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
        }}
        style={{ width: 100, height: 100 }}
        hasTransition={false}
      />
      <WhiteSpace />
      <Text>自定义loadding：</Text>
      <WhiteSpace />
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
        }}
        style={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <WhiteSpace />
      <Image
        source={require('../../assets/images/island.jpg')}
        style={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <WhiteSpace />
      <Text>自定义延迟：</Text>
      <WhiteSpace />
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
        }}
        style={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
        transitionDuration={4000}
      />
      <WhiteSpace />
      <Text>自定义背景延迟：</Text>
      <WhiteSpace />
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
        }}
        style={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
        transitionDuration={4000}
        placeholderStyle={{ backgroundColor: 'orange' }}
      />
    </Container>
  );
};
