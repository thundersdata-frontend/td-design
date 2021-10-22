import React from 'react';
import { Map } from '@td-design/lego';
import chinaJson from './assets/china.json';

export default () => <Map style={{ width: 486, height: 584 }} mapJson={chinaJson} />;
