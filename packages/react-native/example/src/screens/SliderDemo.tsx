import React, { FC } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Slider, helpers, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';

const { px } = helpers;
export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }} style={{ backgroundColor: '#a9cbee' }}>
        <Content>
          <Text>数字在右边</Text>
          {/* <WhiteSpace /> */}
          <Slider value={45} foregroundColor="gold" backgroundColor="red" borderColor="blue" handleBackground="pink" labelPosition='right' />


        </Content>
      </ScrollView>
    </Container>
  );
};

const Content: FC = ({ children }) => (
  <View
    style={{
      marginVertical: px(10),
      paddingBottom: px(10),
      // borderBottomWidth: 1,
      borderColor: '#000',
    }}
  >
    {children}
  </View>
);
