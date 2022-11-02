import { helpers } from '@td-design/react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';

const { px } = helpers;
const width = px(40);
const height = px(40);
const xml = `
<svg t="1609229391798" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11135" width=${width} height=${height}><path d="M836.3 409.4c-1.5 6-5 14.9-10 25.6h0.1l-0.6 1c-29 62.1-104.5 183.7-104.5 183.7s-0.1-0.3-0.4-0.7l-22.1 38.5h106.5L602 928.2 648.2 744h-83.8l29.1-121.9c-23.6 5.7-51.4 13.5-84.4 24.1 0 0-44.6 26.2-128.5-50.3 0 0-56.6-49.9-23.8-62.4 13.9-5.3 67.7-12 110-17.7C524 508 559.2 504 559.2 504s-176.2 2.5-218-4c-41.8-6.5-94.9-76.5-106.2-137.9 0 0-17.4-33.7 37.6-17.7 55 16 282.9 62.2 282.9 62.2s-296.4-91-316.1-113.2c-19.7-22.2-58-121.2-53-182 0 0 2.2-15.2 17.6-11.1 0 0 219.1 100.3 369 155.2 149.9 54.9 280.1 82.8 263.3 153.9z m0 0" p-id="11136" fill="#00ACFF"></path></svg>
`;

export default () => <SvgXml xml={xml} width={width} height={height} />;
