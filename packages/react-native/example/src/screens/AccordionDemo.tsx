import React from 'react';
import { Accordion } from '@td-design/react-native';
import Container from '../components/Container';

export default function AccordionDemo() {
  return (
    <Container>
      <Accordion
        sections={[
          { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
          {
            title: 'title2',
            content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
          },
          {
            title: 'title3',
            content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内`,
          },
        ]}
      />
    </Container>
  );
}
