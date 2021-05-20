import React from 'react';
import { helpers, SvgIcon } from '@td-design/react-native';

const { px } = helpers;
const width = px(40);
const height = px(40);

const xml = `
<svg t="1609229469028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11691" width=${width} height=${height}><path d="M881.81248 829.568 142.26432 829.568c-41.74336 0-75.70432-33.96096-75.70432-75.70944L66.56 270.0544c0-41.66656 33.96096-75.62752 75.70432-75.62752l739.54816 0c41.67168 0 75.62752 33.96096 75.62752 75.62752l0 483.80416C957.44 795.61216 923.48416 829.568 881.81248 829.568L881.81248 829.568 881.81248 829.568zM142.26432 235.15136c-19.24608 0-34.98496 15.6672-34.98496 34.90304l0 483.80416c0 19.328 15.73888 35.00032 34.98496 35.00032l739.54816 0c19.24608 0 34.91328-15.67232 34.91328-35.00032L916.72576 270.0544c0-19.24096-15.67232-34.90304-34.91328-34.90304L142.26432 235.15136 142.26432 235.15136 142.26432 235.15136z" p-id="11692" fill="#F2BB41"></path><path d="M881.81248 829.568 142.26432 829.568c-31.17056 0-59.56096-19.6352-70.69184-48.90112-2.944-7.87456-0.79872-16.77824 5.48352-22.4256l288.74752-257.408c8.3456-7.3984 21.22752-6.7584 28.6976 1.66912 7.48032 8.42752 6.7584 21.22752-1.664 28.6976l-276.17792 246.35904c6.52288 6.99392 15.744 11.28448 25.60512 11.28448l739.54816 0c9.7792 0 19.00544-4.29056 25.5232-11.28448l-279.43936-249.22624c-8.35072-7.47008-9.14432-20.27008-1.5872-28.70272 7.4752-8.3456 20.35712-9.06752 28.70272-1.66912l291.84512 260.28032c6.28224 5.64224 8.50432 14.55104 5.48352 22.41536C941.29664 809.9328 912.91136 829.568 881.81248 829.568L881.81248 829.568 881.81248 829.568z" p-id="11693" fill="#F2BB41"></path><path d="M512.03584 646.58432c-4.84352 0-9.69728-1.664-13.5168-5.15584L77.06112 265.76384c-6.28736-5.64736-8.42752-14.55104-5.48352-22.4256 11.13088-29.26592 39.52128-48.91136 70.69184-48.91136l739.54816 0c31.09376 0 59.47904 19.72736 70.53312 48.91136 3.0208 7.87456 0.7936 16.77824-5.48352 22.4256l-421.22752 375.66464C521.73824 644.92032 516.8896 646.58432 512.03584 646.58432L512.03584 646.58432 512.03584 646.58432zM116.6592 246.51776l395.38176 352.44032 395.29984-352.44032c-6.51776-7.07584-15.744-11.37152-25.5232-11.37152L142.26432 235.14624C132.4032 235.15136 123.1872 239.44704 116.6592 246.51776L116.6592 246.51776 116.6592 246.51776z" p-id="11694" fill="#F2BB41"></path></svg>
`;

export default () => <SvgIcon xml={xml} width={width} height={height} />;
