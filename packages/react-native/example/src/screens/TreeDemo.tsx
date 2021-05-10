import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { Tree, WhiteSpace, Button } from '@td-design/react-native';

const { modal } = Tree;

export default () => {
  const [checked, setChecked] = useState<string[]>();
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
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
          children: [
            {
              title: 'leaf',
              key: '2-2-2-0',
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
          children: [
            {
              title: 'leaf',
              key: '3-1-1-0',
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
    <ScrollView>
      <WhiteSpace />
      <Text>树视图受控:</Text>
      <WhiteSpace />
      <Tree
        height={300}
        treeData={treeData}
        checkedKeys={checked}
        onCheck={e => {
          console.log(e);
          setChecked(e);
        }}
      />
      <WhiteSpace />
      <Text>默认展开全部:</Text>
      <WhiteSpace />
      <Tree
        height={300}
        treeData={treeData}
        defaultExpandAll={true}
        onCheck={e => {
          console.log(e);
        }}
      />
      <WhiteSpace />
      <Text>默认选中:</Text>
      <WhiteSpace />
      <Tree
        height={300}
        treeData={treeData}
        defaultCheckedKeys={['0-0', '3-2-1']}
        onCheck={e => {
          console.log(e);
        }}
      />
      <WhiteSpace />
      <Text>禁用:</Text>
      <WhiteSpace />
      <Tree height={300} treeData={treeData} disabled />
      <WhiteSpace />
      <Text>严格选中:</Text>
      <WhiteSpace />
      <Tree height={300} treeData={treeData} checkStrictly />
      <WhiteSpace />
      <Text>默认展开节点:</Text>
      <WhiteSpace />
      <Tree height={300} treeData={treeData} defaultExpandedKeys={['0-0', '3-2-1']} />
      <WhiteSpace />
      <Text>展开节点:</Text>
      <WhiteSpace />
      <Tree height={300} treeData={treeData} expandedKeys={['0-0', '3-2-1']} />
      <WhiteSpace />
      <Text>是否显示尾部的图标:</Text>
      <WhiteSpace />
      <Tree height={300} treeData={treeData} switcherIcon={false} />
      <WhiteSpace />
      <Text>自定义icon:</Text>
      <WhiteSpace />
      <Tree
        height={300}
        treeData={treeData}
        icon={action => {
          return action ? <Text>选中</Text> : <Text>未选中</Text>;
        }}
      />
      <WhiteSpace />
      <Text>树弹窗:</Text>
      <WhiteSpace />
      <Button
        title="modal"
        onPress={() =>
          modal({
            treeData: treeData,
            defaultExpandAll: true,
          })
        }
      />
    </ScrollView>
  );
};
