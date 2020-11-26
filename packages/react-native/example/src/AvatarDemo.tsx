import React from 'react';
import { Avatar, Flex, WhiteSpace, Icon } from '@td-design/react-native';

const { Accessory, AvatarGroup } = Avatar;
export default () => {
  return (
    <>
      <WhiteSpace />
      <Flex>
        <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000">
          <Accessory component={<Icon name="user" color="green" rounded />} top={true} />
        </Avatar>
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular={false}
        >
          <Accessory icon={{ name: 'user', rounded: true }} />
        </Avatar>
        <Avatar url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000">
          <Accessory url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000" />
        </Avatar>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular={false}
        />
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular={false}
        />
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular={false}
        />
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          size={100}
          borderRadius={20}
          circular={false}
        />
      </Flex>
      <WhiteSpace />
      <Flex>
        <Avatar title="123" circular />
        <Avatar url={require('../assets/images/island.jpg')} circular />
        <Avatar
          url="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular
        />
      </Flex>
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
      <Flex>
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
      </Flex>
    </>
  );
};
