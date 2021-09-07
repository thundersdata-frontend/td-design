interface AMapGeoPoint {
  /** 纬度*/
  latitude: number;
  /** 经度*/
  longitude: number;
}
interface SearchPOIParams {
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

interface KeyWordsSearchPOIParams {
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

interface PolygonSearchParams {
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

interface RouteSearchParams {
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

interface ResultPOI {
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
