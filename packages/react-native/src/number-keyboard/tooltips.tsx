import Clipboard from '@react-native-clipboard/clipboard';
import { useMemoizedFn } from '@td-design/rn-hooks';
import React, { forwardRef, PropsWithChildren, useImperativeHandle, useRef } from 'react';
import { TouchableOpacity } from 'react-native';

import Flex from '../flex';
import { px } from '../helpers/normalize';
import Text from '../text';
import Toast from '../toast';
import Tooltip, { TooltipRef } from '../tooltip';

const Tips = ({ fetchCopiedText, copyToClipboard }: { copyToClipboard: () => void; fetchCopiedText: () => void }) => {
  return (
    <Flex
      width="100%"
      flex={1}
      style={{ borderRadius: px(10), overflow: 'hidden' }}
      height="100%"
      justifyContent="space-around"
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}
        onPress={copyToClipboard}
      >
        <Text color="white">复制</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}
        onPress={fetchCopiedText}
      >
        <Text color="white">粘贴</Text>
      </TouchableOpacity>
    </Flex>
  );
};

export interface TooltipsRef {
  show: () => void;
}

const Tooltips = forwardRef<
  TooltipsRef,
  PropsWithChildren<{ value: string; type?: string; onChange: (str: string) => void }>
>(({ children, value, type = 'number', onChange }, ref) => {
  const tooltipRef = useRef<TooltipRef>(null);

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        tooltipRef?.current?.show();
      },
    };
  });

  const copyToClipboard = useMemoizedFn(function () {
    Clipboard.setString(value);
    Toast.bottom({ content: '复制成功!' });
    tooltipRef?.current?.close();
  });

  const fetchCopiedText = useMemoizedFn(async function () {
    const text = await Clipboard.getString();
    const regex = {
      IdCard: /^[0-9Xx]+$/,
      integer: /^[0-9]+$/,
      number: /^[0-9\.]+$/,
    };
    if (text && text.match(regex[type])) {
      onChange(text);
    } else {
      Toast.middle({ content: '请输入正确的格式!' });
    }
    tooltipRef?.current?.close();
  });

  return (
    <Tooltip
      width={px(100)}
      style={{ padding: 0 }}
      title={<Tips copyToClipboard={copyToClipboard} fetchCopiedText={fetchCopiedText} />}
      ref={tooltipRef}
      disabled={true}
    >
      {children}
    </Tooltip>
  );
});

export default Tooltips;
