/**
 * 单个评分组件
 */
import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useValue,
  sub,
  useCode,
  cond,
  eq,
  set,
  SpringUtils,
  not,
  clockRunning,
} from 'react-native-reanimated';
import { spring, useClock } from 'react-native-redash';
import { Theme } from '../../config/theme';
import { StarProps } from '../type';

const STAR_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADaUlEQVRoQ92aTXbTQAzHJbuLsiKcgPQEtBvecyAhwWFNOQG5AeEEtDdIbxBOQLumIU1C4/e6aXqChhMAK7qILd64+XAdf0jpTBrwrrU80t/jn0ajCYLh63QwvFQu6uXSnklXaHLw0/5wHxG/KB9E9K5eKR2b8mdayDEivp0KOalXSvv/nJCu5xWDCVxHA7e2YKfmOGMTYozNSGfgHQDAp1jQh27ZUf/XfpkT0veuAaF4J2KCsVtxdrSrAAAjQqKQx4M2Bb0pIXPIE4QYgV67kCTI42JMQK9dSArkcS3aodcvJAnype9LP/RahWRBbhp63UJSITcNvTYhHMhNQq9NCBNyY9DrE8KB3CD0mUK+9YevFr6tAiHtzv8mKNK8BKECAi7uCWoQAhoB4C/1CBKMAWFeVCLhCCAI76nrdaXUSxsaVaYBxA/TgYpL9ZEgqLWaEoxpJproSAlhZ5q1BipwRkQn2O1eFoKtmzMAeCZ4dpNMr6zJdjVkRInx7ZsWIrzfpAjzYiGCz/WK0wixiBqvmELz/Jm5j/TRfVlqzQZfylqdvtcgADU7j81EcL9RieA3AjTditOOjpSYfrvnF7u+759tmhglwrbtau3F81H8daSuIxuYBEKoa7W9+bqSOyMzg01JAgpq299upolYgj3t633gJMDahLFrrXUngTSoU0sUSQ5ZVxLIglqLkNniabgSyIRamxA1UGfgqZImUhlL5jXXtueWnWquVcyAzUisAiCpI4m9W3bEcYkf+DrwqhZAVxKY1DYAqL0pO2rW2ZdYyJpSMSvlshfEpNdhmI+ZSzEnohmZli0/2fN9D0MpJyIhkgbcPTSEj0o5EQnpDIYtgNv9vfmLjtxyqcn1IxKiTmhX6JYcToOJn15lxqi6K5KTYLaQFfjoWVvQmJ0ZTjuRajPEXkityfaTrIp3pazF5SOv2JMUn5LTLfaMcPjg7BvUW+Tvc/icsIVk80E/AsCGdDW+rRKoDYBPk4CRcMISksOHeBWOB51VLXA5YQlJ4aNnWXYzqRHATZlRO7XXCQJftXfuJAMuJywhUT5CmC06iPaUVgk87ZnO92GTAjxYdHB4nLCEnPa9tupCqh6r7T9qcFPiqgJvk8GftvodS7SbmDUeS0iYac4vdnV9RlyBEp9sIVznD2X33wj5C8rCrydTFJD3AAAAAElFTkSuQmCC';
const STAR_SELECTED_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADbUlEQVRoQ92ZYVbaQBDHZwKvtg/J0hMUT1D9WMVXegL1BOUGpSco3gBvgCeonqD6RPtRewLtCcoGfa19kOlbMBhDEmZiFrF5j0/szsw/m9/s7CyC5afXVefGRaWm12y6QpvGvbPyNvnOV+MDHX/HXe8f2PJnVYjuugcAuDUOng5Vzdt+dkJ+f39Z/TtcugwH/qJwu/Lq3Z8rG2KsrYg+cVuA+OVB0ES7atNrPSshva66RIBqOGgCuKrU9MqzERKGPBq0LeitfFoPIY9KsQN97kLiII9KsQF97kJiIZ9alPyhz11IHORTOixAn6uQNMhtQ5+rkHTI7UKfmxAO5Dahz00IC3KL0OcmhAO5TehThfTPlt8HzomwQoCrk2AIqgQYlCAVBLj/T1CDEMAFAPRGpT7QFSBMikoEukCk0X/mKa9fHyeZRpNpfN/5dDegGq2PBDHNdaip22D8A8fx91CWaeYaq8AZHSKdQ0XfqCMEeCuYuTBDCeCHKun6iBEjxrtx2wD4cWEiZAVC+6rmNcZ8hZ5MKZTl0MYg+qxqXjuwPJW1vNNywyenjQDKhvvH2iQA7aDfdDf6nbCt2PR7fVpaHVDRcLNQYoyIIg7qyxs3JmU/eBL3kUVLAhOo18Z7DlvIYiUB2ndLXhMTREzBnvT9PmkSYHZe2LXWvJNAEtRJL5stxBiYVxJIgzoXIQE3NiuBWVDnJsQY6p2oI0SYVMaP3RvC84nguLKp61Kbok8rMK67iqSOJONVTYvjEk/onyzXfSx8kwQmHevQ8EN58/pIMk8sZC6pmJlyZ5YoaW/CJh+B3yyciFZkXO6rX5IlzzpWyolIiKQBl1VAME/KiUiIPnXbQBic7x8ba/p8pD214TW5TkRCzA2tuFtCtDsKJnp7NSNC012R3ASzhUj5MMAuFW8bwZ2h6UTeDpY6ko3ULenXaRVvpqzF5WNWsScpPiW3W+wV4fEx+9wgOucIOGELSeODAH4WaNiQ7samShhioYMAb+KQkXDCEpLKR4ZdOBp0WrXA5YQlJI4PA3PRGTTjGgHclBkeNzrr+MV2NBlwOWEJCfNhYEagVrinlCXwpDm66zYJsDXp4DA54Qnpup1xF5IO3ZLX4KbErALvOp/G5xbAfTcxzR5LiDFglj6vz4grUOKTLYTr/KnG/TdC/gGiA7moRP221AAAAABJRU5ErkJggg==';

const Star: FC<StarProps> = ({
  fill,
  size,
  selectedColor,
  unselectedColor,
  disabled,
  starStyle,
  outRangeScale,
  position,
  onSelectStarInPosition,
}) => {
  const theme = useTheme<Theme>();
  const selected = useValue<number>(0);
  const scale = useValue<number>(1);
  const clock = useClock();

  useCode(
    () => [
      cond(eq(selected, 1), [
        set(scale, outRangeScale),
        set(scale, spring({ from: outRangeScale, to: 1, clock, config: SpringUtils.makeDefaultConfig() })),
      ]),
      cond(not(clockRunning(clock)), [set(selected, 0)]),
    ],
    []
  );

  const handlePress = () => {
    selected.setValue(sub(1, selected));
    onSelectStarInPosition?.(position);
  };

  const source = fill ? STAR_SELECTED_IMAGE : STAR_IMAGE;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress} disabled={disabled}>
      <Animated.Image
        source={{ uri: source }}
        style={[
          {
            margin: theme.spacing.xs,
            // tintColor 在安卓下不能为undefined，否则不会显示
            tintColor: fill && selectedColor ? selectedColor : unselectedColor,
            width: size,
            height: size,
            transform: [{ scale }],
          },
          starStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

export default Star;
