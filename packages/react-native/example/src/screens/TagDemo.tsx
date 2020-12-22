import React from 'react';
import { Flex, Tag, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <WingBlank>
        {/* <WhiteSpace />
        <Flex justifyContent="space-around">
          <Tag size="small">magenta</Tag>
          <Tag>magenta</Tag>
          <Tag size="large">magenta</Tag>
        </Flex> */}

        {/* <WhiteSpace />
        <Flex justifyContent="space-around">
          <Tag size="small" type="primary">
            magenta
          </Tag>
          <Tag type="primary">magenta</Tag>
          <Tag size="large" type="primary">
            magenta
          </Tag>
        </Flex> */}

        {/* <WhiteSpace />
        <Flex justifyContent="space-around">
          <Tag size="small" closable>
            magenta
          </Tag>
          <Tag closable>
            magenta
          </Tag>
          <Tag size="large" closable>
            magenta
          </Tag>
        </Flex> */}

        {/* <WhiteSpace />
        <Flex justifyContent="space-around">
          <Tag size="small" disabled>
            magenta
          </Tag>
          <Tag disabled>
            magenta
          </Tag>
          <Tag size="large" disabled>
            magenta
          </Tag>
        </Flex> */}

        {/* <WhiteSpace />
        <Flex justifyContent="space-around">
          <Tag size="small" type="ghost">
            magenta
          </Tag>
          <Tag type="ghost">
            magenta
          </Tag>
          <Tag size="large" type="ghost">
            magenta
          </Tag>
        </Flex> */}

        <WhiteSpace />
        <Flex justifyContent="space-around">
          <Tag size="small" color="red" checked>
            red
          </Tag>
          <Tag color="red" checked>
            red
          </Tag>
          <Tag size="large" color="red">
            red
          </Tag>
        </Flex>

        {/* <WhiteSpace />
        <Flex justifyContent="space-around">
          <Tag size="small" color="magenta">
            magenta
          </Tag>
          <Tag color="magenta">
            magenta
          </Tag>
          <Tag size="large" color="magenta" checked>
            magenta
          </Tag>
        </Flex> */}

        <WhiteSpace />
      </WingBlank>
    </Container>
  );
};
