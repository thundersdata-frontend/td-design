import React from 'react';
import { ButtonGroup, WhiteSpace, helpers, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';

const { px } = helpers;

export default () => {
  return (
    <Container>
      <WingBlank>
        <WhiteSpace />
        <ButtonGroup
          options={[
            {
              label: 'test1',
              onPress: () => {
                console.log(111);
              },
            },
            { label: 'test2' },
            { label: 'test3' },
          ]}
        />
        <WhiteSpace />
        <ButtonGroup options={[{ label: 'L' }, { label: 'R' }]} size="x5" containerStyle={{ width: '75%' }} />
        <WhiteSpace />
        <ButtonGroup options={[{ label: 'L' }, { label: 'R' }]} containerStyle={{ width: '50%' }} />
        <WhiteSpace />
        <ButtonGroup options={[{ label: 'L' }, { label: 'R' }]} size="x1" containerStyle={{ width: '25%' }} />
        <WhiteSpace />
        <ButtonGroup
          options={[{ label: 'test1', style: { backgroundColor: 'pink' } }, { label: 'test2' }, { label: 'test3' }]}
          disabledItems={[1]}
        />
        <WhiteSpace />
        <ButtonGroup
          options={[{ label: '年' }, { label: '月' }, { label: '周' }]}
          size="x2"
          containerStyle={{ width: '50%' }}
        />
        <WhiteSpace />
      </WingBlank>
    </Container>
  );
};
