import React, { useState } from 'react';
import { Text, Button, ScrollView } from 'react-native';
import { Image, WhiteSpace, Box } from '@td-design/react-native';
import { ActivityIndicator } from 'react-native';
import Container from '../components/Container';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
        <WhiteSpace />
        <Text>基本:</Text>
        <WhiteSpace />
        {visible ? (
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
            }}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Box style={{ width: 100, height: 100 }}></Box>
        )}
        <WhiteSpace />
        <Text>不需要过度动画：</Text>
        <WhiteSpace />
        {visible ? (
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
            }}
            style={{ width: 100, height: 100 }}
            hasTransition={false}
          />
        ) : (
          <Box style={{ width: 100, height: 100 }}></Box>
        )}
        <WhiteSpace />
        <Text>自定义loadding：</Text>
        <WhiteSpace />
        {visible ? (
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
            }}
            style={{ width: 100, height: 100 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <Box style={{ width: 100, height: 100 }}></Box>
        )}
        <WhiteSpace />
        {visible ? (
          <Image
            source={require('../../assets/images/island.jpg')}
            style={{ width: 100, height: 100 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <Box style={{ width: 100, height: 100 }}></Box>
        )}
        <WhiteSpace />
        <Text>自定义延迟：</Text>
        <WhiteSpace />
        {visible ? (
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
            }}
            style={{ width: 100, height: 100 }}
            PlaceholderContent={<ActivityIndicator />}
            transitionDuration={4000}
          />
        ) : (
          <Box style={{ width: 100, height: 100 }}></Box>
        )}
        <WhiteSpace />
        <Text>自定义背景延迟：</Text>
        <WhiteSpace />
        {visible ? (
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
        ) : (
          <Box style={{ width: 100, height: 100 }}></Box>
        )}
        <WhiteSpace />
        <Button
          title="按钮"
          onPress={() => {
            setVisible(true);
          }}
        />
        <WhiteSpace />
      </ScrollView>
    </Container>
  );
};
