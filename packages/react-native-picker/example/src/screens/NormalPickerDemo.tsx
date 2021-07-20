import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { Box, Button, Text } from '@td-design/react-native';
import { Picker } from '@td-design/react-native-picker';
import { CascadePickerItemProps, ItemValue } from '../../picker/type';

export function NormalPickerDemo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<ItemValue[] | undefined>(undefined);

  const [pickerData, setPickerData] = useState<CascadePickerItemProps[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setPickerData([
        { label: 'aaa', value: 1 },
        { label: 'bbb', value: 2 },
        { label: 'ccc', value: 3 },
      ]);
    }, 2000);
  }, []);

  const handleChange = (val?: ItemValue[]) => {
    console.log(val);
    setValue(val);
  };

  return (
    <Container>
      <Box>
        <Text>当前值：{value?.[0]}</Text>
        <Button title="显示picker" onPress={() => setVisible(true)} />
        <Picker
          visible={visible}
          value={value}
          onChange={handleChange}
          onClose={() => setVisible(false)}
          data={pickerData}
        />
      </Box>
    </Container>
  );
}
