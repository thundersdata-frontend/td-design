import { defaultBg } from '../assets/bgImage';

export const pvTop = 105;
export const INITIAL_ZOOM = 1.2;

/**
 * 默认四层地图叠加实现立体效果
 */
export const generate4MapLayers = (
  mapName: string,
  top = 20,
  zoom = 1,
  showLabel = true,
  labelSize = 14,
  silent = false,
  imgBase64 = defaultBg
) => {
  const bgImage = new Image();
  bgImage.src = imgBase64;

  return [
    {
      type: 'map',
      zoom,
      top: top - 2,
      roam: false,
      silent: true,
      geoIndex: 0,
      map: `${mapName}0`,
      itemStyle: {
        borderColor: '#4570C6',
        borderWidth: 1,
        areaColor: '#1645a3',
      },
    },
    {
      type: 'map',
      zoom,
      top: top - 4,
      roam: false,
      silent: true,
      map: `${mapName}1`,
      itemStyle: {
        borderColor: '#a2a2b2',
        borderWidth: 2,
        areaColor: '#1246ad',
        shadowColor: '#1B4EB8',
        shadowOffsetX: -2,
        shadowOffsetY: -5,
        shadowBlur: 8,
      },
    },
    {
      type: 'map',
      zoom,
      roam: false,
      top: top - 6,
      silent: true,
      map: `${mapName}2`,
      itemStyle: {
        borderColor: '#cbcbdc',
        borderWidth: 3,
        areaColor: '#103682',
        shadowColor: '#1B4EB8',
        shadowOffsetX: -2,
        shadowOffsetY: -5,
        shadowBlur: 8,
      },
    },
    {
      type: 'map',
      zoom,
      silent,
      roam: false,
      top: top - 8,
      map: `${mapName}3`,
      label: {
        show: showLabel,
        color: '#fff',
        fontSize: labelSize,
      },
      tooltip: {
        show: false,
      },
      itemStyle: {
        areaColor: {
          image: bgImage,
          repeat: 'repeat',
        },
        shadowColor: '#1B4EB8',
        shadowOffsetX: -2,
        shadowOffsetY: -5,
        shadowBlur: 8,
        borderColor: '#fff',
        borderWidth: 1,
      },
      select: {
        label: { show: true, color: '#fff' },
        itemStyle: {
          areaColor: '#49e7db',
          opacity: 0.6,
          borderWidth: 2,
          borderColor: '#16fff1',
        },
      },
      emphasis: {
        label: { show: true, color: '#fff' },
        itemStyle: {
          areaColor: '#49e7db',
          opacity: 0.6,
          borderWidth: 2,
          borderColor: '#16fff1',
        },
      },
    },
  ];
};

/**
 * 单层地图
 */
export const generateMapLayer = (
  mapName: string,
  top: number,
  zoom: number,
  showLabel = true,
  labelSize = 14,
  silent = false,
  imgBase64 = defaultBg
) => {
  const bgImage = new Image();
  bgImage.src = imgBase64;

  return [
    {
      type: 'map',
      silent,
      roam: false,
      top,
      zoom,
      map: mapName,
      label: {
        show: showLabel,
        color: '#fff',
        fontSize: labelSize,
      },
      tooltip: {
        show: false,
      },
      itemStyle: {
        areaColor: {
          image: bgImage,
          repeat: 'repeat',
        },
        shadowColor: '#1B4EB8',
        shadowOffsetX: -2,
        shadowOffsetY: -5,
        shadowBlur: 8,
        borderColor: '#fff',
        borderWidth: 1,
      },
      select: {
        label: { show: true, color: '#fff' },
        itemStyle: {
          areaColor: '#49e7db',
          opacity: 0.6,
          borderWidth: 2,
          borderColor: '#16fff1',
        },
      },
      emphasis: {
        label: { show: true, color: '#fff' },
        itemStyle: {
          areaColor: '#49e7db',
          opacity: 0.6,
          borderWidth: 2,
          borderColor: '#16fff1',
        },
      },
    },
  ];
};
