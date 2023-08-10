import React, { FC, ReactNode } from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Box, helpers, Modal, Text, Theme, useTheme } from '@td-design/react-native';

import Alipay from './svg/alipay';
import Dingding from './svg/dingding';
import Moments from './svg/moments';
import QQ from './svg/qq';
import QQMail from './svg/qqmail';
import Refresh from './svg/refresh';
import Sina from './svg/sina';
import Sms from './svg/sms';
import Wechat from './svg/wechat';
import Zhihu from './svg/zhihu';

const { px, ONE_PIXEL } = helpers;
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
  /** 按下时的不透明度 */
  activeOpacity?: number;
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
  activeOpacity = 0.5,
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
      borderTopWidth: ONE_PIXEL,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.x3,
    },
    content1: {
      padding: theme.spacing.x3,
      borderBottomWidth: ONE_PIXEL,
      borderColor: theme.colors.border,
    },
    content2: { padding: theme.spacing.x3 },
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
      icon: <Refresh color={theme.colors.gray400} />,
      onPress: onRefresh,
    },
    ...extraActions,
  ];

  const renderShareItem = (item: ShareItem) => {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
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
          borderRadius="x2"
          backgroundColor="background"
          justifyContent="center"
          alignItems="center"
          marginBottom="x1"
        >
          {item.icon}
        </Box>
        <Text variant="p2" color="gray300">
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderActionItem = (item: ShareAction) => {
    return (
      <TouchableOpacity activeOpacity={activeOpacity} key={item.label} onPress={item.onPress} style={styles.item}>
        <Box
          width={px(60)}
          height={px(60)}
          borderRadius="x2"
          backgroundColor="background"
          justifyContent="center"
          alignItems="center"
          marginBottom="x1"
        >
          {item.icon}
        </Box>
        <Text variant="p2" color="gray300">
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} onClose={onCancel}>
      <Box backgroundColor="background">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content1}>
          {_actions.map(renderShareItem)}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content2}>
          {secondaryActions.map(renderActionItem)}
        </ScrollView>
      </Box>
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onCancel} style={styles.action}>
        <Text variant="p0" color="gray500">
          {cancelText}
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default Share;
