import React, { useState, CSSProperties } from 'react';

export default ({
  coverImg,
  videoUrl,
  width = 692,
  height = 297,
  style,
}: {
  coverImg: string;
  videoUrl: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
}) => {
  const [play, setPlay] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {play ? (
        <div>
          <video width={width} height={height} controls autoPlay src={videoUrl}></video>
        </div>
      ) : (
        <>
          <img src={coverImg} style={{ width, height, background: '#160e0e', opacity: 0.47, ...style }} />
          <img
            src={require('../../assets/play_icon.png')}
            onClick={() => setPlay(true)}
            style={{ position: 'absolute', top: height / 2 - 24, left: width / 2 - 24, color: ' #fff', fontSize: 48 }}
          />
        </>
      )}
    </div>
  );
};
