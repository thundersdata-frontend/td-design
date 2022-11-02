import React from 'react';
import { Badge, Box, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Badge text="10" containerStyle={{ top: -5, right: -10, backgroundColor: 'green' }}>
          <Box width={50} height={52} backgroundColor="func500" />
        </Badge>
        <WhiteSpace />
        <Badge text="折扣券" containerStyle={{ width: 60, right: -50, height: 30, top: -15 }} textStyle={{}}>
          <Box backgroundColor="func500" width={52} height={52} />
        </Badge>
        <WhiteSpace />
        <Badge text={4} type="dot">
          <Box width={50} height={52} backgroundColor="func500" />
        </Badge>
        <WhiteSpace />
        <Badge text={4} type="dot" containerStyle={{ left: -4 }}>
          <Box width={50} height={52} backgroundColor="func500" />
        </Badge>
        <WhiteSpace />
        <Badge
          text={10900}
          max={14000}
          containerStyle={{ right: -40, top: -20, borderRadius: 20 }}
          textStyle={{ fontSize: 40, color: 'green' }}
        >
          <Box backgroundColor="func500" width={302} height={132} />
        </Badge>
        <WhiteSpace />
        <Badge text={10900} containerStyle={{ right: -15, top: -10 }}>
          <Box backgroundColor="func500" width={302} height={132} />
        </Badge>
        <WhiteSpace />
      </ScrollView>
    </Container>
  );
};
