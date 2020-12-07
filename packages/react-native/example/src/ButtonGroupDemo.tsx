import React from 'react';
import { ButtonGroup, WhiteSpace, helpers, Icon } from '@td-design/react-native';

const { px } = helpers;

export default () => {
  return (
    <>
      <WhiteSpace />
      <ButtonGroup
        options={['test1', 'test2', 'test3']}
        disabledValue={['test1']}
        activeBgColor='red'
        activeTextColor='blue'
        inactiveBgColor='green'
        onChange={(value) => {
          console.log(value);
        }}
        containerStyle={{ padding: px(2), backgroundColor: 'blue' }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={['L', 'R']}
        onChange={(value) => {
          console.log(value);
        }}
        size='xl'
        containerStyle={{ width: '75%' }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={['L', 'R']}
        onChange={(value) => {
          console.log(value);
        }}
        itemStyle={{ borderColor: 'blue', backgroundColor: 'skyblue' }}
        inactiveTextColor='blue'
        activeTextColor='blue'
        containerStyle={{ width: '50%' }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={['L', 'R']}
        onChange={(value) => {
          console.log(value);
        }}
        itemStyle={{ borderColor: 'blue', backgroundColor: 'skyblue' }}
        size='xs'
        containerStyle={{ width: '25%' }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={[{
          label: <Icon name='star' />,
          value: 'star1',
        }, {
          label: <Icon name='star' color='blue' />,
          value: 'star2',
        }, {
          label: <Icon name='star' />,
          value: 'star3',
        }, {
          label: <Icon name='star' />,
          value: 'star4',
        }, {
          label: <Icon name='star' />,
          value: 'star5',
        }]}
        activeBgColor='pink'
        inactiveBgColor='white'
        multiple
        onChange={(value) => {
          console.log(value);
        }}
      />
      <WhiteSpace />
      <ButtonGroup
        options={['年', '月', '日']}
        onChange={(value) => {
          console.log(value);
        }}
        size='s'
        activeTextColor='blue'
        activeBgColor='pink'
        inactiveBgColor='skyblue'
        containerStyle={{ width: '50%' }}
      />
      <WhiteSpace />
    </>
  );
};
