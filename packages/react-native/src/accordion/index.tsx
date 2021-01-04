import React, { ReactNode, FC, useCallback } from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useImmer } from 'use-immer';
import { Theme } from '../config/theme';
import Panel, { Section } from './Panel';
import { ONE_PIXEL, px } from '../helper';

interface AccordionProps {
  /** 当前展开的选项卡 */
  activeSections?: number[];
  /** 修改事件 */
  onChange?: (activeSections: number[]) => void;
  /** 手风琴选项卡列表 */
  sections: Section[];
  /** 是否允许展开多个 */
  multiple?: boolean;
  /** 展开选项卡高度 */
  expandedHeight?: number;
  /** 动画时长 */
  duration?: number;
  /** 动画效果 */
  easing?: string;
  /** 点击透明度 */
  activeOpacity?: number;
  /** 自定义渲染标题 */
  renderTitle?: (item: Section) => ReactNode;
  /** 自定义渲染内容 */
  renderContent?: (item: Section) => ReactNode;
  /** 容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 选项卡样式 */
  sectionContainerStyle?: StyleProp<ViewStyle>;
}

const Accordion: FC<AccordionProps> = props => {
  const [currentSections, setCurrentSections] = useImmer(props.activeSections ?? []);

  const theme = useTheme<Theme>();
  const {
    sections = [],
    multiple = false,
    expandedHeight = px(120),
    duration = 300,
    easing = 'inOut',
    activeOpacity = 0.8,
    onChange,
    renderTitle,
    renderContent,
    containerStyle,
    sectionContainerStyle,
  } = props;

  const handleChange = useCallback(
    (currentIndex: number) => {
      setCurrentSections(draft => {
        if (!multiple) {
          if (draft[0] === currentIndex) {
            draft = [];
          } else {
            draft[0] = currentIndex;
          }
        } else {
          const index = draft.findIndex(item => item === currentIndex);
          if (index > -1) {
            draft.splice(index, 1);
          } else {
            draft.push(currentIndex);
          }
        }
        onChange?.(draft);
      });
    },
    [multiple, onChange, setCurrentSections]
  );

  return (
    <View
      style={[
        {
          borderWidth: ONE_PIXEL,
          borderBottomWidth: 0,
          borderColor: theme.colors.borderColor,
        },
        containerStyle,
      ]}
    >
      {sections.map((item, index) => {
        const expanded = currentSections.includes(index);
        return (
          <Panel
            key={index}
            {...{
              item,
              expanded,
              renderTitle,
              renderContent,
              expandedHeight,
              duration,
              easing,
              activeOpacity,
              sectionContainerStyle,
            }}
            onChange={() => handleChange(index)}
          />
        );
      })}
    </View>
  );
};
export type { Section };
export default Accordion;
