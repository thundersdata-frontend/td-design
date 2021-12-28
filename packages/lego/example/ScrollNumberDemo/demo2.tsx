import React, { useState } from 'react';
import { ScrollNumber } from '@td-design/lego';
import { Button } from 'antd';

export default () => {
  const [value, setValue] = useState(200);

  const handleChange = () => {
    setValue(Math.ceil(Math.random() * 1000));
  };

  return (
    <div>
      <ScrollNumber value={value} />
      <Button onClick={handleChange}>改变数值</Button>
    </div>
  );
};
