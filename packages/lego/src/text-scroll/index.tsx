import React, { CSSProperties, useEffect } from 'react';

import useTheme from '../hooks/useTheme';
import './index.less';

export interface TextScrollProps {
  texts: string[];
  /** 滚动速度，通过时间控制，单位s */
  scrollSpeed?: number;
  /** 文字滚动的延迟时间，单位s */
  delay?: number;
  /** 文字的样式 */
  textStyle?: CSSProperties;
  /** 内容的样式，主要用于设置文字滚动的高度 */
  contentStyle?: CSSProperties;
  /** 在弹窗中 */
  inModal?: boolean;
}

export default ({
  texts = [],
  textStyle,
  scrollSpeed = 5,
  delay = 2,
  contentStyle,
  inModal = false,
}: TextScrollProps) => {
  const theme = useTheme();

  useEffect(() => {
    if (texts.length > 0) {
      const node = document.getElementById('list');
      const runKeyframes = `
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }`;
      const style = document.createElement('style');
      style.innerHTML = runKeyframes;
      node?.appendChild(style);
    }
  }, [texts]);

  const lineHeight = inModal ? 25 : 19;
  /** 两组数据解决轮播后面会空白的问题 */
  const textList = [...texts, ...texts];
  const content = textList?.map((item: string, index: number) => (
    <div
      key={index}
      style={
        {
          color: theme.colors.gray50,
          ...theme.typography[inModal ? 'p0' : 'p2'],
          lineHeight: `${lineHeight}px`,
          textIndent: '2em',
          wordSpacing: -0.7,
          marginBottom: 7,
          ...textStyle,
        } as CSSProperties
      }
      dangerouslySetInnerHTML={{ __html: decodeHTML(item) }}
    ></div>
  ));

  return (
    <div style={{ height: lineHeight * texts?.length, overflow: 'hidden', ...contentStyle }}>
      <div
        id="list"
        style={{
          animation: `scroll ${scrollSpeed}s ${delay}s linear infinite`,
        }}
        className="td-lego-text-scroll-list"
      >
        {content}
      </div>
    </div>
  );
};

const decodeHTML = (text: string) => {
  if (!text) return '';
  const temp = document.createElement('div');
  temp.innerHTML = text;
  const output = temp.innerText || temp.textContent;
  return output || '';
};
