import React, { ErrorInfo } from 'react';
import { ErrorBlock, Box, Text } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';
import { useEffect } from 'react';

export default function ErrorBlockDemo() {
  const onError = (err: Error, errorInfo: ErrorInfo) => {
    console.log(err, errorInfo);
  };

  const ErrorNode = () => (
    <Box>
      <Text>hahaha</Text>
    </Box>
  );

  return (
    <Container>
      <Box width={300} height={300} style={{ borderWidth: 1, borderColor: 'red' }}>
        <ErrorBlock onError={onError}>
          <Demo1 />
        </ErrorBlock>
      </Box>
      <Box width={300} height={300} style={{ borderWidth: 1, borderColor: 'red' }}>
        <ErrorBlock onError={onError} customNode={<ErrorNode />}>
          <Demo1 />
        </ErrorBlock>
      </Box>
    </Container>
  );
}

function Demo1(props: { a?: number }) {
  useEffect(() => {
    console.log('11');
    // @ts-ignore
    // props.a.b;
    // throw new Error(JSON.stringify({ type: 'request', message: '网络请求失败' }));
    throw new Error(JSON.stringify({ type: 'network', message: '当前网络不可用' }));
  }, []);

  return <View />;
}
