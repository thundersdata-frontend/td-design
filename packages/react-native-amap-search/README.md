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
  /**关键字 */
  keywords?: string;
  /**范围 */
  cityLimit?: boolean;
  /**是否指定城市 */
  city?: string;
  /**是否人工干预 */
  special?: boolean;
  /**页数 */
  page?: number;
  /**一页的数量 */
  pageSize?: number;
  /**文本分类、分类代码 */
  types?: string;
}
```

2 aMapPOIAroundSearch(周边 poi 搜索)

```js
export interface SearchPOIParams {
  /**纬度 */
  latitude: number;
  /**经度 */
  longitude: number; // 经度
  /** 关键字*/
  keywords?: string;
  /**范围 */
  radius?: number;
  /** 是否指定城市*/
  city?: string;
  /** 是否人工干预*/
  special?: boolean;
  /**页数 */
  page?: number;
  /**一页的数量 */
  pageSize?: number;
  /**文本分类、分类代码 */
  types?: string;
}
```

3 aMapPOIPolygonSearch(区域 poi 搜索)

```js
export interface PolygonSearchParams {
  /** 多边形的点*/
  points: AMapGeoPoint[];
  /**关键字 */
  keywords: string;
  /**页数 */
  page?: number;
  /**一页的数量 */
  pageSize?: number;
  /**文本分类、分类代码 */
  types?: string;
}
```

4 RouteSearchParams(道路规划沿途的 poi)

```js
export interface RouteSearchParams {
  /**开始位置 */
  origin: AMapGeoPoint;
  /** 结束位置*/
  destination: AMapGeoPoint;
  /** 驾车导航策略*/
  strategy?: number;
  /**搜索类型 */
  searchType?: number;
  /**道路周围搜索范围,单位米,[0-500]，默认250。 */
  range?: number;
}
```

# 返回

```js
export interface ResultPOI {
  /**POI全局唯一ID */
  uid: string;
  /**名称 */
  name: string;
  /**兴趣点类型 */
  type: string;
  /**类型编码 */
  typecode: string;
  /** 纬度*/
  latitude: number;
  /**经度 */
  longitude: number;
  /**地址 */
  address: string;
  /**电话 */
  tel: string;
  /**距中心点的距离，单位米 */
  distance: number;
  /**停车场类型，地上、地下 */
  parkingType: string;
  /**商铺id */
  shopID: string;
  /**邮编 */
  postcode: string;
  /**网址 */
  website: string;
  /** 电子邮件*/
  email: string;
  /**省 */
  province: string;
  /**省编码 */
  pcode: string;
  /** 市*/
  city: string;
  /**城市编码 */
  citycode: string;
  /** 区域名称*/
  district: string;
  /**区域编码 */
  adcode: string;
}
```
