import React from 'react';
import { Avatar, helpers, Flex, WhiteSpace, AvatarGroup } from '@td-design/react-native';
import { Text, Image } from 'react-native';

export default () => {
  return (
    <>
      <WhiteSpace />
      <Flex>
        <Avatar source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000" />
        <Avatar
          source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          AccessoryProps={{ name: 'user' }}
        />
        <Avatar
          source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          AccessoryProps={{
            source: {
              uri:
                'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
            },
          }}
        />
      </Flex>
      <WhiteSpace />
      <Flex>
        <Avatar
          source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          size="xs"
          circular={false}
        />
        <Avatar
          source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          size="md"
          circular={false}
        />
        <Avatar
          source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          size="lg"
          circular={false}
        />
        <Avatar
          source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          size={100}
          borderRadius={20}
          circular={false}
        />
      </Flex>
      <WhiteSpace />
      <Flex>
        <Avatar title="123" circular size="xs" />
        <Avatar
          source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular
          size="md"
        />
        <Avatar
          source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
          circular
          size="lg"
        />
      </Flex>
      <WhiteSpace />
      <Flex>
        <AvatarGroup max={4}>
          <Avatar
            source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            source="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
            circular
          />
          <Avatar
            source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            source="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
            circular
          />
        </AvatarGroup>
      </Flex>
      <WhiteSpace />
      <Flex>
        <AvatarGroup max={4} backgroundColor="orange">
          <Avatar
            source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            source="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
            circular
          />
          <Avatar
            source="https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
            circular
          />
          <Avatar
            source="https://i0.wp.com/fancycrave.com/wp-content/uploads/2020/03/group-of-diverse-friends-playing-game-on-mobile-P5BYNJM.jpg"
            circular
          />
        </AvatarGroup>
      </Flex>
    </>
  );
};
