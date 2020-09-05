import { View } from 'react-native';
import {
  SpacingProps,
  VariantProps,
  createRestyleComponent,
  spacing,
  createVariant,
} from '@shopify/restyle';
import { Theme } from '../config/theme';

type CardProps = SpacingProps<Theme> &
  VariantProps<Theme, 'cardVariants'> & {
    children: React.ReactNode;
  };

const Card = createRestyleComponent<CardProps, Theme>(
  [spacing, createVariant({ themeKey: 'cardVariants' })],
  View,
);

export default Card;
