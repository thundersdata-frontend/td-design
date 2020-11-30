import React from 'react';
import { Header, WhiteSpace, helpers, Text, Icon, Flex, WingBlank } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';

const { px } = helpers;

export default () => {
  const theme = useTheme<Theme>();

  return (
    <>
      <Header headerTitle="测试" />
      <WhiteSpace />
      <Header headerTitle="测试" headerTitleStyle={{ color: 'red', fontSize: px(26) }} />
      <WhiteSpace />
      <Header headerTitle="酒店详情" headerRight={<Text>完成</Text>} />
      <WhiteSpace />
      <Header headerTitle="测试" headerRight={<Icon name="plus" color={theme.colors.primaryColor} size={px(14)} />} />
      <WhiteSpace />
      <Header
        headerTitle="测试"
        backIconColor={theme.colors.primaryColor}
        headerLeftText={
          <Text color="primaryColor" fontSize={px(16)}>
            返回
          </Text>
        }
      />
      <WhiteSpace />
      <Header
        headerTitle="测试"
        backIconColor={theme.colors.white}
        headerBackgroundColor={theme.colors.warningColor1}
      />
      <WhiteSpace />
      <Header
        headerTitle="测试"
        headerBackgroundImg={require('../assets/images/bg_rank.png')}
        backIconColor={theme.colors.white}
        headerTitleStyle={{ color: 'white' }}
      />
      <WhiteSpace />
      <Header
        headerTitle="测试"
        headerBackgroundImg={require('../assets/images/bg_rank.png')}
        headerHeight={px(161)}
        backIconColor={theme.colors.white}
        headerTitleStyle={{ color: 'white' }}
      >
        <WingBlank>
          <Flex marginTop="xl">
            <Flex.Item alignItems="center">
              <Text>零钱包漫克</Text>
            </Flex.Item>
            <Flex.Item alignItems="center">
              <Text>链上钱包</Text>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </Header>
    </>
  );
};
