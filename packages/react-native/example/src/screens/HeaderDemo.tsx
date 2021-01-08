import React from 'react';
import { ImageHeader, helpers, Text, Icon, Flex, Box, WhiteSpace } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/theme';
import Container from '../components/Container';
import Animated from 'react-native-reanimated';
import { useScrollHandler } from 'react-native-redash';
import { TouchableOpacity } from 'react-native';

import { ScreenProps } from '../common';

const { px } = helpers;
const { AnimateHeader } = ImageHeader;

export default (props: ScreenProps) => {
  const theme = useTheme<Theme>();

  const { scrollHandler, y } = useScrollHandler();

  return (
    <Container>
      {/* 普通ImageHeader */}
      {/* <ImageHeader headerBackgroundImg={require('../../assets/images/bg_rank.png')} headerHeight={px(161)} {...props}>
        <Flex justifyContent="center" backgroundColor="white" height={100}>
          <Text>111</Text>
        </Flex>
      </ImageHeader>
      <WhiteSpace /> */}

      {/* ImageHeader配置left、right和headerLeftColor */}
      {/* <ImageHeader
        headerBackgroundImg={require('../../assets/images/bg_rank.png')}
        headerHeight={px(161)}
        headerLeftColor={theme.colors.white}
        headerLeft="返回"
        headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}
        {...props}
      >
        <Flex justifyContent="center" backgroundColor="white" height={100}>
          <Text>111</Text>
        </Flex>
      </ImageHeader>
      <WhiteSpace /> */}

      {/* ImageHeader配置headerBackgroundColor */}
      {/* <ImageHeader
        headerBackgroundImg={require('../../assets/images/bg_rank.png')}
        headerHeight={px(161)}
        headerBackgroundColor={theme.colors.white}
        headerLeft="返回"
        headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}
        {...props}
      >
        <Flex justifyContent="center" height={100}>
          <Text>111</Text>
        </Flex>
      </ImageHeader> */}

      {/* AnimatedHeader */}
      <AnimateHeader
        scrollY={y}
        scrollHeight={200}
        headerTitle="测试啊啊啊啊啊"
        headerLeft="返回"
        headerBackgroundColor={theme.colors.white}
        {...props}
        headerRight={
          <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.goBack()}>
            <Icon name="delete" size={px(20)} color={theme.colors.primaryColor} />
          </TouchableOpacity>
        }
      />
      <Animated.ScrollView {...scrollHandler}>
        <ImageHeader
          headerBackgroundImg={require('../../assets/images/bg_rank.png')}
          headerHeight={px(161)}
          headerLeftColor={theme.colors.white}
          headerRight={
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.goBack()}>
              <Icon name="delete" size={px(20)} color={theme.colors.primaryColor} />
            </TouchableOpacity>
          }
          {...props}
        >
          <Flex justifyContent="center" height={100}>
            <Text>111</Text>
          </Flex>
        </ImageHeader>
        <Box width={200} height={900} />
      </Animated.ScrollView>
    </Container>
  );
};
