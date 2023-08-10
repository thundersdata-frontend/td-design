/**
 * 单个评分组件
 */
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { Theme, useTheme } from '@td-design/react-native';

import { StarProps } from '../type';

export const STAR_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACu2vZrAAAEA0lEQVRYCdWYS4gTWRSGz6mULxhdKDiCdGxtH92dRKYZFy4aVGbhRhEExYW48AHiwoUO6ug4ONAzoy5EUBFFRFAXPhYqPhbuBDeCisb46LQdkzAILmahIG2SquN/K5PGpKtu5XHb1oKQuuec+5+vTj3ug+g7OdgkpzxrX0firicSm9i6yvHsGVP6xkAl2baVhE5WgVnWfsD2VdmabBgBlafROajiKzDYIzhs62fuzj4aYW/QYDUY7x/O9BscIyFVtOPu9+/UmLXlikpqTpSc0gAqOs43NeOBIPsnTmSe+vrrNLZeUdfZEwipIISA6vxeJ09gWEsVlVfzZ1Jh6DWJTAjMoBxMLlmc4FjuuTZO42ytooWhXaGQKrmQRY7s03CEupquqKTaZ5DrZgA6MTSLClBVtcd1cddgf13xNUHNV9R1fq0bUiVVVS2W9tbkr7vZVEUl2b4UL8htZJlUd6ZyoEMRWs2x/I0G++GGBBwiByx6eS5KJXceMc9H9co/4gUoz+yAbvWZmfJ4Fl5AMw3tfrKsfnKdNMUXv2G+4viJDINKcvaPRKXNCFpEwoCjuRDSv81+ii3ZuIi8ryGBC6DHZEXOcncmqyQ9UBnomE4fi0lUanpLeUx3Zv5AERtD8GC6/DJ9LBz95iDVRYtMplLRm4H9/9bzL6aLYUyPqVdkTaTyefrXmLBpIaG36gUrgzIdNK1vTM+y/lFaHigncpdxtsOYuDEhPoSJ9wklN/x5Ug15NmsblhLHvRmPMozt0ccL88Nz2SpQxSXJWZuI3NPekDdWoMwHcJf//DL9CNAybHQ9Pg3ncB75MvirnDPt40T+79pcvqAqSJLRtYC9iFP/JUatkom2xbs5njvsJxUIqoIl1baKXL4M4PF+nQ3bduKZPBKkWfmO+voxy7mOcX+jr9Okka2/dJAqlbaiKkBEmJLRIk5H73kdb3dyZ0YttwMPbUW9Xi+7puJ/9CBVEpcwc9Mf4aCloYRewoDXKcXCVMJBReJhIgb8oTnCQUlGv6JCBkA5XKTlijIZuPX0FUCFpnnLb80Va2+9t68kMkXT36DL1VZVC4qVYTPPJzYYONXwFbj6O6cHZdFeZQ1MEkvflRhhFvDCXJxsewna92tidM0unVMPKgFbiVWKnAHQBkpswtZi7mbFhWXuPbR7sUW+AuPfk4o98F/t+mkOPSjxg+C+/A6A2ykyuRNA5zGFdP1iOZG9RfFcDzDW4Zf2i/FsFmmrrwUFwF3AnKoSZ36PFcwfAOyA/xjHUoUqv0+DmQVzzEsU7+jGrsgWAOerwpiuUWzjhSpbTUNb7koslijLMB73oj1IkR/uAO6/iq+Zf0nPnUCFT8sxhexB/4cUz95SF6PT+gz2IBnaCegUDQAAAABJRU5ErkJggg==';
export const STAR_SELECTED_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACu2vZrAAAEA0lEQVRYCdWYS4gTWRSGz6mULxhdKDiCdGxtH92dRKYZFy4aVGbhRhEExYW48AHiwoUO6ug4ONAzoy5EUBFFRFAXPhYqPhbuBDeCisb46LQdkzAILmahIG2SquN/K5PGpKtu5XHb1oKQuuec+5+vTj3ug+g7OdgkpzxrX0firicSm9i6yvHsGVP6xkAl2baVhE5WgVnWfsD2VdmabBgBlafROajiKzDYIzhs62fuzj4aYW/QYDUY7x/O9BscIyFVtOPu9+/UmLXlikpqTpSc0gAqOs43NeOBIPsnTmSe+vrrNLZeUdfZEwipIISA6vxeJ09gWEsVlVfzZ1Jh6DWJTAjMoBxMLlmc4FjuuTZO42ytooWhXaGQKrmQRY7s03CEupquqKTaZ5DrZgA6MTSLClBVtcd1cddgf13xNUHNV9R1fq0bUiVVVS2W9tbkr7vZVEUl2b4UL8htZJlUd6ZyoEMRWs2x/I0G++GGBBwiByx6eS5KJXceMc9H9co/4gUoz+yAbvWZmfJ4Fl5AMw3tfrKsfnKdNMUXv2G+4viJDINKcvaPRKXNCFpEwoCjuRDSv81+ii3ZuIi8ryGBC6DHZEXOcncmqyQ9UBnomE4fi0lUanpLeUx3Zv5AERtD8GC6/DJ9LBz95iDVRYtMplLRm4H9/9bzL6aLYUyPqVdkTaTyefrXmLBpIaG36gUrgzIdNK1vTM+y/lFaHigncpdxtsOYuDEhPoSJ9wklN/x5Ug15NmsblhLHvRmPMozt0ccL88Nz2SpQxSXJWZuI3NPekDdWoMwHcJf//DL9CNAybHQ9Pg3ncB75MvirnDPt40T+79pcvqAqSJLRtYC9iFP/JUatkom2xbs5njvsJxUIqoIl1baKXL4M4PF+nQ3bduKZPBKkWfmO+voxy7mOcX+jr9Okka2/dJAqlbaiKkBEmJLRIk5H73kdb3dyZ0YttwMPbUW9Xi+7puJ/9CBVEpcwc9Mf4aCloYRewoDXKcXCVMJBReJhIgb8oTnCQUlGv6JCBkA5XKTlijIZuPX0FUCFpnnLb80Va2+9t68kMkXT36DL1VZVC4qVYTPPJzYYONXwFbj6O6cHZdFeZQ1MEkvflRhhFvDCXJxsewna92tidM0unVMPKgFbiVWKnAHQBkpswtZi7mbFhWXuPbR7sUW+AuPfk4o98F/t+mkOPSjxg+C+/A6A2ykyuRNA5zGFdP1iOZG9RfFcDzDW4Zf2i/FsFmmrrwUFwF3AnKoSZ36PFcwfAOyA/xjHUoUqv0+DmQVzzEsU7+jGrsgWAOerwpiuUWzjhSpbTUNb7koslijLMB73oj1IkR/uAO6/iq+Zf0nPnUCFT8sxhexB/4cUz95SF6PT+gz2IBnaCegUDQAAAABJRU5ErkJggg==';

const Star: FC<StarProps> = ({
  fill,
  size,
  selectedColor,
  unselectedColor,
  disabled,
  starStyle,
  outRangeScale,
  position,
  activeOpacity = 0.5,
  onSelectStarInPosition,
}) => {
  const theme = useTheme<Theme>();

  const animation = useSharedValue(0);

  const handlePress = () => {
    'worklet';
    animation.value = withSequence(withTiming(1), withTiming(0));
    onSelectStarInPosition && runOnJS(onSelectStarInPosition)(position);
  };

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        scale: mix(animation.value, 1, outRangeScale),
      },
    ],
  }));

  const source = fill ? STAR_SELECTED_IMAGE : STAR_IMAGE;

  const styles = StyleSheet.create({
    image: {
      margin: theme.spacing.x1,
      // tintColor 在安卓下不能为undefined，否则不会显示
      tintColor: fill && selectedColor ? selectedColor : unselectedColor,
      width: size,
      height: size,
    },
  });

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={handlePress} disabled={disabled}>
      <Animated.Image source={{ uri: source }} style={[styles.image, starStyle, style]} />
    </TouchableOpacity>
  );
};

export default Star;
