import React, { useEffect, useRef } from 'react';
import {
  TextInput,
  View,
  StyleProp,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { useImmer } from 'use-immer';

import Box from '../box';
import Input from '../input';
import Text from '../text';
import Portal from '../portal';
import { ONE_PIXEL } from '../helper';

export type Item = {
  key: number;
  title: string;
};
export interface AutoCompleteProps {
  /** 待选项容器高度 */
  dropdownHeight?: number;
  /** 待选项容器样式 */
  dropdownContainerStyle?: StyleProp<ViewStyle>;
  /** 值 */
  value?: string;
  /** 值改变回调 */
  onChange?: (value?: string) => void;
  /** 待选项数组 */
  options?: Item[];
  /** 选中一个待选项 */
  onSelect: (value: string) => void;
  /** 点击软键盘确认键的回调 */
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
}

const { InputItem } = Input;
function AutoComplete({
  dropdownHeight,
  dropdownContainerStyle,
  value,
  onChange,
  options,
  onSelect,
  onSubmitEditing,
}: AutoCompleteProps) {
  const inputRef = useRef<TextInput>(null);
  const measureFlagRef = useRef(false);
  const keyRef = useRef(-1);
  const [position, setPosition] = useImmer<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  /** 组件加载完成之后计算Input的布局位置 */
  useEffect(() => {
    requestAnimationFrame(() => {
      if (inputRef.current) {
        if (!measureFlagRef.current) {
          inputRef.current.measure((_, __, width, height, pageX, pageY) => {
            setPosition(draft => {
              draft.x = pageX;
              draft.y = pageY;
              draft.width = width;
              draft.height = height;
            });
          });
        } else {
          measureFlagRef.current = true;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 数据发生改变之后，需要更新dropdown视图 */
  useEffect(() => {
    show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  /** 显示dropdown视图 */
  const show = () => {
    const content = renderDropdownList();
    if (keyRef.current === -1) {
      keyRef.current = Portal.add(content);
    } else {
      Portal.update(keyRef.current, content);
    }
  };

  /** 关闭dropdown视图 */
  const hide = () => {
    Portal.remove(keyRef.current);
    keyRef.current = -1;
  };

  /** 渲染dropdown视图 */
  const renderDropdownList = () => {
    const { x, y, width, height } = position;
    return (
      <View
        style={[
          {
            position: 'absolute',
            top: y + height,
            left: x,
            width,
            height: dropdownHeight,
            backgroundColor: 'gold',
          },
          dropdownContainerStyle,
        ]}
      >
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onSelect(item.title);
                hide();
              }}
              activeOpacity={0.8}
            >
              <Box paddingVertical="s" paddingLeft="s" borderBottomWidth={ONE_PIXEL} borderColor="borderColor">
                <Text>{item.title}</Text>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key.toString()}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  };

  return (
    <InputItem
      ref={inputRef}
      value={value}
      onFocus={show}
      onBlur={hide}
      onChange={value => {
        onChange?.(value);
      }}
      onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        hide();
        onSubmitEditing?.(e);
      }}
    />
  );
}

export default AutoComplete;
