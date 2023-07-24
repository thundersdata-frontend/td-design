---
title: ECharts - 图表组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 其他组件
  path: /other
---

# ECharts 图表组件

使用本组件需要单独安装：**yarn add @td-design/react-native-echarts**

**!!! 强烈建议使用(wrn-echarts)[https://github.com/wuba/wrn-echarts]**

## 效果演示

### 1. 渲染图表

```tsx | pure
const chart = useRef<EchartsHandler>(null);

useEffect(() => {
  chart.current?.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: `function (params) {
          if (Array.isArray(params)) {
            return params[0].name;
          }
          return params.name;
        }`,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  });

  return () => clearTimeout(timer);
}, []);

return <Echarts ref={chart} />;
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644832185331956336.png"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 2. 修改图表数据

```tsx | pure
const modifyOptions = () => {
  chart.current?.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: `function (params) {
        if (Array.isArray(params)) {
          return params[0].name + ": " + params[0].data;
        }
        return params.name + ": " + params.data;
      }`,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [82, 93, 90, 93, 129, 46, 66],
        type: 'line',
      },
    ],
  });
};

return (
  <Container>
    <Echarts ref={chart} />
    <Button title="修改图表数据" onPress={modifyOptions} />
  </Container>
);
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644832405780437433.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 3. 渲染地图

```tsx | pure
export function MapChart() {
  const chart = useRef<EchartsHandler>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      chart.current?.setOption({
        backgroundColor: '#000',
        geo: {
          map: 'shandong',
          roam: false,
          silent: true,
          itemStyle: {
            areaColor: '#013C62',
            shadowColor: '#6aa1fb',
            shadowOffsetX: 2,
            shadowOffsetY: 5,
            shadowBlur: 8,
          },
        },
        series: [
          {
            name: 'shandong',
            type: 'map',
            roam: false,
            map: 'shandong',
            data: [],
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: '#1B4EB8',
              borderWidth: 1,
              borderColor: '#CDC4CB',
              shadowColor: '#1B4EB8',
              shadowOffsetX: -2,
              shadowBlur: 8,
            },
            select: {
              label: { show: false },
              itemStyle: {
                areaColor: '#49e7db',
                opacity: 0.6,
                borderWidth: 2,
                borderColor: '#16fff1',
              },
            },
            emphasis: {
              label: { show: false },
              itemStyle: {
                areaColor: '#49e7db',
                // opacity: 0.6,
                borderWidth: 2,
                borderColor: '#16fff1',
              },
            },
          },
        ],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const extraCode = `
    var shandongMapData = ${JSON.stringify(shandongMap)};
    echarts.registerMap('shandong', shandongMapData);
  `;

  return (
    <Container>
      <Echarts ref={chart} extraCode={extraCode} />
    </Container>
  );
}
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644832499897809477.png"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

## API

| 属性               | 必填    | 说明                         | 类型                 | 默认值 |
| ------------------ | ------- | ---------------------------- | -------------------- | ------ |
| width              | `false` | 图表的宽度                   | `number`             |        |
| height             | `false` | 图表的高度                   | `number`             |        |
| backgroundColor    | `false` | 图表的背景色                 | `string`             |        |
| extraCode          | `false` | 额外注入的代码，比如注册地图 | `string`             |        |
| echartsInitOptions | `false` | echarts 初始化配置           | `EchartsInitOptions` |        |

```ts
type EchartsInitOptions = {
  /** 设备像素比 */
  devicePixelRatio?: number;
  /** 渲染模式 */
  renderer?: 'canvas' | 'svg';
  /** 使用的语言，内置 'ZH' 和 'EN' 两个语言 */
  locale?: 'ZH' | 'EN';
  /** 是否开启脏矩形渲染，只有在 Canvas 渲染模式有效， 默认为false。 */
  useDirtyRect?: boolean;
};
```
