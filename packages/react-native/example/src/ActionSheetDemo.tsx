import React, { useState } from 'react';
import { ActionSheet } from '@td-design/react-native';
import { Button } from 'react-native';

export default function ActionSheetDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="显示" onPress={() => setVisible(true)} />
      <ActionSheet
        data={[
          { text: '操作1', onPress: () => console.log(1) },
          { text: '操作2', onPress: () => console.log(2) },
          { text: '操作3', onPress: () => console.log(3) },
          { text: '操作4', onPress: () => console.log(4), type: 'danger' },
        ]}
        onCancel={() => setVisible(false)}
        visible={visible}
      />
    </>
  );
}
