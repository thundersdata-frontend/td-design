import React from 'react';
import { Accordion, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';

export default function AccordionDemo() {
  return (
    <Container>
      <WingBlank>
        <Accordion
          multiple
          activeSections={[1]}
          onChange={sections => console.log(sections)}
          sections={[
            { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
            {
              title: 'title2',
              content:
                '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
            },
            {
              title: 'title3',
              content:
                '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
            },
          ]}
        />
      </WingBlank>
    </Container>
  );
}
