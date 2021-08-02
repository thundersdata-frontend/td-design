import React from 'react';
import { PieChart } from '@td-design/lego';

/** 饼图 demo */
const PieChartDemo = () => <PieChart data={[800, 600, 500, 400, 300, 100]} labelFormatter={'{b} {c}台\n{d}%'} />;

export default PieChartDemo;
