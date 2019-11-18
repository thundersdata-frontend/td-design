import React, { useEffect, useState } from 'react';

const initialParams: API.gazelle.policy.listPolicy.Params = {
  page: 1,
  pageSize: 10,
  tenantCode: '',
  policyType: '',
};

export default () => {
  const [conditions, setConditions] = useState(initialParams);

  useEffect(() => {
    (async function fetchData() {
      try {
        const result = await API.gazelle.policy.listPolicy.fetch(conditions);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    })();
  });

  return <div>123</div>;
};
