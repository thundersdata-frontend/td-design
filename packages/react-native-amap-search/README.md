# react-native-amap-search

search

## 安装

npm or yarn

```sh
npm install @td-design/react-native-amap-search

yarn add @td-design/react-native-amap-search

# ios 项目需要更新 pods
cd ios
pod install
```

## 使用

### 添加高德 Key

- ios

1 [获取高德 key](https://lbs.amap.com/api/android-sdk/guide/create-project/get-key)

2 在 AppDelegate.m 里引入 SDK 头文件 #import <AMapFoundationKit/AMapFoundationKit.h>， 并设置高德 Key [AMapServices sharedServices].apiKey = @"你的高德 Key";。

- android

1 [获取高德 key](https://lbs.amap.com/api/android-sdk/guide/create-project/get-key)

2 编辑 Android 项目的 AndroidManifest.xml（一般在 android\app\src\main\AndroidManifest.xml），添加如下代码：

```
<application>
  <meta-data android:name="com.amap.api.v2.apikey" android:value="你的高德 Key" />
</application>
```

## 用法

1 初始化

```js
import { init } from '@td-design/react-native-amap-search';

init();
```

2 调用

```js
import { useAMapSearch } from '@td-design/react-native-amap-search';

const { aMapPOIKeywordsSearch, data } = useAMapSearch();
```

## API

1 aMapPOIKeywordsSearch(关键字搜索)

```js
export interface KeyWordsSearchPOIParams {
  keywords?: string; //关键字
  cityLimit?: boolean; // 范围
  city?: string; // 是否指定城市
  special?: boolean; // 是否人工干预
  page?: number; // 页数
  pageSize?: number;
  types?: string; //文本分类、分类代码
}
```

2 aMapPOIAroundSearch(周边 poi 搜索)

```js
export interface SearchPOIParams {
  latitude: number; // 纬度
  longitude: number; // 经度
  keywords?: string; // 关键字
  radius?: number; // 范围
  city?: string; // 是否指定城市
  special?: boolean; // 是否人工干预
  page?: number; // 页数
  pageSize?: number;
  types?: string; //文本分类、分类代码
}
```

3 aMapPOIPolygonSearch(区域 poi 搜索)

```js
export interface PolygonSearchParams {
  points: AMapGeoPoint[]; // 多边形的点
  keywords: string; //关键字
  page?: number; // 页数
  pageSize?: number;
  types?: string; //文本分类、分类代码
}
```

4 RouteSearchParams(道路规划沿途的 poi)

```js
export interface RouteSearchParams {
  origin: AMapGeoPoint; // 开始位置
  destination: AMapGeoPoint; //结束位置
  strategy?: number; // 驾车导航策略
  searchType?: number; //搜索类型
  range?: number; //道路周围搜索范围,单位米,[0-500]，默认250。
}
```

# 返回

```js
export interface ResultPOI {
  uid: string; // POI全局唯一ID
  name: string; //名称
  type: string; //兴趣点类型
  typecode: string; //类型编码
  latitude: number; //纬度
  longitude: number; //经度
  address: string; //地址
  tel: string; //电话
  distance: number; //距中心点的距离，单位米
  parkingType: string; //停车场类型，地上、地下
  shopID: string; //商铺id
  postcode: string; //邮编
  website: string; //网址
  email: string; //电子邮件
  province: string; //省
  pcode: string; //省编码
  city: string; //市
  citycode: string; //城市编码
  district: string; //区域名称
  adcode: string; //区域编码
}
```
