import React from 'react';
import { Image } from '@td-design/react-native';
import { ActivityIndicator } from 'react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
        }}
        style={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
        }}
        style={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
        transitionDuration={4000}
      />
      <Image
        source={require('../../assets/images/island.jpg')}
        style={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
      />
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
      <Image
        source={{
          uri:
            'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
        }}
        style={{ width: 100, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
        transitionDuration={4000}
        placeholderStyle={{ backgroundColor: 'orange' }}
        hasTransition={false}
      />
    </Container>
  );
};
