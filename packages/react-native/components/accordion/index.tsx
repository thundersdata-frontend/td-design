import React, { ReactNode, FC, useCallback } from 'react';
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useImmer } from 'use-immer';
import { Theme } from '../config/theme';
import Panel, { Section } from './Panel';

interface AccordionProps {
  activeSections?: number[];
  onChange?: (activeSections: number[]) => void;
  sections: Section[];
  multiple?: boolean;
  expandedHeight?: number;
  duration?: number;
  easing?: string;
  activeOpacity?: number;
  renderTitle?: (item: Section) => ReactNode;
  renderContent?: (item: Section) => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  sectionContainerStyle?: StyleProp<ViewStyle>;
}

const Accordion: FC<AccordionProps> = (props) => {
  const [currentSections, setCurrentSections] = useImmer(props.activeSections ?? []);
  const theme = useTheme<Theme>();
  const {
    sections = [],
    multiple = false,
    expandedHeight = 120,
    duration = 300,
    easing = 'inOut',
    activeOpacity = 0.8,
    onChange,
    renderTitle,
    renderContent,
    containerStyle,
    sectionContainerStyle,
  } = props;

  const handleChange = useCallback((currentIndex: number) => {
    setCurrentSections((draft) => {
      if (!multiple) {
        setCurrentSections((draft) => {
          draft[0] = currentIndex;
        });
      } else {
        const index = draft.findIndex((item) => item === currentIndex);
        if (index > -1) {
          draft.splice(index, 1);
        } else {
          draft.push(currentIndex);
        }
      }
      if (onChange) {
        onChange(draft);
      }
    });
  }, []);

  return (
    <View
      style={[
        {
          borderWidth: StyleSheet.hairlineWidth,
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
export { Section };
export default Accordion;
