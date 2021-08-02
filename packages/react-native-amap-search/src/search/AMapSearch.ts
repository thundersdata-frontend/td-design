export interface AMapGeoPoint {
  latitude: number;
  longitude: number; // 经度
}

export interface SeaechPOIParams {
  latitude: number; // 纬度
  longitude: number; // 经度
  keywords?: string; // 关键字
  radius?: number; // 范围
  city?: string; // 是否指定城市
  special?: boolean; // 是否人工干预
  page?: string; // 页数
  pageSize?: number;
  types?: string; //文本分类、分类代码
}

export interface KeyWordsSeaechPOIParams {
  keywords?: string; //关键字
  cityLimit?: boolean; // 范围
  city?: string; // 是否指定城市
  special?: boolean; // 是否人工干预
  page?: string; // 页数
  pageSize?: number;
  types?: string; //文本分类、分类代码
}

export interface PolygonSearchParams {
  points: AMapGeoPoint[]; // 多边形的点
  keywords: string; //关键字
  page?: string; // 页数
  pageSize?: number;
  types?: string; //文本分类、分类代码
}

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
