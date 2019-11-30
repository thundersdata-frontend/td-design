import React, { useState, forwardRef, useEffect } from 'react';
import { DatePicker } from 'antd';
import { Moment } from 'moment';

interface RangePickerProps {
  value?: [Moment | undefined, Moment | undefined];
  onChange?: (value: [Moment | undefined, Moment | undefined]) => void;
  placeholder?: [string, string];
}

type Ref = HTMLDivElement;
const RangePicker = forwardRef<Ref, RangePickerProps>(({ placeholder, value, onChange }, ref) => {
  const [startValue, onStartChange] = useState<Moment | undefined>(undefined);
  const [endValue, onEndChange] = useState<Moment | undefined>(undefined);
  const [endOpen, toggleOpen] = useState(false);

  useEffect(() => {
    if (value && value.length === 2) {
      onStartChange(value[0]);
      onEndChange(value[1]);
    }
  }, [value]);

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
      onStartChange(date || undefined);
      if (onChange) {
        onChange([date || undefined, endValue]);
      }
    } else if (type === 'end') {
      onEndChange(date || undefined);
      if (onChange) {
        onChange([startValue, date || undefined]);
      }
    }
  };

  return (
    <div style={{ display: 'flex' }} ref={ref}>
      <DatePicker
        disabledDate={disabledStartDate}
        format="YYYY-MM-DD"
        value={startValue}
        onChange={handleChange('start')}
        onOpenChange={(open: boolean) => !open && !endValue && toggleOpen(true)}
        placeholder={placeholder ? placeholder[0] : ''}
      />
      <span style={{ marginLeft: 8 }} />
      <DatePicker
        disabledDate={disabledEndDate}
        format="YYYY-MM-DD"
        value={endValue}
        onChange={handleChange('end')}
        open={endOpen}
        onOpenChange={toggleOpen}
        placeholder={placeholder ? placeholder[1] : ''}
      />
    </div>
  );
});
export default RangePicker;
