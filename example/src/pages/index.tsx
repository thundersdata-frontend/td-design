import React from 'react';
import styles from './index.css';
import { FilterForm } from '@td-design/web';
import { FormItemProps } from '@td-design/web/lib/filter-form';
import { request } from '@td-design/utils';

export default function() {
  const formItems: FormItemProps[] = [
    { name: 'name', formLabel: '姓名', type: 'input' },
    { name: 'age', formLabel: '年龄', type: 'number' },
  ];

  const handleReset = () => {
    request.get('/resource');
  }

  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <FilterForm
        formItems={formItems}
        onReset={handleReset}
      />
    </div>
  );
}
