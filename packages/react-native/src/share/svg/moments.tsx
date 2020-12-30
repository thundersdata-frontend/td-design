import * as React from 'react';
import SvgIcon from '../../svg-icon';
import { px } from '../../helper';

const width = px(40);
const height = px(40);

const xml = `
<svg t="1609225166832" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1493" width=${width} height=${height}><path d="M681.7 38.8S614.1 12 512 12 342.3 42.7 342.3 42.7L681.8 381l-0.1-342.2z" fill="#FB5453" p-id="1494"></path><path d="M865.5 158.5c-72.2-71.3-142-96.7-142-96.7l-2.4 476 245.3-242c0 0.1-28.6-66-100.9-137.3z" fill="#6468F1" p-id="1495"></path><path d="M980.9 344.6L638 679.5h346.9s27.2-66.7 27.2-167.5c-0.1-100.7-31.2-167.4-31.2-167.4z" fill="#5283F0" p-id="1496"></path><path d="M726.3 965.1s67-28.2 139.2-99.5 98-140.1 98-140.1L481 723.1l245.3 242z" fill="#00B2FE" p-id="1497"></path><path d="M342.2 985.3s67.6 26.8 169.7 26.8c102.2 0 169.7-30.7 169.7-30.7L342.1 643.1l0.1 342.2z" fill="#66D020" p-id="1498"></path><path d="M158.4 865.6c72.2 71.3 142 96.7 142 96.7l2.4-476-245.3 242c0.1-0.1 28.7 66 100.9 137.3z" fill="#9AD122" p-id="1499"></path><path d="M39.1 344.6s-27.2 66.7-27.2 167.5S43 679.6 43 679.6l342.9-334.9H39.1v-0.1z" fill="#FFC71A" p-id="1500"></path><path d="M297.7 59s-67 28.2-139.2 99.5-98 140.1-98 140.1L543 301 297.7 59z" fill="#FF7612" p-id="1501"></path></svg>
`;

export default () => <SvgIcon xml={xml} width={width} height={height} />;
