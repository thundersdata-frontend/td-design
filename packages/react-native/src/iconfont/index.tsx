/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconArrowdown from './IconArrowdown';
import IconBells from './IconBells';
import IconCheck from './IconCheck';
import IconCheckcircle from './IconCheckcircle';
import IconCheckcircleo from './IconCheckcircleo';
import IconClockcircleo from './IconClockcircleo';
import IconClose from './IconClose';
import IconClosecircleo from './IconClosecircleo';
import IconDate from './IconDate';
import IconDown from './IconDown';
import IconEllipsis from './IconEllipsis';
import IconEyeclose from './IconEyeclose';
import IconEyeopen from './IconEyeopen';
import IconLeft from './IconLeft';
import IconMinus from './IconMinus';
import IconPlus from './IconPlus';
import IconRadioChecked from './IconRadioChecked';
import IconRadioUnchecked from './IconRadioUnchecked';
import IconReload from './IconReload';
import IconRight from './IconRight';
import IconSearch from './IconSearch';
import IconUp from './IconUp';

export type IconNames = 'arrowdown' | 'bells' | 'check' | 'checkcircle' | 'checkcircleo' | 'clockcircleo' | 'close' | 'closecircleo' | 'date' | 'down' | 'ellipsis' | 'eyeclose' | 'eyeopen' | 'left' | 'minus' | 'plus' | 'radio-checked' | 'radio-unchecked' | 'reload' | 'right' | 'search' | 'up';

export interface IconfontProps extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FC<IconfontProps> = ({ name, ...rest }) => {
  switch (name) {
    case 'arrowdown':
      return <IconArrowdown key="L1" {...rest} />;
    case 'bells':
      return <IconBells key="L2" {...rest} />;
    case 'check':
      return <IconCheck key="L3" {...rest} />;
    case 'checkcircle':
      return <IconCheckcircle key="L4" {...rest} />;
    case 'checkcircleo':
      return <IconCheckcircleo key="L5" {...rest} />;
    case 'clockcircleo':
      return <IconClockcircleo key="L6" {...rest} />;
    case 'close':
      return <IconClose key="L7" {...rest} />;
    case 'closecircleo':
      return <IconClosecircleo key="L8" {...rest} />;
    case 'date':
      return <IconDate key="L9" {...rest} />;
    case 'down':
      return <IconDown key="L10" {...rest} />;
    case 'ellipsis':
      return <IconEllipsis key="L11" {...rest} />;
    case 'eyeclose':
      return <IconEyeclose key="L12" {...rest} />;
    case 'eyeopen':
      return <IconEyeopen key="L13" {...rest} />;
    case 'left':
      return <IconLeft key="L14" {...rest} />;
    case 'minus':
      return <IconMinus key="L15" {...rest} />;
    case 'plus':
      return <IconPlus key="L16" {...rest} />;
    case 'radio-checked':
      return <IconRadioChecked key="L17" {...rest} />;
    case 'radio-unchecked':
      return <IconRadioUnchecked key="L18" {...rest} />;
    case 'reload':
      return <IconReload key="L19" {...rest} />;
    case 'right':
      return <IconRight key="L20" {...rest} />;
    case 'search':
      return <IconSearch key="L21" {...rest} />;
    case 'up':
      return <IconUp key="L22" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
