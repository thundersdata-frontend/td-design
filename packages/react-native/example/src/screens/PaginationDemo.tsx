import React from 'react';
import { Alert, Text } from 'react-native';
import { Pagination, WingBlank, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
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
          counterRender={(currentIndex, totalPages) => {
            return <Text>{currentIndex + ' / ' + totalPages}</Text>;
          }}
        />
      </WingBlank>
    </Container>
  );
};
