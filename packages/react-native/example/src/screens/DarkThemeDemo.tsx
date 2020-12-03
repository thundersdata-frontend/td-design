import React from 'react';
import { Box, Text } from '@td-design/react-native';
import { Switch } from 'react-native';
import Container from '../components/Container';

export default function DarkThemeDemo({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Container>
      <Switch value={checked} onValueChange={onChange} />
      <Box backgroundColor="backgroundColor1">
        <Text variant="primaryTitle">哈哈哈哈，我是内容</Text>
      </Box>
    </Container>
  );
}
