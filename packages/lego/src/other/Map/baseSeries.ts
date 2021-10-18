import { fillImg } from './assets/img';

export const pvTop = 105;
export const INITIAL_ZOOM = 1.2;

// 注：必须要注册多次，因为 series 之间 map 是共用的
export const getMapSeries = (mapName: string, zoom = INITIAL_ZOOM) => [
  {
    type: 'map',
    roam: false,
    top: 100,
    zoom,
    silent: true,
    map: `${mapName}`,
    itemStyle: {
      borderColor: '#4570C6',
      borderWidth: 1,
      areaColor: '#1645a3',
    },
  },
  {
    type: 'map',
    roam: false,
    top: 95,
    zoom,
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
    roam: false,
    top: 90,
    zoom,
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
    roam: false,
    top: 88,
    zoom: 1.188,
    map: `${mapName}3`,
    label: {
      show: false,
      color: '#fff',
      fontSize: 18,
    },
    tooltip: {
      show: false,
    },
    itemStyle: {
      areaColor: {
        image: fillImg,
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
