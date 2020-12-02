import React from 'react';
import { ImageHeader, helpers, Text, Icon, Flex, Box, WhiteSpace, AnimateHeader } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/theme';
import Container from '../components/Container';
import Animated from 'react-native-reanimated';
import { useScrollHandler } from 'react-native-redash/lib/module/v1';

const { px } = helpers;

export default props => {
  const theme = useTheme<Theme>();

  const { scrollHandler, y } = useScrollHandler();

  console.log(y, 'yyyy');

  return (
    <Container hasHeader={false}>
      <AnimateHeader
        y={y}
        scope={200}
        headerTitle="测试啊啊啊啊啊"
        headerLeftText="返回"
        headerBackgroundColor="orange"
        {...props}
        headerRight={<Icon name="delete" size={px(20)} color={theme.colors.primaryColor} />}
      />
      <Animated.ScrollView {...scrollHandler}>
        <ImageHeader
          isAnimated={true}
          y={y}
          headerBackgroundImg={require('../../assets/images/bg_rank.png')}
          headerHeight={px(161)}
          headerLeftColor={theme.colors.white}
          headerTitle="测试"
          headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}
          {...props}
        >
          <Flex justifyContent="center" height={100}>
            <Text>111</Text>
          </Flex>
        </ImageHeader>
        <Box width={200} height={900} backgroundColor="warningColor1" />
      </Animated.ScrollView>
      {/* <ImageHeader
        headerBackgroundImg={require('../../assets/images/bg_rank.png')}
        headerHeight={px(161)}
        headerLeftColor={theme.colors.white}
        headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}
        {...props}
      >
        <Flex justifyContent="center" backgroundColor="white" height={100}>
          <Text>111</Text>
        </Flex>
      </ImageHeader>
      <WhiteSpace />
      <ImageHeader
        headerBackgroundImg={require('../../assets/images/bg_rank.png')}
        headerHeight={px(161)}
        headerLeftColor={theme.colors.white}
        headerLeftText="返回"
        headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}
        {...props}
      >
        <Flex justifyContent="center" backgroundColor="white" height={100}>
          <Text>111</Text>
        </Flex>
      </ImageHeader>
      <WhiteSpace />
      <ImageHeader
        headerBackgroundImg={require('../../assets/images/bg_rank.png')}
        headerHeight={px(161)}
        headerBackgroundColor={theme.colors.white}
        headerLeftText="返回"
        headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}
        {...props}
      >
        <Flex justifyContent="center" height={100}>
          <Text>111</Text>
        </Flex>
      </ImageHeader> */}
    </Container>
  );
};
