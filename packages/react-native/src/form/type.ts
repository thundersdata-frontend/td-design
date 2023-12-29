import { ReactElement } from 'react';

import type { FieldProps } from 'rc-field-form/lib/Field';

import { ListItemProps } from '../list-item';

type RcFieldProps = Omit<FieldProps, 'children'>;
export interface FormItemProps extends RcFieldProps {
  /** 底部边框还是整个边框 */
  type?: 'bottom' | 'all';
  /** 保持组件原始样式 */
  noStyle?: boolean;
  /** 子组件 */
  children: ReactElement;
}

export interface FormListItemProps
  extends RcFieldProps,
    Pick<ListItemProps, 'title' | 'required' | 'style' | 'thumb' | 'onPress' | 'arrow' | 'backgroundColor'> {
  /** 保持组件原始样式 */
  noStyle?: boolean;
  /** 子组件 */
  children: ReactElement;
}
