import React, { useEffect, useState } from 'react';

import { useSafeState } from '@td-design/rn-hooks';

const Child = () => {
  const [value, setValue] = useSafeState<string>();

  useEffect(() => {
    setTimeout(() => {
      setValue('从服务端获取的数据');
    }, 5000);
  }, []);

  const text = value || '正在获取数据。。。';

  return <div>{text}</div>;
};

export default () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(false)}>卸载</button>
      {visible && <Child />}
    </div>
  );
};
