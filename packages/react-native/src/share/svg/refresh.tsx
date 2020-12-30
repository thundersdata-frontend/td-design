import * as React from 'react';
import SvgIcon from '../../svg-icon';
import { px } from '../../helper';

const width = px(40);
const height = px(40);

const xml = `
<svg t="1609225806969" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3453" width=${width} height=${height}><path d="M989.9 477.9c-18.9 0-34.1 15.3-34.1 34.1 0 244.7-199.1 443.7-443.7 443.7S68.3 756.7 68.3 512 267.3 68.3 512 68.3c146.5 0 283.8 73.3 366.1 193.1H699.8c-18.9 0-34.1 15.3-34.1 34.1s15.3 34.1 34.1 34.1h248.7c18.9 0 34.1-15.3 34.1-34.1V46.8c0-18.9-15.3-34.1-34.1-34.1S914.4 28 914.4 46.8v148.8C818 73.5 669.6 0 512 0 229.7 0 0 229.7 0 512s229.7 512 512 512 512-229.7 512-512c0-18.9-15.3-34.1-34.1-34.1z" p-id="3454" fill="#515151"></path></svg>
`;

export default () => <SvgIcon xml={xml} width={width} height={height} />;
