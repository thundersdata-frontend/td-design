import React, { useState } from 'react';
import { FlipNumber } from '@td-design/lego';
import { Button } from 'antd';

export default () => {
  const [value, setValue] = useState(200);

  const handleChange = () => {
    setValue(Math.ceil(Math.random() * 1000));
  };

  return (
    <div>
      <FlipNumber value={value} />
      <Button onClick={handleChange}>改变数值</Button>
    </div>
  );
};
