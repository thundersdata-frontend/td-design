import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';

import Box from '../box';
import ActionButtonItem from './ActionButtonItem';
import { ActionsProps } from './type';

const Actions: FC<ActionsProps> = props => {
  const { verticalOrientation, spacing, items } = props;

  const styles = StyleSheet.create({
    up: {
      paddingBottom: spacing / 2,
    },
    down: {
      paddingTop: spacing / 2,
    },
  });

  return (
    <Box
      alignSelf={'stretch'}
      justifyContent={verticalOrientation === 'up' ? 'flex-end' : 'flex-start'}
      zIndex={'99'}
      style={verticalOrientation === 'up' ? styles.up : styles.down}
      pointerEvents="box-none"
    >
      {items.map((item, index) => {
        return <ActionButtonItem key={index} {...props} {...item} />;
      })}
    </Box>
  );
};
Actions.displayName = 'Actions';

export default memo(Actions);
