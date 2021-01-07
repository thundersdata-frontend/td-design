import React from 'react';
import { View, Text } from 'react-native';
import { Tree } from '@td-design/react-native';

export default () => {
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ title: <Text style={{ color: '#1890ff' }}>sss</Text>, key: '0-0-1-0' }],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '2-0',
      children: [
        {
          title: 'parent 2-0',
          key: '2-2-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '2-2-2-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '2-2-2-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '2-2-1',
          children: [{ title: <Text style={{ color: '#1890ff' }}>sss</Text>, key: '2-2-1-0' }],
        },
      ],
    },
    {
      title: 'parent 3',
      key: '3-0',
      children: [
        {
          title: 'parent 3-0',
          key: '3-1-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '3-1-1-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '3-1-1-1',
            },
          ],
        },
        {
          title: 'parent 3-1',
          key: '3-2-1',
          children: [{ title: <Text style={{ color: '#1890ff' }}>sss</Text>, key: '3-2-1-0' }],
        },
      ],
    },
  ];

  return (
    <View>
      <Tree
        treeData={treeData}
        onCheck={e => {
          console.log(e);
        }}
      />
    </View>
  );
};
