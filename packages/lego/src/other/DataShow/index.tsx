import React, { CSSProperties } from 'react';
import useTheme from '../../hooks/useTheme';
import otherDatashowBg from '../../assets/other_datashow_bg.webp';
import rectangle from './assets/rectangle.svg';
import './index.less';

export default ({ style, title, total }: { style?: CSSProperties; title?: string; total?: string }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        ...style,
        backgroundImage: `url(${otherDatashowBg})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        flex: 1,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          marginTop: 200,
          width: 156,
          height: 65,
          backgroundImage: `url(${rectangle})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={
            {
              ...theme.typography.h3,
              lineHeight: '65px',
              color: theme.colors.gray50,
              textAlign: 'center',
            } as CSSProperties
          }
        >
          {title}
        </div>
      </div>
      <div
        style={
          {
            textAlign: 'center',
            marginTop: 12,
            color: theme.colors.gray50,
            ...theme.typography.h4,
            lineHeight: theme.typography.h4.lineHeight + 'px',
          } as CSSProperties
        }
      >
        {total}
      </div>
    </div>
  );
};
