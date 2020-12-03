import React from 'react';
import { Swiper, Divider, helpers, WhiteSpace } from '@td-design/react-native';
import { Image, ScrollView, Text } from 'react-native';
import Container from '../components/Container';

const { px, deviceWidth } = helpers;
export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text>默认配置</Text>
        <Swiper width={deviceWidth - 40}>
          <Image source={require('../../assets/images/img-01.jpg')} />
          <Image source={require('../../assets/images/img-02.jpg')} />
          <Image source={require('../../assets/images/img-03.jpeg')} />
        </Swiper>
        <WhiteSpace />
        <Divider />
        <WhiteSpace />
        <Text>宽度200，高度100</Text>
        <Swiper width={px(200)} height={px(100)}>
          <Image source={require('../../assets/images/img-01.jpg')} />
          <Image source={require('../../assets/images/img-02.jpg')} />
          <Image source={require('../../assets/images/img-03.jpeg')} />
        </Swiper>
        <WhiteSpace />
        <Divider />
        <WhiteSpace />
        <Text>指示器位置靠上，居左</Text>
        <Swiper width={px(200)} height={px(100)} direction="top" align="left">
          <Image source={require('../../assets/images/img-01.jpg')} />
          <Image source={require('../../assets/images/img-02.jpg')} />
          <Image source={require('../../assets/images/img-03.jpeg')} />
        </Swiper>
        <WhiteSpace />
        <Divider />
        <WhiteSpace />
        <Text>循环滚动为false</Text>
        <Swiper width={px(200)} height={px(100)} loop={false}>
          <Image source={require('../../assets/images/img-01.jpg')} />
          <Image source={require('../../assets/images/img-02.jpg')} />
          <Image source={require('../../assets/images/img-03.jpeg')} />
        </Swiper>
        <WhiteSpace />
        <Divider />
        <WhiteSpace />
        <Text>停留时长1000</Text>
        <Swiper width={px(200)} height={px(100)} duration={1000}>
          <Image source={require('../../assets/images/img-01.jpg')} />
          <Image source={require('../../assets/images/img-02.jpg')} />
          <Image source={require('../../assets/images/img-03.jpeg')} />
        </Swiper>
        <WhiteSpace />
        <Divider />
        <WhiteSpace />
        <Text>垂直滚动</Text>
        <Swiper width={px(200)} height={px(100)} horizontal={false}>
          <Image source={require('../../assets/images/img-01.jpg')} />
          <Image source={require('../../assets/images/img-02.jpg')} />
          <Image source={require('../../assets/images/img-03.jpeg')} />
        </Swiper>
        <WhiteSpace />
        <Divider />
        <WhiteSpace />
        <Text>指示器位置居左，靠下</Text>
        <Swiper width={px(200)} height={px(100)} horizontal={false} direction="left" align="bottom">
          <Image source={require('../../assets/images/img-01.jpg')} />
          <Image source={require('../../assets/images/img-02.jpg')} />
          <Image source={require('../../assets/images/img-03.jpeg')} />
        </Swiper>
        <WhiteSpace />
        <Divider />
        <WhiteSpace />
        <Text>指示器颜色为gold</Text>
        <Swiper width={px(200)} height={px(100)} dotColor="gold">
          <Image source={require('../../assets/images/img-01.jpg')} />
          <Image source={require('../../assets/images/img-02.jpg')} />
          <Image source={require('../../assets/images/img-03.jpeg')} />
        </Swiper>
      </ScrollView>
    </Container>
  );
};
