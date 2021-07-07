import React from 'react';
import { helpers, SvgIcon } from '@td-design/react-native';

const { px } = helpers;
const width = px(40);
const height = px(40);

const xml = `
<svg t="1609229172056" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10202" width=${width} height=${height}><path d="M982.664533 621.294933c0-113.442133-93.678933-208.776533-218.641067-233.437867-1.6384-1.6384-1.6384-1.6384-3.2768-1.6384s-1.655467 0-3.293867 0c-1.621333 0-1.621333 0-3.259733-1.655467-1.655467 0-3.293867 0-4.932267 0l-1.655467 0c-1.655467 0-3.2768 0-4.932267-1.655467l-1.655467 0c-1.655467 0-4.9152 0-6.570667 0-11.52-1.655467-24.661333-1.655467-36.164267-1.655467-157.815467 0-282.743467 106.871467-282.743467 240.0256 0 29.576533 6.570667 59.170133 18.090667 85.486933l0 1.621333c1.655467 0 1.655467 1.655467 1.655467 3.293867L436.906667 711.68c0 1.6384 0 3.2768 1.655467 3.2768l0 1.655467c0 1.655467 1.655467 1.655467 1.655467 3.2768l1.655467 1.655467 0 1.655467c1.6384 1.655467 1.6384 1.655467 1.6384 3.259733l1.655467 1.655467c0 0 0 1.655467 1.655467 1.655467l0 1.655467c1.621333 3.2768 1.621333 4.932267 3.2768 6.570667 34.525867 54.254933 93.713067 93.696 162.747733 113.425067 4.9152 1.6384 11.502933 3.2768 16.452267 3.2768 23.022933 4.932267 46.011733 8.226133 69.034667 8.226133 34.5088 0 65.757867-6.587733 96.989867-14.813867l105.216 50.961067-26.299733-88.7808C939.9296 765.952 982.664533 698.555733 982.664533 621.294933zM612.795733 585.130667c-19.712 0-34.5088-14.7968-34.5088-34.525867 0-19.712 14.7968-36.164267 34.5088-36.164267 19.729067 0 36.164267 16.452267 36.164267 36.164267C648.96 570.333867 632.541867 585.130667 612.795733 585.130667zM795.272533 585.130667c-19.729067 0-34.5088-14.7968-34.5088-34.525867 0-19.712 14.779733-36.164267 34.5088-36.164267s36.164267 16.452267 36.164267 36.164267C831.4368 570.333867 815.0016 585.130667 795.272533 585.130667z" p-id="10203" fill="#4CBF00"></path><path d="M473.070933 424.021333c59.204267-49.288533 138.103467-78.8992 225.211733-78.8992 6.587733 0 13.1584 0 19.729067 0C680.192 223.488 548.693333 133.0688 392.533333 133.0688c-187.392 0-338.6368 128.2048-338.6368 286.020267 0 92.0576 49.322667 172.629333 128.221867 225.211733l-29.610667 105.216 124.945067-59.1872c36.164267 9.864533 75.605333 16.452267 115.080533 16.452267l1.655467 0c-9.8816-26.3168-14.813867-55.893333-14.813867-85.486933C379.374933 544.034133 415.5392 473.344 473.070933 424.021333zM502.6816 276.087467c26.299733 0 46.0288 21.3504 46.0288 46.011733 0 26.3168-19.729067 46.045867-46.0288 46.045867-24.661333 0-46.045867-19.729067-46.045867-46.045867C456.635733 297.437867 478.020267 276.087467 502.6816 276.087467zM280.746667 368.145067c-26.299733 0-46.0288-19.729067-46.0288-46.045867 0-24.661333 19.729067-46.011733 46.0288-46.011733 24.661333 0 46.045867 21.3504 46.045867 46.011733C326.775467 348.416 305.408 368.145067 280.746667 368.145067z" p-id="10204" fill="#4CBF00"></path></svg>
`;

export default () => <SvgIcon xml={xml} width={width} height={height} />;