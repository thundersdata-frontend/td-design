import React from 'react';
import Portal from '../../portal';
import { AlertProps } from '../type';
import AlertContainer from './AlertContainer';

export default function alert({ title = '', content = '', actions = [{ text: '确定' }] }: AlertProps) {
  const key = Portal.add(<AlertContainer {...{ title, content, actions }} />);

  return key;
}
