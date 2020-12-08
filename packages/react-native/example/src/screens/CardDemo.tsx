import React from 'react';
import { Card, Text, Box, Icon, WhiteSpace } from '@td-design/react-native';
import Container from '../components/Container';
import { ScrollView } from 'react-native';

export default function CardDemo() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Card
          icon={<Icon name="user" color="green" />}
          title="我是标题"
          extra="说明文字"
          footer={
            <Box>
              <Text variant="primaryTip">底部文字</Text>
            </Box>
          }
        >
          <Text variant="secondaryBodyReverse">
            我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
          </Text>
        </Card>
        <WhiteSpace />
        <Card title="我是标题" extra="说明文字">
          <Text variant="secondaryBodyReverse">
            我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
          </Text>
        </Card>
        <WhiteSpace />
        <Card
          renderHeader={() => (
            <Box>
              <Text variant="primaryBody">自定义标题</Text>
            </Box>
          )}
        >
          <Text variant="secondaryBodyReverse">
            我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
          </Text>
        </Card>
        <WhiteSpace />
        <Card renderHeader={() => <Text variant="primaryBody">自定义标题</Text>} hideHeader>
          <Text variant="secondaryBodyReverse">
            我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文我是正文
          </Text>
        </Card>
      </ScrollView>
    </Container>
  );
}
