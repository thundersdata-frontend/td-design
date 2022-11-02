import { helpers } from '@td-design/react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';

const { px } = helpers;
const width = px(40);
const height = px(40);

const xml = `
<svg t="1609229336448" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10713" width=${width} height=${height}><path d="M643.573 533.504c-26.037-24.15-59.786-42.027-101.728-53.621-41.941-11.104-86.304-14.486-134.026-9.654-72.32 7.734-132.587 30.432-180.267 69.558-47.733 38.645-69.43 82.133-64.608 129.941 2.901 31.403 17.355 59.413 43.392 83.573s59.787 42.027 101.728 53.622 86.304 14.933 134.037 10.133c72.32-7.723 132.587-30.421 180.267-69.557s69.419-82.603 64.565-130.422c-2.858-31.402-17.322-59.413-43.36-83.573z" fill="#FFFFFF" p-id="10714"></path><path d="M533.163 602.581c-15.424-29.461-40.971-48.789-77.131-58.442-34.23-9.184-68.47-5.803-102.699 9.173q-50.624 22.464-73.76 68.117c-15.434 30.934-16.394 61.344-3.381 91.734 13.024 29.952 37.13 50.72 71.84 61.866 36.16 12.075 72.8 10.144 109.44-5.802 36.64-15.456 62.677-40.096 77.141-73.419 14.944-32.843 14.464-63.755-1.45-93.227z m-129.206 100c-7.232 11.104-17.354 18.838-30.858 23.67q-19.52 6.506-36.16-1.451c-11.083-5.333-18.315-13.525-21.206-24.64-2.901-11.595-0.97-22.699 6.262-33.813 6.752-11.115 16.874-18.358 29.408-22.699a50.315 50.315 0 0 1 35.68 0.48c11.573 4.832 18.805 13.045 22.176 24.64s1.408 22.699-5.302 33.813zM449.76 643.2a18.421 18.421 0 0 1-11.093 9.664 22.997 22.997 0 0 1-13.984 0c-9.6-4.832-11.563-12.075-6.262-22.219a21.067 21.067 0 0 1 24.587-9.664 14.848 14.848 0 0 1 8.683 9.184c1.44 4.299 0.48 8.651-1.931 13.035z" fill="#040000" p-id="10715"></path><path d="M820.512 561.525c-11.083-17.386-24.107-30.432-39.05-40.096a207.467 207.467 0 0 0-50.134-23.189c-3.85-1.45-6.752-2.41-8.192-2.89a61.312 61.312 0 0 1-5.792-3.873c-2.4-1.93-3.37-3.861-2.4-6.272a30.677 30.677 0 0 0 2.4-9.664c14.464-37.685 14.464-66.656 0-87.466-14.933-19.808-40.01-29.952-74.667-29.952s-74.73 9.664-120.053 28.981l-2.89 0.97a27.307 27.307 0 0 1-6.753 1.931 12.277 12.277 0 0 1-7.232 0.48 6.08 6.08 0 0 1-4.821-3.381c-0.96-1.93-0.96-5.333 0.48-9.653 14.933-47.339 11.573-81.643-9.6-102.4-23.616-24.16-64.117-25.12-120.043-3.382-56.522 22.24-111.957 60.886-166.965 115.958-41.461 42.026-73.77 84.053-96.427 126.56s-33.706 82.602-33.706 120.277c0 35.264 10.602 67.627 31.818 98.07q31.819 44.917 83.894 73.898c34.229 19.328 73.76 34.304 117.152 45.408A538.827 538.827 0 0 0 441.6 868.267c45.803-0.48 90.155-5.334 132.096-15.456 42.432-10.144 79.072-23.67 110.41-40.534a409.44 409.44 0 0 0 82.443-57.482c23.147-21.259 40.982-43.968 53.035-67.2 12.053-23.67 17.835-46.379 17.835-68.598a105.333 105.333 0 0 0-16.907-57.472zM622.357 747.5c-47.722 39.136-107.989 61.866-180.266 69.557-47.734 4.832-92.086 1.45-134.038-10.133S232.32 777.45 206.325 753.3s-40.533-52.17-43.392-83.573c-4.821-47.819 16.875-91.296 64.608-129.941 47.734-39.126 108-61.867 180.267-69.558 47.723-4.832 92.085-1.45 134.027 9.654 41.941 11.594 75.733 29.472 101.728 53.621s40.533 52.17 43.392 83.573c4.832 47.819-16.864 91.296-64.598 130.422z" fill="#CD281E" p-id="10716"></path><path d="M801.227 313.237c13.504 15.456 22.666 33.323 26.517 53.131s2.89 39.125-3.37 57.483c-2.411 7.733-7.233 13.045-14.465 16.906-7.232 3.382-14.464 4.352-21.696 1.931a25.781 25.781 0 0 1-16.394-14.485c-3.371-7.243-4.342-14.496-1.931-21.739 6.272-20.779 2.41-38.645-11.573-54.581q-21.675-23.2-52.064-17.398a30.25 30.25 0 0 1-22.176-3.818c-6.752-4.352-11.094-10.144-12.054-18.358-1.45-7.733-0.48-14.933 3.862-21.738s10.122-11.115 17.834-12.555a112.32 112.32 0 0 1 107.51 35.264z" fill="#DA761E" p-id="10717"></path><path d="M889.461 233.045a224 224 0 0 1 54.955 109.174c8.203 41.536 6.272 80.672-6.741 118.4a35.2 35.2 0 0 1-16.395 19.808c-8.192 4.341-16.395 4.832-25.6 1.93a31.936 31.936 0 0 1-19.285-16.906c-4.331-8.214-4.822-16.427-2.411-25.6 9.163-26.571 10.667-55.072 4.821-84.534a157.515 157.515 0 0 0-39.05-77.29c-20.267-22.71-44.352-38.166-72.32-46.859a166.901 166.901 0 0 0-84.374-4.352 32.256 32.256 0 0 1-25.546-4.832c-7.712-4.821-12.534-12.075-14.464-21.248s-0.48-17.397 4.821-25.12a31.755 31.755 0 0 1 21.259-14.55c40.01-8.693 79.552-6.762 119.082 5.803 39.051 12.555 72.8 34.294 101.248 66.134z" fill="#DA761E" p-id="10718"></path></svg>
`;

export default () => <SvgXml xml={xml} width={width} height={height} />;
