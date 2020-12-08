import React from 'react';
import { ButtonGroup, WhiteSpace, helpers, Icon } from '@td-design/react-native';
import Container from '../components/Container';

const { px } = helpers;

export default () => {
  return (
    <Container>
      <WhiteSpace />
      <ButtonGroup
        options={[{ label: 'test1', onPress: () => { console.log(111) } }, { label: 'test2' }, { label: 'test3' }]}
      />
      <WhiteSpace />
      <ButtonGroup
        options={[{ label: 'test1', style: { backgroundColor: 'pink' } }, { label: 'test2' }, { label: 'test3' }]}
        disabledItems={[1]}
        activeBgColor='red'
        activeTextColor='blue'
        inactiveBgColor='green'
        containerStyle={{ padding: px(2), backgroundColor: 'blue' }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={[{ label: 'L' }, { label: 'R' }]}
        size='xl'
        containerStyle={{ width: '75%' }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={[{ label: 'L' }, { label: 'R' }]}
        itemStyle={{ borderColor: 'blue', backgroundColor: 'skyblue' }}
        inactiveTextColor='blue'
        activeTextColor='blue'
        containerStyle={{ width: '50%' }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={[{ label: 'L' }, { label: 'R' }]}
        itemStyle={{ borderColor: 'blue', backgroundColor: 'skyblue' }}
        size='xs'
        containerStyle={{ width: '25%' }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={[{
          label: <Icon name='star' />,
        }, {
          label: <Icon name='star' color='blue' />,
        }, {
          label: <Icon name='star' />,
        }, {
          label: <Icon name='star' />,
        }, {
          label: <Icon name='star' />,
        }]}
        activeBgColor='pink'
        inactiveBgColor='white'
      />
      <WhiteSpace />
      <ButtonGroup
        options={[{ label: '年' }, { label: '月' }, { label: '周' }]}
        size='s'
        activeTextColor='blue'
        activeBgColor='pink'
        inactiveBgColor='skyblue'
        containerStyle={{ width: '50%' }}
      />
      <WhiteSpace />
    </Container>
  );
};
