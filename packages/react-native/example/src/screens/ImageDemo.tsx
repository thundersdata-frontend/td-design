import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { Image, WhiteSpace, Button } from '@td-design/react-native';
import Container from '../components/Container';

import base64Img from '../components/fields';

const baseUri =
  'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000';
export default () => {
  const [uri, setUri] = useState(baseUri);

  return (
    <Container>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, backgroundColor: '#fff' }}>
        <Text>基本:</Text>
        <Image
          source={{
            uri,
          }}
          style={{ width: 100, height: 100 }}
          // showProgress={false}
        />
        <WhiteSpace />
        <Button title="重新请求" onPress={() => setUri(baseUri + `?bust=${Math.random().toString()}`)} />
        <WhiteSpace />
        <Text>本地jpg:</Text>
        <Image source={require('../../assets/images/fields.jpg')} style={{ width: 300, height: 300 }} />
        <WhiteSpace />
        <Text>本地png:</Text>
        <Image source={require('../../assets/images/logo.png')} style={{ width: 300, height: 300 }} />
        <WhiteSpace />
        <Text>本地gif:</Text>
        <Image source={require('../../assets/images/jellyfish.gif')} style={{ width: 300, height: 300 }} />
        <WhiteSpace />
        <Text>本地webp:</Text>
        <Image source={require('../../assets/images/fields.webp')} style={{ width: 300, height: 300 }} />
        <WhiteSpace />
        <Text>base64:</Text>
        <Image source={{ uri: base64Img }} style={{ width: 300, height: 300 }} />
        <WhiteSpace />
      </ScrollView>
    </Container>
  );
};
