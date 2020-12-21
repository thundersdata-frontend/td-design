import React from 'react';
import { Text } from 'react-native';
import { Avatar, Flex, WhiteSpace, Icon } from '@td-design/react-native';
import Container from '../components/Container';

const { Accessory, AvatarGroup } = Avatar;
export default () => {
  return (
    <Container>
      <WhiteSpace />
      <Text>默认头像:</Text>
      <WhiteSpace />
      <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000" />

      <WhiteSpace />
      <Text>头像大小:</Text>
      <WhiteSpace />
      <Flex>
        <Avatar
          size={20}
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
        />
        <Avatar
          size={40}
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
        />
        <Avatar
          size={60}
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
        />
      </Flex>

      <WhiteSpace />
      <Text>头像弧度:</Text>
      <WhiteSpace />
      <Flex>
        <Avatar
          circular={false}
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
        />
        <Avatar
          borderRadius={10}
          circular={false}
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
        />
        <Avatar
          borderRadius={20}
          circular={false}
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
        />
      </Flex>

      <WhiteSpace />
      <Text>头像挂架:</Text>
      <WhiteSpace />
      <Flex>
        <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000">
          <Accessory component={<Icon name="user" color="green" rounded />} top={true} />
        </Avatar>
        <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000">
          <Accessory component={<Icon name="user" color="green" rounded />} top={true} left={true} />
        </Avatar>
        <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000">
          <Accessory url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000" />
        </Avatar>
      </Flex>

      <WhiteSpace />
      <Text>头像内容:</Text>
      <WhiteSpace />
      <Flex>
        <Avatar title="123" />
        <Avatar url={require('../../assets/images/island.jpg')} />
        <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000" />
      </Flex>

      <WhiteSpace />
      <Text>头像组:</Text>
      <WhiteSpace />
      <Flex>
        <AvatarGroup max={4}>
          <Avatar
            url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            url="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
            circular
          />
          <Avatar
            url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            url="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
            circular
          />
        </AvatarGroup>
      </Flex>
      <WhiteSpace />
      <Text>头像组背景:</Text>
      <WhiteSpace />
      <AvatarGroup max={4} backgroundColor="orange">
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular
        />
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular
        />
        <Avatar
          url="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
          circular
        />
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular
        />
        <Avatar
          url="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
          circular
        />
      </AvatarGroup>
    </Container>
  );
};
