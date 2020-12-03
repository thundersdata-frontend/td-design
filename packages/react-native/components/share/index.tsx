import React, { FC, ReactNode } from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Modal from '../modal';
import Box from '../box';
import Text from '../text';
import Flex from '../flex';
import { Theme } from '../config/theme';
import { ONE_PIXEL, px } from '../helper';

import Refresh from './svg/refresh';
import Sms from './svg/sms';
import Alipay from './svg/alipay';
import Dingding from './svg/dingding';
import Moments from './svg/moments';
import QQ from './svg/qq';
import QQMail from './svg/qqmail';
import Sina from './svg/sina';
import Wechat from './svg/wechat';
import Zhihu from './svg/zhihu';

interface ShareAction {
  appName?: string;
  label: string;
  icon: ReactNode;
  schema?: string;
  onPress?: () => void;
}
interface ShareProps {
  /** 是否显示操作面板 */
  visible: boolean;
  /** 关闭操作面板 */
  onCancel: () => void;
  /** 关闭文字 */
  cancelText?: string;
  /** 刷新页面 */
  onRefresh: () => void;
  extraActions?: ShareAction[];
  onShareSms?: () => void;
  onShareFriends?: () => void;
  onShareMoments?: () => void;
  onShareWeibo?: () => void;
  onShareAlipay?: () => void;
  onShareDingtalk?: () => void;
  onShareQQ?: () => void;
  onShareZhihu?: () => void;
  onShareQQMail?: () => void;
}

const Share: FC<ShareProps> = ({
  visible,
  onCancel,
  cancelText = '取消',
  onRefresh,
  extraActions = [],
  onShareSms = () => {},
  onShareFriends = () => {},
  onShareMoments = () => {},
  onShareWeibo = () => {},
  onShareAlipay = () => {},
  onShareDingtalk = () => {},
  onShareQQ = () => {},
  onShareZhihu = () => {},
  onShareQQMail = () => {},
}) => {
  const theme = useTheme<Theme>();
  const styles = StyleSheet.create({
    action: {
      height: px(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: ONE_PIXEL,
      borderBottomWidth: ONE_PIXEL,
      borderColor: theme.colors.borderColor,
    },
  });

  const baseActions: ShareAction[] = [
    {
      label: '短信',
      icon: <Sms />,
      schema: 'sms://',
      onPress: onShareSms,
    },
    { label: '微信好友', appName: '微信', icon: <Wechat />, schema: 'weixin://', onPress: onShareFriends },
    { label: '朋友圈', appName: '微信', icon: <Moments />, schema: 'weixin://', onPress: onShareMoments },
    { label: '新浪微博', icon: <Sina />, schema: 'sinaweibo://', onPress: onShareWeibo },
    { label: '支付宝', icon: <Alipay />, schema: 'alipays://', onPress: onShareAlipay },
    { label: '钉钉', icon: <Dingding />, schema: 'dingtalk://', onPress: onShareDingtalk },
    { label: 'QQ', icon: <QQ />, schema: 'mqq://', onPress: onShareQQ },
    { label: '知乎', icon: <Zhihu />, schema: 'zhihu://', onPress: onShareZhihu },
    { label: 'QQ邮箱', icon: <QQMail />, schema: 'qqmail://', onPress: onShareQQMail },
  ];
  const _actions = baseActions.concat(extraActions);
  const secondaryActions: ShareAction[] = [
    {
      label: '刷新',
      icon: <Refresh />,
      onPress: onRefresh,
    },
  ];

  const renderItem = (item: ShareAction) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={item.label}
        onPress={() => {
          if (item.schema) {
            Linking.canOpenURL(item.schema)
              .then(() => {
                if (item.onPress) {
                  item.onPress();
                }
              })
              .catch(() => {
                console.log(`您尚未安装${item.appName ?? item.label}`);
              });
          } else if (item.onPress) {
            item.onPress();
          }
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: theme.spacing.m,
        }}
      >
        {item.icon}
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} onClose={onCancel}>
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {_actions.map(renderItem)}
        </ScrollView>
        <Flex marginVertical="m">{secondaryActions.map(renderItem)}</Flex>
      </Box>
      <TouchableOpacity activeOpacity={0.8} onPress={onCancel} style={styles.action}>
        <Text variant="primaryBody">{cancelText}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default Share;
