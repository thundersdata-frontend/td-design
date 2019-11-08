import React from 'react';
import styles from './index.css';
import { request } from '@td-design/utils';

export default function() {
  const fetchData = async () => {
    try {
      await request.get('/api/test');
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
        </li>
      </ul>
      <button onClick={fetchData}>fetch data</button>
    </div>
  );
}
