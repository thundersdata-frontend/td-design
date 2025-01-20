import React, { FC, ReactNode, useState } from 'react';
import { Linking, ScrollView, StyleSheet } from 'react-native';

import { Box, helpers, Modal, Portal, Pressable, Text, Theme, useTheme } from '@td-design/react-native';

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
  /** 按下时的不透明度 */
  activeOpacity?: number;
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

const ShareContent: FC<ShareProps & { onAnimationEnd: (visible: boolean) => void }> = ({
  activeOpacity = 0.6,
  cancelText = '取消',
  refreshText = '刷新',
  onAnimationEnd,
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
  const [visible, setVisible] = useState(true);

  const theme = useTheme<Theme>();
  const styles = StyleSheet.create({
    action: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.x2,
      borderTopWidth: ONE_PIXEL,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.white,
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.x2,
    },
    content1: {
      padding: theme.spacing.x2,
      borderBottomWidth: ONE_PIXEL,
      borderColor: theme.colors.border,
    },
    content2: { padding: theme.spacing.x2 },
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
      label: '微信',
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
    baseActions.push({ label: '微博', icon: <Sina />, schema: 'sinaweibo://', onPress: onShareWeibo });
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
      <Pressable
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
        <Box width={px(40)} height={px(40)} justifyContent="center" alignItems="center" marginBottom="x1">
          {item.icon}
        </Box>
        <Text variant="p2" color="text">
          {item.label}
        </Text>
      </Pressable>
    );
  };

  const renderActionItem = (item: ShareAction) => {
    return (
      <Pressable activeOpacity={activeOpacity} key={item.label} onPress={item.onPress} style={styles.item}>
        <Box width={px(40)} height={px(40)} justifyContent="center" alignItems="center" marginBottom="x1">
          {item.icon}
        </Box>
        <Text variant="p2" color="text">
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <Modal.Content
      position="bottom"
      maskVisible
      maskClosable
      animationType="slide"
      onAnimationEnd={onAnimationEnd}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content1}>
        {_actions.map(renderShareItem)}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content2}>
        {secondaryActions.map(renderActionItem)}
      </ScrollView>
      <Pressable
        activeOpacity={activeOpacity}
        onPress={() => {
          setVisible(false);
        }}
        style={styles.action}
      >
        <Text variant="p0" color="text">
          {cancelText}
        </Text>
      </Pressable>
    </Modal.Content>
  );
};

const Share = () => null;

Share.displayName = 'Share';

Share.show = (props: ShareProps) => {
  const key = Portal.add(
    <ShareContent
      {...props}
      onAnimationEnd={visible => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
};

export default Share;
