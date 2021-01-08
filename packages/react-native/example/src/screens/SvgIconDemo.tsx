import React from 'react';
import { SvgIcon } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  const width = 120;
  const height = 120;

  /** Iconfont图标示例 */
  const xml = `
    <svg viewBox="0 0 1024 1024" width=${width} height=${height}>
      <path d="M592 256l96-192c-24.4-13.968-76.064-0.288-96-16C536.096 3.904 487.52 7.6 432 48c-22.608 16.448-69.52-0.272-96 16l96 192" fill="#F73B2F" p-id="3723"></path>
      <path d="M688 64l-64-16-96 208h48l112-192z" fill="#D23228" p-id="3724"></path>
      <path d="M512 256c220.768 0 400 258.096 400 576 0 30.464 114.352 69.696 88 144-20.56 57.984-104.32 16-104.32 16C634.48 1010.864 373.264 1011.28 112 992c0 0-74.112 33.552-90.288-16C4 921.68 112 856.64 112 832c0-317.904 179.232-576 400-576z" fill="#F73B2F" p-id="3725"></path>
      <path d="M21.712 976c18.592-123.2 564.144 39.536 715.92-97.888 160.304-145.152-6.24-529.936 0-521.68C830.128 478.96 912 634.592 912 832c0 30.464 114.352 69.696 88 144-20.56 57.984-104.32 16-104.32 16C634.48 1010.864 373.264 1011.28 112 992c0 0-98.176 36.352-90.288-16z" fill="#D23228" p-id="3726"></path>
      <path d="M464 640a48.432 48 90 1 0 96 0 48.432 48 90 1 0-96 0Z" fill="#F73B2F" p-id="3727"></path>
    </svg>
  `;

  /** IconPark图标示例 */
  const xml2 = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg width=${width} height=${height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="24" height="24" rx="3" fill="#2F88FF" stroke="#333" stroke-width="2"/>
      <path d="M24 36V41C24 42.6569 22.6569 44 21 44H8" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 12V4" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M28 12V4" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 24H26" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  return (
    <Container>
      <SvgIcon {...{ width, height }} xml={xml} />
    </Container>
  );
};
