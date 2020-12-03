import React from 'react';
import { Icon } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

export default function IconDemo() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Icon name="user" />
        <Icon name="user" color="green" rounded shadow ratio={2} disabled />
        <Icon name="user" color="red" rounded shadow ratio={2} onPress={() => {}} />
      </ScrollView>
    </Container>
  );
}
