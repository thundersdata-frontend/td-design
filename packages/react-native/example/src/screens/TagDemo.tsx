import React from 'react';
import { Flex, Tag, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';

export default () => {
  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <WingBlank>
          {/* <WhiteSpace />
          <Flex justifyContent="space-around">
            <Tag size="small">magenta</Tag>
            <Tag>magenta</Tag>
            <Tag size="large">magenta</Tag>
          </Flex> */}

          {/* <WhiteSpace />
          <Flex justifyContent="space-around">
            <Tag size="small" type="secondary">
              magenta
            </Tag>
            <Tag type="secondary">magenta</Tag>
            <Tag size="large" type="secondary">
              magenta
            </Tag>
          </Flex> */}

          {/* <WhiteSpace />
          <Flex justifyContent="space-around">
            <Tag size="small" closable>
              magenta
            </Tag>
            <Tag closable>magenta</Tag>
            <Tag size="large" closable>
              magenta
            </Tag>
          </Flex> */}

          <WhiteSpace />
          <Flex justifyContent="space-around">
            <Tag size="small" disabled>
              magenta
            </Tag>
            <Tag disabled>magenta</Tag>
            <Tag size="large" disabled>
              magenta
            </Tag>
          </Flex>

          <WhiteSpace />
          <Flex justifyContent="space-around">
            <Tag size="small" type="ghost">
              magenta
            </Tag>
            <Tag type="ghost" disabled>
              magenta
            </Tag>
            <Tag size="large" type="ghost">
              magenta
            </Tag>
          </Flex>

          <WhiteSpace />
          <Flex justifyContent="space-around">
            <Tag size="small" background="rgba(219, 46, 17, 0.15)" color="red">
              red
            </Tag>
            <Tag background="rgba(219, 46, 17, 0.15)" color="red" checked>
              red
            </Tag>
            <Tag size="large" background="rgba(219, 46, 17, 0.15)" color="red">
              red
            </Tag>
          </Flex>

          <WhiteSpace />
          <Flex justifyContent="space-around">
            <Tag size="small" color="magenta">
              magenta
            </Tag>
            <Tag color="magenta">magenta</Tag>
            <Tag size="large" color="magenta" checked>
              magenta
            </Tag>
          </Flex>

          <WhiteSpace />
        </WingBlank>
      </View>
    </Container>
  );
};
