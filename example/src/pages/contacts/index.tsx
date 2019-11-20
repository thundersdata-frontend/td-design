import React, { useEffect } from 'react';
import { request } from '@td-design/utils';

export default () => {
  useEffect(() => {
    (async function fetchData() {
      await request.get('http://gazelle.backend.dev.thundersdata.com/policy/homePage', {
        tenantCode: 10010,
      });
    })();
  });
  return <div>123</div>;
};
