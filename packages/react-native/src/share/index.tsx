import React, { FC, ReactNode } from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Modal from '../modal/Modal';
import Box from '../box';
import Text from '../text';
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

export interface ShareItem {
  appName?: string;
  label: string;
  icon: ReactNode;
  schema: string;
  onPress: () => void;
}

export interface ShareAction {
  label: string;
  icon: ReactNode;
  onPress: () => void;
}
interface ShareProps {
  /** 是否显示操作面板 */
  visible: boolean;
  /** 关闭操作面板 */
  onCancel: () => void;
  /** 关闭文字 */
  cancelText?: string;
  /** 刷新文字 */
  refreshText?: string;
  /** 刷新页面 */
  onRefresh: () => void;
  /** 自定义分享项 */
  extraShares?: ShareItem[];
  /** 自定义操作项 */
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
  refreshText = '刷新',
  onRefresh,
  extraShares = [],
  extraActions = [],
  onShareSms,
  onShareFriends,
  onShareMoments,
  onShareWeibo,
  onShareAlipay,
  onShareDingtalk,
  onShareQQ,
  onShareZhihu,
  onShareQQMail,
}) => {
  const theme = useTheme<Theme>();
  const styles = StyleSheet.create({
    action: {
      height: px(54),
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: ONE_PIXEL,
      borderColor: theme.colors.borderColor,
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.m,
    },
  });

  const baseActions: ShareItem[] = [];

  // 根据传入方法来判断是否需要渲染对应的分享场景
  if (onShareSms) {
    baseActions.push({
      label: '短信',
      icon: <Sms />,
      schema: 'sms://',
      onPress: onShareSms,
    });
  }
  if (onShareFriends) {
    baseActions.push({
      label: '微信好友',
      appName: '微信',
      icon: <Wechat />,
      schema: 'weixin://',
      onPress: onShareFriends,
    });
  }
  if (onShareMoments) {
    baseActions.push({
      label: '朋友圈',
      appName: '微信',
      icon: <Moments />,
      schema: 'weixin://',
      onPress: onShareMoments,
    });
  }
  if (onShareWeibo) {
    baseActions.push({ label: '新浪微博', icon: <Sina />, schema: 'sinaweibo://', onPress: onShareWeibo });
  }
  if (onShareAlipay) {
    baseActions.push({ label: '支付宝', icon: <Alipay />, schema: 'alipays://', onPress: onShareAlipay });
  }
  if (onShareDingtalk) {
    baseActions.push({ label: '钉钉', icon: <Dingding />, schema: 'dingtalk://', onPress: onShareDingtalk });
  }
  if (onShareQQ) {
    baseActions.push({ label: 'QQ', icon: <QQ />, schema: 'mqq://', onPress: onShareQQ });
  }
  if (onShareZhihu) {
    baseActions.push({ label: '知乎', icon: <Zhihu />, schema: 'zhihu://', onPress: onShareZhihu });
  }
  if (onShareQQMail) {
    baseActions.push({ label: 'QQ邮箱', icon: <QQMail />, schema: 'qqmail://', onPress: onShareQQMail });
  }

  const _actions = baseActions.concat(extraShares);
  const secondaryActions = [
    {
      label: refreshText,
      icon: <Refresh />,
      onPress: onRefresh,
    },
    ...extraActions,
  ];

  const renderShareItem = (item: ShareItem) => {
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
        style={styles.item}
      >
        <Box
          width={px(60)}
          height={px(60)}
          borderRadius="corner"
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
        >
          {item.icon}
        </Box>
        <Text variant="primaryHelp" marginTop="xxs">
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderActionItem = (item: ShareAction) => {
    return (
      <TouchableOpacity activeOpacity={0.8} key={item.label} onPress={item.onPress} style={styles.item}>
        <Box
          width={px(60)}
          height={px(60)}
          borderRadius="corner"
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
        >
          {item.icon}
        </Box>
        <Text variant="primaryHelp" marginTop="xxs">
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} onClose={onCancel}>
      <Box backgroundColor="backgroundColor5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: theme.spacing.m }}
          style={{ borderWidth: ONE_PIXEL, borderColor: theme.colors.borderColor }}
        >
          {_actions.map(renderShareItem)}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: theme.spacing.m }}
        >
          {secondaryActions.map(renderActionItem)}
        </ScrollView>
      </Box>
      <TouchableOpacity activeOpacity={0.8} onPress={onCancel} style={styles.action}>
        <Text variant="primaryBody">{cancelText}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default Share;
