import React from 'react';
import styles from './index.css';
import { Card } from '@td-design/web';

export default function() {
  const cardRef = React.createRef<HTMLDivElement>();

  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <Card title="test" ref={cardRef}>
        test
      </Card>
    </div>
  );
}
