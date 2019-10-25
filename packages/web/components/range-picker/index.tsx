import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { Moment } from 'moment';

const RangePicker = () => {
  const [startValue, onStartChange] = useState<Moment | undefined>(undefined);
  const [endValue, onEndChange] = useState<Moment | undefined>(undefined);
  const [endOpen, toggleOpen] = useState(false);

  const disabledStartDate = (start: Moment | undefined) => {
    if (!start || !endValue) {
      return false;
    }
    return start.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = (end: Moment | undefined) => {
    if (!end || !startValue) {
      return false;
    }
    return end.valueOf() <= startValue.valueOf();
  };

  const handleChange = (type: string) => (date: Moment | null) => {
    if (type === 'start') {
      onStartChange(date ? date : undefined);
    } else if (type === 'end') {
      onEndChange(date ? date : undefined);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <DatePicker
        disabledDate={disabledStartDate}
        format="YYYY-MM-DD"
        value={startValue}
        onChange={handleChange('start')}
        onOpenChange={(open: boolean) => !open && !endValue && toggleOpen(true)}
      />
      <span style={{ marginLeft: 8 }} />
      <DatePicker
        disabledDate={disabledEndDate}
        format="YYYY-MM-DD"
        value={endValue}
        onChange={handleChange('end')}
        open={endOpen}
        onOpenChange={toggleOpen}
      />
    </div>
  );
};
export default RangePicker;
