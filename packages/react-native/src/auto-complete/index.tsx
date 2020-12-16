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
import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Input from '../input';
import Text from '../text';
import Portal from '../portal';
import { ONE_PIXEL, px, deviceHeight } from '../helper';
import { Theme } from '../config/theme';

export type Item = {
  key: number;
  title: string;
};
export interface AutoCompleteProps {
  /** 待选项容器样式 */
  dropdownContainerStyle?: StyleProp<ViewStyle>;
  /** 值 */
  value?: string;
  /** 值改变回调 */
  onChange?: (value?: string) => void;
  /** 待选项数组 */
  options: Item[];
  /** 选中一个待选项 */
  onSelect: (value: string) => void;
  /** 点击软键盘确认键的回调 */
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
}

const { InputItem } = Input;
const ITEM_HEIGHT = px(30);
const MAX_HEIGHT = px(210);
function AutoComplete({
  dropdownContainerStyle,
  value = '',
  onChange,
  options = [],
  onSelect,
  onSubmitEditing,
}: AutoCompleteProps) {
  const theme = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);
  const measureRef = useRef<{ width: number; height: number; pageX: number; pageY?: number } | null>(null);
  const keyRef = useRef(-1);
  const dataRef = useRef<Item[]>([]);

  useEffect(() => {
    dataRef.current = options;
  }, [options]);

  /** 显示dropdown视图 */
  const show = (text: string) => {
    const data = text === '' ? dataRef.current : dataRef.current.filter(item => item.title.includes(text));
    const dropdownHeight = data.length * ITEM_HEIGHT > MAX_HEIGHT ? MAX_HEIGHT : data.length * ITEM_HEIGHT;

    if (inputRef.current) {
      inputRef.current.measure((_, __, width, height, pageX, pageY) => {
        console.log(dropdownHeight, pageY, deviceHeight);
        if (!measureRef.current) {
          measureRef.current = {
            width,
            height,
            pageX,
            pageY: pageY + dropdownHeight > deviceHeight ? pageY - height - dropdownHeight : pageY,
          };
        } else {
          Object.assign(measureRef.current, {
            pageY: pageY + dropdownHeight > deviceHeight ? pageY - height - dropdownHeight : pageY,
          });
        }

        const content = renderDropdownList(data);
        if (keyRef.current === -1) {
          keyRef.current = Portal.add(content);
        } else {
          Portal.update(keyRef.current, content);
        }
      });
    }
  };

  /** 关闭dropdown视图 */
  const hide = () => {
    Portal.remove(keyRef.current);
    keyRef.current = -1;
  };

  /** 渲染dropdown视图 */
  const renderDropdownList = (data: Item[]) => {
    const { width, height, pageX, pageY = 0 } = measureRef.current!;
    return (
      <View
        style={[
          dropdownContainerStyle,
          {
            position: 'absolute',
            top: pageY + height,
            left: pageX,
            width,
            backgroundColor: theme.colors.backgroundColor1,
            height: data.length * ITEM_HEIGHT,
            maxHeight: MAX_HEIGHT,
          },
        ]}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onSelect(item.title);
                hide();
              }}
            >
              <Box
                height={ITEM_HEIGHT}
                paddingLeft="s"
                justifyContent="center"
                borderBottomWidth={ONE_PIXEL}
                borderColor="borderColor"
              >
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
      onFocus={() => show(value)}
      onBlur={hide}
      onChange={value => {
        onChange?.(value);
        show(value);
      }}
      onClear={() => {
        onChange?.('');
        inputRef.current?.blur();
      }}
      onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        hide();
        onSubmitEditing?.(e);
      }}
    />
  );
}

export default AutoComplete;
