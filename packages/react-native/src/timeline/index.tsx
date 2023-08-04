import React from 'react';

import HorizontalTimeline from './HorizontalTimeline';
import { TimelineProps } from './type';
import VerticalTimeline from './VerticalTimeline';

const Timeline = ({ data, customIcon, direction = 'vertical', lineStyle }: TimelineProps) => {
  if (direction === 'vertical') return <VerticalTimeline {...{ data, customIcon, lineStyle }} />;

  return <HorizontalTimeline {...{ data, customIcon, lineStyle }} />;
};
Timeline.displayName = 'Timeline';

export default Timeline;
