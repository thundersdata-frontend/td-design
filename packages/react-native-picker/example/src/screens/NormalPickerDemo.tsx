import React, { useState } from 'react';
import Container from '../components/Container';
import { Box, Button, Text } from '@td-design/react-native';
import { Picker } from '@td-design/react-native-picker';

export function NormalPickerDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <Container>
      <Box>
        <Text>NormalPickerDemo</Text>
        <Button title="显示picker" onPress={() => setVisible(true)} />
        <Picker
          visible={visible}
          data={[
            { label: 'aaa', value: 1 },
            { label: 'bbb', value: 2 },
            { label: 'ccc', value: 3 },
          ]}
        />
      </Box>
    </Container>
  );
}
