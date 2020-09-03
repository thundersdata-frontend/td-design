import {
  SpacingProps,
  VariantProps,
  createRestyleComponent,
  spacing,
  createVariant,
} from '@shopify/restyle';
import { Theme } from '../config/theme';

type CardProps = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'>;

const Card = createRestyleComponent<CardProps, Theme>([
  spacing,
  createVariant({ themeKey: 'cardVariants' }),
]);

export default Card;
