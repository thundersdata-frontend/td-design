import React from 'react';
import { ScrollView, Alert, Text } from 'react-native';
import { Pagination, WingBlank, WhiteSpace } from '@td-design/react-native';

export default () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <WingBlank>
        <Text>常规:</Text>
        <Pagination
          total={66}
          onChange={e => {
            Alert.alert(e + '');
          }}
        />
        <WhiteSpace />
        <Text>设置page:</Text>
        <Pagination
          page={3}
          total={66}
          onChange={e => {
            Alert.alert(e + '');
          }}
        />
        <WhiteSpace />
        <Text>自定义render:</Text>
        <Pagination
          total={66}
          onChange={e => {
            Alert.alert(e + '');
          }}
          prevButtonRender={isFirstPage => {
            return isFirstPage ? <Text>isFirstPage</Text> : <Text>notFirstPage</Text>;
          }}
          nextButtonRender={isLastPage => {
            return isLastPage ? <Text>LastPage</Text> : <Text>notLastPage</Text>;
          }}
          counterRender={(currentindex, totalPages) => {
            return <Text>{currentindex + '/' + totalPages}</Text>;
          }}
        />
      </WingBlank>
    </ScrollView>
  );
};
