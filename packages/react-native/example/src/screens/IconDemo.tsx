import React from 'react';
import { Icon, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

export default function IconDemo() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Icon name="user" size={40} />
        <WhiteSpace />
        <Icon name="user" color="green" bgColor="red" size={40} rounded disabled ratio={2} />
        <WhiteSpace />
        <Icon
          name="user"
          bgColor="gold"
          color="red"
          rounded={false}
          size={40}
          ratio={2}
          onPress={() => {
            console.log(222);
          }}
        />
      </ScrollView>
    </Container>
  );
}
