import React, { useState } from 'react';
import { Share } from '@td-design/react-native';
import { Button } from 'react-native';
import Container from '../components/Container';

const ShareDemo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Container>
      <Button title="弹窗" onPress={() => setVisible(true)} />
      <Share
        visible={visible}
        onCancel={() => setVisible(false)}
        onRefresh={() => console.log('123')}
        onShareSms={() => console.log('1')}
        onShareFriends={() => console.log('1')}
        onShareMoments={() => console.log('2')}
        onShareWeibo={() => console.log('3')}
        onShareAlipay={() => console.log('4')}
        onShareDingtalk={() => console.log('5')}
        onShareQQ={() => console.log('6')}
        onShareZhihu={() => console.log('7')}
        onShareQQMail={() => console.log('8')}
      />
    </Container>
  );
};

export default ShareDemo;
