import React from 'react';
import { TouchableWithoutFeedback, Text, View, ViewStyle } from 'react-native';
import Color from 'color';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { px } from '../helper';
import Flex from '../flex';
import { PeriodProps } from './type';

const WIDTH = px(34);
const HEIGHT = px(54);

const Period: React.FC<PeriodProps> = ({ state, date, marking, onPress, children }) => {
  const { selected, disabled, startingDay, endingDay, extra } = marking;

  const theme = useTheme<Theme>();
  const { fontFamily, fontSize } = theme.textVariants.primaryNumber;

  const primaryColor = theme.colors.primaryColor;
  const color = new Color(primaryColor);
  const lightColor = color.lighten(0.8).hex();

  const isDisabled = state === 'disabled' || disabled;
  const isToday = state === 'today';

  const onDayPress = () => {
    if (!isDisabled) {
      onPress(date);
    }
  };

  const containerStyle: ViewStyle[] = [{ width: WIDTH, height: WIDTH }];
  let leftFillerStyle = {};
  let rightFillerStyle = {};
  let fillerStyle = {};
  let fillers;

  if (selected) {
    containerStyle.push({
      borderRadius: theme.borderRadii.base,
    });

    if (startingDay && !endingDay) {
      leftFillerStyle = {
        backgroundColor: theme.colors.white,
      };
      rightFillerStyle = {
        backgroundColor: lightColor,
      };
      containerStyle.push({
        backgroundColor: primaryColor,
      });
    } else if (endingDay && !startingDay) {
      rightFillerStyle = {
        backgroundColor: theme.colors.white,
      };
      leftFillerStyle = {
        backgroundColor: lightColor,
      };
      containerStyle.push({
        backgroundColor: primaryColor,
      });
    } else {
      leftFillerStyle = {
        backgroundColor: lightColor,
      };
      rightFillerStyle = {
        backgroundColor: lightColor,
      };
      fillerStyle = {
        backgroundColor: lightColor,
      };
    }

    fillers = (
      <Flex
        style={[
          {
            position: 'absolute',
            height: WIDTH,
            left: 0,
            right: 0,
          },
          fillerStyle,
        ]}
      >
        <View
          style={[
            {
              height: WIDTH,
              flex: 1,
            },
            leftFillerStyle,
          ]}
        />
        <View
          style={[
            {
              height: WIDTH,
              flex: 1,
            },
            rightFillerStyle,
          ]}
        />
      </Flex>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onDayPress}>
      <View style={{ flex: 1, height: HEIGHT }}>
        <Flex justifyContent="center" style={{ width: '100%', height: WIDTH }}>
          {fillers}
          <Flex justifyContent="center" style={containerStyle}>
            <Text
              style={[
                { fontFamily, fontSize, color: theme.colors.black },
                selected && { color: theme.colors.white },
                isDisabled && { color: theme.colors.closedTagColor },
                isToday && { color: primaryColor },
              ]}
            >
              {String(children)}
            </Text>
          </Flex>
        </Flex>
        <Flex style={{ position: 'absolute', top: WIDTH + 2, left: 0, right: 0 }} justifyContent="center">
          {extra}
        </Flex>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(Period);
