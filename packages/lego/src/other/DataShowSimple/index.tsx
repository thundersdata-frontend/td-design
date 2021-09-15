import React, { CSSProperties } from 'react';
import useStyle from '../../hooks/useStyle';
import useTheme from '../../hooks/useTheme';
import bg from './assets/bg.svg';
import rectangle from './assets/rectangle.svg';
import './index.less';

export default ({ style, title, total }: { style?: CSSProperties; title?: string; total?: string }) => {
  const theme = useTheme();
  const { style: modifiedStyle } = useStyle(style);
  return (
    <div style={{ paddingTop: 40, overflow: 'hidden', ...modifiedStyle, display: 'flex' }}>
      <div
        style={{
          width: 156,
          height: 65,
          position: 'absolute',
          top: '0%',
          left: '46%',
          transform: 'translateX(-50%)',
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
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          flex: 1,
        }}
      >
        <div
          style={
            {
              textAlign: 'center',
              marginTop: 35,
              marginRight: 10,
              color: theme.colors.gray50,
              ...theme.typography.h4,
              lineHeight: theme.typography.h4.lineHeight + 'px',
            } as CSSProperties
          }
        >
          {total}
        </div>
      </div>
    </div>
  );
};
