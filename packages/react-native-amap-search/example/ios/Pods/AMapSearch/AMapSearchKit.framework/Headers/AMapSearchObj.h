//
//  AMapSearchObj.h
//  AMapSearchKit
//
//  Created by xiaoming han on 15/7/22.
//  Copyright (c) 2015年 Amap. All rights reserved.
//

/* 该文件定义了搜索请求和返回对象。*/

#import <Foundation/Foundation.h>
#import "AMapCommonObj.h"

///沿途搜索类型
typedef NS_ENUM(NSInteger, AMapRoutePOISearchType)
{
    AMapRoutePOISearchTypeGasStation         = 0,   ///< 加油站
    AMapRoutePOISearchTypeMaintenanceStation = 1,   ///< 维修站
    AMapRoutePOISearchTypeATM                = 2,   ///< ATM
    AMapRoutePOISearchTypeToilet             = 3,   ///< 厕所
    AMapRoutePOISearchTypeGasAirStation      = 4,   ///< 加气站
    AMapRoutePOISearchTypeParkStation        = 5,   ///< 服务区
    AMapRoutePOISearchTypeChargingPile       = 6,   ///< 充电桩
    AMapRoutePOISearchTypeFood               = 7,   ///< 美食
    AMapRoutePOISearchTypeHotel              = 8,   ///< 酒店
};

///天气查询类型
typedef NS_ENUM(NSInteger, AMapWeatherType)
{
    AMapWeatherTypeLive = 1,    ///< 实时
    AMapWeatherTypeForecast     ///< 预报
};

///企业地图搜索结果排序
typedef NS_ENUM(NSInteger, AMapCloudSortType)
{
    AMapCloudSortTypeDESC      = 0, ///< 降序
    AMapCloudSortTypeASC       = 1  ///< 升序
};

///附近搜索距离类型
typedef NS_ENUM(NSInteger, AMapNearbySearchType)
{
    AMapNearbySearchTypeLiner   = 0, ///< 直线距离
    AMapNearbySearchTypeDriving = 1, ///< 驾车行驶距离
};

///货车类型
typedef NS_ENUM(NSInteger, AMapTruckSizeType)
{
    AMapTruckSizeTypeMini   = 1, ///< 微型车
    AMapTruckSizeTypeLight  = 2, ///< 轻型车
    AMapTruckSizeTypeMedium = 3, ///< 中型车
    AMapTruckSizeTypeHeavy  = 4, ///< 重型车
};

///规避道路类型
typedef NS_ENUM(NSInteger, AMapDrivingRouteExcludeType)
{
    AMapDrivingRouteExcludeTypeNone       = 0, ///< 不规避
    AMapDrivingRouteExcludeTypeToll       = 1, ///< 收费道路
    AMapDrivingRouteExcludeTypeMotorway   = 2, ///< 高速路
    AMapDrivingRouteExcludeTypeFerry      = 3, ///< 渡船
};

///规避道路类型 @since 9.2.0
typedef NS_ENUM(NSUInteger, AMapDrivingRouteShowFieldType)
{
    AMapDrivingRouteShowFieldTypeNone     = 1 << 0, ///< 不返回扩展信息
    AMapDrivingRouteShowFieldTypeCost     = 1 << 1, ///< 返回方案所需时间及费用成本
    AMapDrivingRouteShowFieldTypeTmcs     = 1 << 2, ///< 返回分段路况详情
    AMapDrivingRouteShowFieldTypeNavi     = 1 << 3, ///< 返回详细导航动作指令
    AMapDrivingRouteShowFieldTypeCities   = 1 << 4, ///< 返回分段途径城市信息
    AMapDrivingRouteShowFieldTypePolyline = 1 << 5, ///< 返回分路段坐标点串，两点间用“,”分隔
    AMapDrivingRouteShowFieldTypeNewEnergy = 1 << 6, ///< 返回分路段坐标点串，两点间用“,”分隔
    AMapDrivingRouteShowFieldTypeAll      = ~0UL,   ///< 返回所有扩展信息
};

///步行路线规划返回结果控制 @since 9.4.0
typedef NS_ENUM(NSUInteger, AMapWalkingRouteShowFieldType)
{
    AMapWalkingRouteShowFieldTypeNone     = 0 << 0, ///< 不返回扩展信息
    AMapWalkingRouteShowFieldTypeCost     = 1 << 0, ///< 返回方案所需时间及费用成本
    AMapWalkingRouteShowFieldTypeNavi     = 1 << 1, ///< 返回详细导航动作指令
    AMapWalkingRouteShowFieldTypePolyline = 1 << 2, ///< 返回分路段坐标点串，两点间用“,”分隔
    AMapWalkingRouteShowFieldTypeAll      = ~0UL,   ///< 返回所有扩展信息
};

///公交车路线规划返回结果控制 @since 9.4.0
typedef NS_OPTIONS(NSUInteger, AMapTransitRouteShowFieldsType)
{
    AMapTransitRouteShowFieldsTypeNone     = 1 << 0, ///< 不返回扩展信息
    AMapTransitRouteShowFieldsTypeCost     = 1 << 1, ///< 返回方案所需时间及费用成本
    AMapTransitRouteShowFieldsTypeNavi     = 1 << 2, ///< 返回详细导航动作指令
    AMapTransitRouteShowFieldsTypePolyline = 1 << 3, ///< 返回分路段坐标点串，两点间用“,”分隔
    AMapTransitRouteShowFieldsTypeAll      = ~0UL,   ///< 返回所有扩展信息
};

///骑行路线规划返回结果控制 @since 9.4.0
typedef NS_OPTIONS(NSUInteger, AMapRidingRouteShowFieldsType)
{
    AMapRidingRouteShowFieldsTypeNone     = 1 << 0, ///< 不返回扩展信息
    AMapRidingRouteShowFieldsTypeCost     = 1 << 1, ///< 返回方案所需时间及费用成本
    AMapRidingRouteShowFieldsTypeNavi     = 1 << 2, ///< 返回详细导航动作指令
    AMapRidingRouteShowFieldsTypePolyline = 1 << 3, ///< 返回分路段坐标点串，两点间用“,”分隔
    AMapRidingRouteShowFieldsTypeAll      = ~0UL,   ///< 返回所有扩展信息
};

/// 搜索POI返回结果控制 @since 9.4.0
typedef NS_OPTIONS(NSUInteger, AMapPOISearchShowFieldsType)
{
    AMapPOISearchShowFieldsTypeNone          = 1 << 0, ///< 不返回扩展信息
    AMapPOISearchShowFieldsTypeChildren      = 1 << 1, ///< 返回子POI信息
    AMapPOISearchShowFieldsTypeBusiness      = 1 << 2, ///< 返回商业信息
    AMapPOISearchShowFieldsTypeIndoor        = 1 << 3, ///< 返回室内相关信息
    AMapPOISearchShowFieldsTypeNavi          = 1 << 4, ///< 返回导航位置相关信息
    AMapPOISearchShowFieldsTypePhotos        = 1 << 5, ///< 返回poi图片相关信息
    AMapPOISearchShowFieldsTypeAll           = ~0UL,   ///< 返回所有扩展信息
};

///距离测量类型 @since 7.7.0
typedef NS_ENUM(NSInteger, AMapDistanceSearchType)
{
    AMapDistanceSearchTypeStraight        = 0, ///< 直线距离
    AMapDistanceSearchTypeDrive           = 1, ///< 驾车导航距离
    AMapDistanceSearchTypeWalk            = 3, ///< 步行导航距离
};

#pragma mark - AMapPOISearchBaseRequest

///POI搜索请求基类
@interface AMapPOISearchBaseRequest : AMapSearchObject
///类型，多个类型用“|”分割 可选值:文本分类、分类代码
@property (nonatomic, copy)   NSString  *types;
///排序规则, 0-距离排序；1-综合排序, 默认0
@property (nonatomic, assign) NSInteger  sortrule;
///每页记录数, 范围1-25, [default = 10]
@property (nonatomic, assign) NSInteger  offset;
///当前页数, 范围1-100, [default = 1]
@property (nonatomic, assign) NSInteger  page;
///设置需要返回的扩展信息，默认为AMapPOISearchShowFieldsTypeNone，只返回基础信息字段
@property (nonatomic, assign) AMapPOISearchShowFieldsType  showFieldsType;
@end

///POI ID搜索请求
@interface AMapPOIIDSearchRequest : AMapPOISearchBaseRequest
///poi唯一标识，最多可以传入10个id，多个id之间用“|”分隔。必填
@property (nonatomic, copy) NSString *uid; 
@end

///POI关键字搜索
@interface AMapPOIKeywordsSearchRequest : AMapPOISearchBaseRequest
///查询关键字，多个关键字用“|”分割
@property (nonatomic, copy)   NSString *keywords; 
///查询城市，可选值：cityname（中文或中文全拼）、citycode、adcode.(注：台湾省的城市一律设置为【台湾】，不具体到市。)
@property (nonatomic, copy)   NSString *city;
///强制城市限制功能 默认NO，例如：在上海搜索天安门，如果citylimit为true，将不返回北京的天安门相关的POI
@property (nonatomic, assign) BOOL cityLimit;
///设置后，如果sortrule==0，则返回结果会按照距离此点的远近来排序,since 5.2.1
@property (nonatomic, strong) AMapGeoPoint *location;

@end

///POI周边搜索
@interface AMapPOIAroundSearchRequest : AMapPOISearchBaseRequest
///查询关键字，多个关键字用“|”分割。可选
@property (nonatomic, copy)   NSString     *keywords; 
///中心点坐标
@property (nonatomic, copy)   AMapGeoPoint *location; 
///查询半径，范围：0-50000，单位：米 [default = 3000]
@property (nonatomic, assign) NSInteger     radius;
///查询城市，可选值：cityname（中文或中文全拼）、citycode、adcode。注：当用户指定的经纬度和city出现冲突，若范围内有用户指定city的数据，则返回相关数据，否则返回为空。（since 5.7.0）
@property (nonatomic, copy)   NSString     *city;
@end

///POI多边形搜索
@interface AMapPOIPolygonSearchRequest : AMapPOISearchBaseRequest
///查询关键字，多个关键字用“|”分割。可选
@property (nonatomic, copy) NSString       *keywords; 
///多边形区域，多个坐标对集合，坐标对用"|"分割。多边形为矩形时，可传入左上右下两顶点坐标对；其他情况下首尾坐标对需相同。必填
@property (nonatomic, copy) AMapGeoPolygon *polygon; 
@end

///POI搜索返回
@interface AMapPOISearchResponse : AMapSearchObject
///返回的POI数目
@property (nonatomic, assign) NSInteger       count; 
///关键字建议列表和城市建议列表
@property (nonatomic, strong) AMapSuggestion *suggestion; 
///POI结果，AMapPOI 数组
@property (nonatomic, strong) NSArray<AMapPOI *> *pois;
@end

#pragma mark - AMapPOIRouteSearchRequest
///沿途搜索, 注意起点和终点不能相距太远(大概70公里)，否则可能搜索结果为空
@interface AMapRoutePOISearchRequest : AMapSearchObject
///中心点坐标
@property (nonatomic, copy)   AMapGeoPoint *origin; 
///目标点坐标
@property (nonatomic, copy)   AMapGeoPoint *destination; 
///搜索类型
@property (nonatomic, assign) AMapRoutePOISearchType searchType; 
///驾车导航策略，同驾车路径规划请求的策略（5 多策略除外）
@property (nonatomic, assign) NSInteger strategy;
///道路周围搜索范围,单位米,[0-500]，默认250。
@property (nonatomic, assign) NSInteger range;
///用户自己规划的路线,在origine、destination未填入时为必填.格式为:"经度,维度;经度,维度;...". 目前限制个数最多为100个点
@property (nonatomic, strong) NSString *polylineStr;
///用户自己规划的路线,在origine、destination未填入且polylineStr未填入时为必填. 目前限制个数最多为100个点
@property (nonatomic, strong) NSArray<AMapGeoPoint*> *polyline;

@end

///沿途搜索返回
@interface AMapRoutePOISearchResponse : AMapSearchObject
///返回的POI数目
@property (nonatomic, assign) NSInteger count; 
///POI结果，AMapRoutePOI 数组
@property (nonatomic, strong) NSArray<AMapRoutePOI *> *pois; 
@end

#pragma mark - AMapInputTipsSearchRequest

///搜索提示请求
@interface AMapInputTipsSearchRequest : AMapSearchObject
///查询关键字
@property (nonatomic, copy)   NSString *keywords; 
///查询城市，可选值：cityname（中文或中文全拼）、citycode、adcode.
@property (nonatomic, copy)   NSString *city; 
///类型，多个类型用“|”分割 可选值:文本分类、分类代码
@property (nonatomic, copy)   NSString *types; 
///强制城市限制功能，例如：在上海搜索天安门，如果citylimit为true，将不返回北京的天安门相关的POI
@property (nonatomic, assign) BOOL cityLimit;
///格式形如：@"116.481488,39.990464",(经度,纬度)，不可以包含空格。如果设置，在此location附近优先返回搜索关键词信息, since 5.0.0
@property (nonatomic, copy) NSString *location;
@end

///搜索提示返回
@interface AMapInputTipsSearchResponse : AMapSearchObject
///返回数目
@property (nonatomic, assign) NSInteger  count; 
///提示列表 AMapTip 数组， AMapTip 有多种属性，可根据该对象的返回信息，配合其他搜索服务使用，完善您应用的功能。如：\n 1）uid为空，location为空，该提示语为品牌词，可根据该品牌词进行POI关键词搜索。\n 2）uid不为空，location为空，为公交线路，根据uid进行公交线路查询。\n 3）uid不为空，location也不为空，是一个真实存在的POI，可直接显示在地图上。
@property (nonatomic, strong) NSArray<AMapTip *> *tips; 
@end

#pragma mark - AMapGeocodeSearchRequest

///地理编码请求
@interface AMapGeocodeSearchRequest : AMapSearchObject
///地址
@property (nonatomic, copy) NSString *address;
///查询城市，可选值：cityname（中文或中文全拼）、citycode、adcode.
@property (nonatomic, copy) NSString *city;
///指定查询国家，支持多个国家，用“|”分隔，可选值：国家代码ISO 3166 或 global，仅海外生效（since 7.4.0）
@property (nonatomic, copy) NSString *country;
@end

///地理编码返回
@interface AMapGeocodeSearchResponse : AMapSearchObject
///返回数目
@property (nonatomic, assign) NSInteger  count; 
///地理编码结果 AMapGeocode 数组
@property (nonatomic, strong) NSArray<AMapGeocode *> *geocodes; 
@end


#pragma mark - AMapReGeocodeSearchRequest

///逆地理编码请求
@interface AMapReGeocodeSearchRequest : AMapSearchObject
///是否返回扩展信息，默认NO。
@property (nonatomic, assign) BOOL          requireExtension; 
///中心点坐标。
@property (nonatomic, copy)   AMapGeoPoint *location; 
///查询半径，单位米，范围0~3000，默认1000。
@property (nonatomic, assign) NSInteger     radius;
///指定返回结果poi数组中的POI类型，在requireExtension=YES时生效。输入为typecode, 支持传入多个typecode, 多值时用“|”分割
@property (nonatomic, copy) NSString *poitype;
///distance 按距离返回,score 按权重返回，仅海外生效（since 7.4.0）
@property (nonatomic, copy) NSString *mode;

@end

///逆地理编码返回
@interface AMapReGeocodeSearchResponse : AMapSearchObject
///逆地理编码结果
@property (nonatomic, strong) AMapReGeocode *regeocode; 
@end

#pragma mark - AMapBusStopSearchRequest

///公交站点请求
@interface AMapBusStopSearchRequest : AMapSearchObject
///查询关键字
@property (nonatomic, copy)   NSString  *keywords; 
///城市 可选值：cityname（中文或中文全拼）、citycode、adcode
@property (nonatomic, copy)   NSString  *city; 
///每页记录数，默认为20，取值为：1-50
@property (nonatomic, assign) NSInteger  offset; 
///当前页数，默认值为1，取值为：1-100
@property (nonatomic, assign) NSInteger  page; 
@end

///公交站点返回
@interface AMapBusStopSearchResponse : AMapSearchObject
///公交站数目
@property (nonatomic, assign) NSInteger       count; 
///关键字建议列表和城市建议列表
@property (nonatomic, strong) AMapSuggestion *suggestion; 
///公交站点数组，数组中存放AMapBusStop对象
@property (nonatomic, strong) NSArray<AMapBusStop *> *busstops; 
@end

#pragma mark - AMapBusLineSearchRequest

///公交线路查询请求基类，不可直接调用
@interface AMapBusLineBaseSearchRequest : AMapSearchObject
///城市 可选值：cityname（中文或中文全拼）、citycode、adcode
@property (nonatomic, copy)   NSString  *city; 
///是否返回扩展信息，默认为NO
@property (nonatomic, assign) BOOL       requireExtension; 
///每页记录数，默认为20，取值为1－50
@property (nonatomic, assign) NSInteger  offset; 
///当前页数，默认为1，取值为1-100
@property (nonatomic, assign) NSInteger  page; 
@end

///公交站线路根据名字请求
@interface AMapBusLineNameSearchRequest : AMapBusLineBaseSearchRequest
///查询关键字
@property (nonatomic, copy) NSString *keywords; 
@end

///公交站线路根据ID请求
@interface AMapBusLineIDSearchRequest : AMapBusLineBaseSearchRequest
///唯一标识
@property (nonatomic, copy) NSString *uid;
@end

///公交站线路返回
@interface AMapBusLineSearchResponse : AMapSearchObject
///返回公交站数目
@property (nonatomic, assign) NSInteger       count; 
///关键字建议列表和城市建议列表
@property (nonatomic, strong) AMapSuggestion *suggestion; 
///公交线路数组，数组中存放 AMapBusLine 对象
@property (nonatomic, strong) NSArray<AMapBusLine *> *buslines; 
@end

#pragma mark - AMapDistrictSearchRequest
///行政区划查询请求
@interface AMapDistrictSearchRequest : AMapSearchObject
///查询关键字，只支持单关键字搜索，全国范围
@property (nonatomic, copy)   NSString *keywords;
///是否返回边界坐标，默认NO
@property (nonatomic, assign) BOOL      requireExtension; 
///是否显示商圈信息，默认NO。注：已废弃，行政区划搜索无商圈信息。
@property (nonatomic, assign) BOOL      showBusinessArea __attribute__((deprecated("已废弃, from 5.3.0")));;
///每页记录数, 范围1-50, [default = 20]
@property (nonatomic, assign) NSInteger  offset;
///当前页数, 范围1-100, [default = 1]
@property (nonatomic, assign) NSInteger  page;
///子区域层级，默认1。规则：设置显示下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县、乡镇/街道多级数据）可选值：0、1、2、3等数字，0-不返回下级行政区；1-返回下一级行政区；2-返回下两级行政区；3-返回下三级行政区
@property (nonatomic, assign) NSInteger subdistrict;

@end

///行政区划响应
@interface AMapDistrictSearchResponse : AMapSearchObject
///返回数目
@property (nonatomic, assign) NSInteger  count; 
///行政区域 AMapDistrict 数组
@property (nonatomic, strong) NSArray<AMapDistrict *> *districts; 
@end

#pragma mark - AMapRouteSearchBaseRequest

///路径规划基础类，不可直接调用
@interface AMapRouteSearchBaseRequest : AMapSearchObject
///出发点
@property (nonatomic, copy) AMapGeoPoint *origin; 
///目的地
@property (nonatomic, copy) AMapGeoPoint *destination; 
@end

#pragma mark - AMapDrivingCalRouteSearchRequest

///驾车路径规划2.0
@interface AMapDrivingCalRouteSearchRequest : AMapRouteSearchBaseRequest
/**
 驾车导航策略，默认策略为32。
    32：默认，高德推荐，同高德地图APP默认
    33：躲避拥堵
    34：高速优先
    35：不走高速
    36：少收费
    37：大路优先
    38：速度最快
    39：躲避拥堵＋高速优先
    40：躲避拥堵＋不走高速
    41：躲避拥堵＋少收费
    42：少收费＋不走高速
    43：躲避拥堵＋少收费＋不走高速
    44：躲避拥堵＋大路优先
    45：躲避拥堵＋速度最快
 */
@property (nonatomic, assign) NSInteger strategy;
///途经点 AMapGeoPoint 数组，目前最多支持16个途经点
@property (nonatomic, copy) NSArray<AMapGeoPoint *> *waypoints;
///避让区域 AMapGeoPolygon 数组，目前最多支持100个避让区域，每个区域16个点
@property (nonatomic, copy) NSArray<AMapGeoPolygon *> *avoidpolygons;
///避让道路名
@property (nonatomic, copy) NSString *avoidroad;
///出发点 POI ID
@property (nonatomic, copy) NSString *originId;
///目的地 POI ID
@property (nonatomic, copy) NSString *destinationId;
///出发点POI类型编码，此值可以辅助更精准的起点算路，0：普通道路、1：高架上、2：高架下、3：主路、4：辅路、5：隧道、7：环岛、9：停车场内部
@property (nonatomic, copy) NSString *origintype;
///目的地POI类型编码
@property (nonatomic, copy) NSString *destinationtype;
///车牌信息，如京AHA322，支持6位传统车牌和7位新能源车牌，用于判断是否限行
@property (nonatomic, copy) NSString *plate;
///使用轮渡,0使用1不使用,默认为0使用
@property (nonatomic, assign) NSInteger ferry;
/**
 驾车路径规划车辆类型，默认策略为0。
 0：普通汽车(默认值);
 1：纯电动车;
 2：插电混动车
 */
@property (nonatomic, assign) NSInteger cartype;
///设置需要返回的扩展信息，默认为AMapDrivingRouteShowFieldTypeNone，只返回基础信息字段
@property (nonatomic, assign) AMapDrivingRouteShowFieldType showFieldType;

@end

#pragma mark - AMapWalkingRouteSearchRequest

///步行路径规划
@interface AMapWalkingRouteSearchRequest : AMapRouteSearchBaseRequest
///是否提供备选步行方案([default = 0])0-只提供一条步行方案; 1-提供备选步行方案(有可能无备选方案)
@property (nonatomic, assign) NSInteger multipath __attribute__((deprecated("已废弃, from 5.0.0")));

///是否需要室内算路. 0 : 不需要 (默认值); 1 : 需要
@property (nonatomic, assign) NSInteger isindoor;
///返回路线条数, 0: 默认返回一条路线方案; 1 : 多备选路线中第一条路线;  2 : 多备选路线中前两条路线; 3 : 多备选路线中三条路线
@property (nonatomic, assign) NSInteger alternativeRoute;
///设置需要返回的扩展信息，默认为AMapPOISearchShowFieldsTypeNone，只返回基础信息字段
@property (nonatomic, assign) AMapWalkingRouteShowFieldType showFieldsType;
@end

#pragma mark - AMapTransitRouteSearchRequest

///公交路径规划
@interface AMapTransitRouteSearchRequest : AMapRouteSearchBaseRequest
///公交换乘策略([default = 0])
/*
0：推荐模式，综合权重，同高德APP默认
1：最经济模式，票价最低
2：最少换乘模式，换乘次数少
3：最少步行模式，尽可能减少步行距离
4：最舒适模式，尽可能乘坐空调车
5：不乘地铁模式，不乘坐地铁路线
6：地铁图模式，起终点都是地铁站（地铁图模式下originpoi及destinationpoi为必填项）
7：地铁优先模式，步行距离不超过4KM
8：时间短模式，方案花费总时间最少
 */
@property (nonatomic, assign) NSInteger strategy; 
///起点所在城市, 必填. 仅支持citycode
@property (nonatomic, copy)   NSString *city;
///目的地所在城市, 必填. 仅支持citycode，与city相同时代表同城，不同时代表跨城
@property (nonatomic, copy)   NSString *destinationCity; 
///是否包含夜班车，默认为 NO
@property (nonatomic, assign) BOOL nightflag;
///起点POI ID
@property (nonatomic, copy)   NSString *originPOI;
///目的地POI ID
@property (nonatomic, copy)   NSString *destinationPOI;
///起点所在行政区域编码
@property (nonatomic, copy)   NSString *adcode;
///终点所在行政区域编码
@property (nonatomic, copy)   NSString *destinationAdcode;
///返回方案条数 可传入1-10的阿拉伯数字，代表返回的不同条数。默认值：5
@property (nonatomic, assign) NSInteger alternativeRoute;
/// 是否返回所有地铁出入口，默认为NO
@property (nonatomic, assign) BOOL multiExport;
/// 最大换乘次数 0：直达 1：最多换乘1次 2：最多换乘2次 3：最多换乘3次 4：最多换乘4次。默认值：4
@property (nonatomic, assign) NSInteger maxTrans;
///请求日期 例如:2013-10-28
@property (nonatomic, copy)   NSString *date;
///请求时间 例如:9-54
@property (nonatomic, copy)   NSString *time;
///返回结果控制
@property (nonatomic, assign) AMapTransitRouteShowFieldsType showFieldsType;
@end

#pragma mark - AMapRidingRouteSearchRequest

///骑行路径规划
@interface AMapRidingRouteSearchRequest : AMapRouteSearchBaseRequest
///返回结果控制
@property (nonatomic, assign) AMapRidingRouteShowFieldsType showFieldsType;
@end

///路径规划返回
@interface AMapRouteSearchResponse : AMapSearchObject
///路径规划信息数目
@property (nonatomic, assign) NSInteger count; 
///路径规划信息
@property (nonatomic, strong) AMapRoute *route; 
@end

///骑行路径规划返回
@interface AMapRidingRouteSearchResponse : AMapRouteSearchResponse
@end

#pragma mark - AMapTruckRouteSearchRequest

///货车路径规划（since 6.1.0）
@interface AMapTruckRouteSearchRequest : AMapRouteSearchBaseRequest

/**
 驾车导航策略，默认为策略1。
    1，返回的结果考虑路况，尽量躲避拥堵而规划路径，与高德地图的“躲避拥堵”策略一致；
    2，返回的结果不走高速，与高德地图“不走高速”策略一致；
    3，返回的结果尽可能规划收费较低甚至免费的路径，与高德地图“避免收费”策略一致；
    4，返回的结果考虑路况，尽量躲避拥堵而规划路径，并且不走高速，与高德地图的“躲避拥堵&不走高速”策略一致；
    5，返回的结果尽量不走高速，并且尽量规划收费较低甚至免费的路径结果，与高德地图的“避免收费&不走高速”策略一致；
    6，返回路径规划结果会尽量的躲避拥堵，并且规划收费较低甚至免费的路径结果，与高德地图的“躲避拥堵&避免收费”策略一致；
    7，返回的结果尽量躲避拥堵，规划收费较低甚至免费的路径结果，并且尽量不走高速路，与高德地图的“避免拥堵&避免收费&不走高速”策略一致；
    8，返回的结果会优先选择高速路，与高德地图的“高速优先”策略一致；
    9，返回的结果会优先考虑高速路，并且会考虑路况躲避拥堵，与高德地图的“躲避拥堵&高速优先”策略一致。
 */
@property (nonatomic, assign) NSInteger strategy;
///途经点 AMapGeoPoint 数组，最多支持16个途经点
@property (nonatomic, copy) NSArray<AMapGeoPoint *> *waypoints;
///出发点 POI ID
@property (nonatomic, copy) NSString *originId;
///目的地 POI ID
@property (nonatomic, copy) NSString *destinationId;
///出发点POI类型编码
@property (nonatomic, copy) NSString *origintype;
///目的地POI类型编码
@property (nonatomic, copy) NSString *destinationtype;
///车牌省份，用汉字填入车牌省份缩写。用于判断是否限行
@property (nonatomic, copy) NSString *plateProvince;
///车牌详情,填入除省份及标点之外的字母和数字（需大写）。用于判断是否限行。
@property (nonatomic, copy) NSString *plateNumber;
///货车大小，默认为 轻型车（AMapTruckSizeTypeLight）
@property (nonatomic, assign) AMapTruckSizeType size;
///车辆高度，单位米，取值[0 – 25.5]米，默认 1.6 米
@property (nonatomic, assign) CGFloat height;
///车辆宽度，单位米，取值[0 – 25.5]米，默认 2.5 米
@property (nonatomic, assign) CGFloat width;
///车辆总重，单位吨，取值[0 – 6553.5]吨，默认 0.9 吨
@property (nonatomic, assign) CGFloat load;
///货车核定载重，单位吨，取值[0 – 6553.5]吨，默认 10 吨
@property (nonatomic, assign) CGFloat weight;
///车辆轴数，单位个，取值[0 –255]个，默认 2个轴
@property (nonatomic, assign) NSInteger axis;
///是否返回扩展信息，默认为 NO （since 7.6.0）
@property (nonatomic, assign) BOOL requireExtension;
@end

#pragma mark - AMapDistanceSearchRequest

///距离查询请求（since 6.1.0）
@interface AMapDistanceSearchRequest : AMapSearchObject
///起点坐标数组，最多支持100个点。
@property (nonatomic, strong) NSArray<AMapGeoPoint *> *origins;
///终点坐标
@property (nonatomic, strong) AMapGeoPoint *destination;
///路径计算的类型，当type为导航距离时，会考虑路况，故在不同时间请求返回结果可能不同；
@property (nonatomic, assign) AMapDistanceSearchType type;
///驾车距离测量策略，参考驾车路径规划。仅当type为AMapDistanceSearchTypeDrive时有效，默认4
@property (nonatomic, assign) NSInteger strategy;
///是否返回扩展信息，默认为 NO （since 7.6.0）
@property (nonatomic, assign) BOOL requireExtension;
@end

///距离查询结果（since 6.1.0）
@interface AMapDistanceSearchResponse : AMapSearchObject
///距离查询结果 AMapDistanceResult 数组。
@property (nonatomic, strong) NSArray<AMapDistanceResult *> *results;

@end

#pragma mark - AMapWeatherSearchRequest

///天气查询请求
@interface AMapWeatherSearchRequest : AMapSearchObject
///城市名称，支持cityname及adcode
@property (nonatomic, copy)   NSString        *city; 
///气象类型，Live为实时天气，Forecast为后三天预报天气，默认为Live
@property (nonatomic, assign) AMapWeatherType  type; 
@end

///天气查询返回
@interface AMapWeatherSearchResponse : AMapSearchObject
///实时天气数据信息 AMapLocalWeatherLive 数组，仅在请求实时天气时有返回。
@property (nonatomic, strong) NSArray<AMapLocalWeatherLive *> *lives; 
///预报天气数据信息 AMapLocalWeatherForecast 数组，仅在请求预报天气时有返回
@property (nonatomic, strong) NSArray<AMapLocalWeatherForecast *> *forecasts; 

@end

#pragma mark - AMapNearbySearchRequest
///附近搜索请求
@interface AMapNearbySearchRequest : AMapSearchObject
///中心点坐标
@property (nonatomic, copy)   AMapGeoPoint *center; 
///查询半径，范围：[0, 10000]，单位：米 [default = 1000]
@property (nonatomic, assign) NSInteger radius; 
///搜索距离类型，默认为直线距离
@property (nonatomic, assign) AMapNearbySearchType searchType; 
///检索时间范围，超过24小时的数据无法返回，范围[5, 24*60*60] 单位：秒 [default = 1800]
@property (nonatomic, assign) NSInteger timeRange; 
///返回条数，范围[1, 100], 默认30
@property (nonatomic, assign) NSInteger limit; 
@end

///附近搜索返回
@interface AMapNearbySearchResponse : AMapSearchObject
///结果总条数
@property (nonatomic, assign) NSInteger count; 
///周边用户信息 AMapNearbyUserInfo 数组
@property (nonatomic, strong) NSArray<AMapNearbyUserInfo *> *infos; 
@end

#pragma mark - AMapCloudSearchBaseRequest

///企业地图搜索请求基类
@interface AMapCloudSearchBaseRequest : AMapSearchObject
///要查询的表格ID, 必选
@property (nonatomic, copy) NSString *tableID;
///筛选条件数组, 可选, 说明：\n 1.支持建立索引的字段根据多个条件筛选，多个条件用双&符号连接;\n 2.判断符合支持:>= 大于等于，<= 小于等于，>大于，<小于，= 精确匹配(text索引不可用);\n 3.示例规则：key1=value1&&key2=value2&&lastloctime>=1469817532，示例："name=王师傅|张师傅&&lastloctime>=1469817532
@property (nonatomic, strong) NSArray<NSString *> *filter;
///排序字段名, 可选.\n 说明：\n 1.支持按建立了排序筛选索引的整数或小数字段进行排序：sortFields = "字段名"；\n 2.系统预设的字段(忽略sortType)：_distance：坐标与中心点距离升序排序，仅在周边检索时有效（若其它请求使用会异常返回）；_weight：权重降序排序，当存在keywords时有效；\n；
@property (nonatomic, copy) NSString *sortFields;
///可选, 排序方式(默认升序)
@property (nonatomic, assign) AMapCloudSortType sortType;
///可选, 每页记录数(每页最大记录数100, 默认20)
@property (nonatomic, assign) NSInteger offset;
///可选, 当前页数(>=1, 默认1)
@property (nonatomic, assign) NSInteger page;
@end

#pragma mark - AMapCloudPlaceAroundSearchRequest

///企业地图周边搜请求
@interface AMapCloudPOIAroundSearchRequest : AMapCloudSearchBaseRequest
///必填，中心点坐标。
@property (nonatomic, copy)   AMapGeoPoint *center;
///可选，查询半径（默认值为3000），单位：米
@property (nonatomic, assign) NSInteger     radius;
///可选，搜索关键词。\n 说明：1. 只支持建立过文本索引的字段查询/n 2.支持关键字模糊检索，即对建立【文本索引字段】对应列内容进行模糊检索；如keywords=工商银行，检索返回已建立文本索引列值中包含“工商”或者“银行”或者“工商银行”关键字的POI结果集。/n 3.支持关键字多值模糊检索；如keywords=招商银行&&华夏银行&&工商银行，检索返回已建立索引列值中包含“招商银行”或者“华夏银行”或者“工商银行”的POI结果集，不会返回检索词切分后，如仅包含“招商”或者“银行”的POI集
@property (nonatomic, copy) NSString *keywords;
@end

///企业地图polygon区域查询请求
@interface AMapCloudPOIPolygonSearchRequest : AMapCloudSearchBaseRequest
///必填，多边形。
@property (nonatomic, copy) AMapGeoPolygon *polygon;
///可选，搜索关键词。\n 说明：1. 只支持建立过文本索引的字段查询/n 2.支持关键字模糊检索，即对建立【文本索引字段】对应列内容进行模糊检索；如keywords=工商银行，检索返回已建立文本索引列值中包含“工商”或者“银行”或者“工商银行”关键字的POI结果集。/n 3.支持关键字多值模糊检索；如keywords=招商银行&&华夏银行&&工商银行，检索返回已建立索引列值中包含“招商银行”或者“华夏银行”或者“工商银行”的POI结果集，不会返回检索词切分后，如仅包含“招商”或者“银行”的POI集
@property (nonatomic, copy) NSString *keywords;
@end

///企业地图ID查询请求
@interface AMapCloudPOIIDSearchRequest : AMapCloudSearchBaseRequest
///必填,POI的ID
@property (nonatomic, assign) NSInteger uid; 
@end

///企业地图本地查询请求
@interface AMapCloudPOILocalSearchRequest : AMapCloudSearchBaseRequest
///可选，搜索关键词。\n 说明：1. 只支持建立过文本索引的字段查询/n 2.支持关键字模糊检索，即对建立【文本索引字段】对应列内容进行模糊检索；如keywords=工商银行，检索返回已建立文本索引列值中包含“工商”或者“银行”或者“工商银行”关键字的POI结果集。/n 3.支持关键字多值模糊检索；如keywords=招商银行&&华夏银行&&工商银行，检索返回已建立索引列值中包含“招商银行”或者“华夏银行”或者“工商银行”的POI结果集，不会返回检索词切分后，如仅包含“招商”或者“银行”的POI集
@property (nonatomic, copy) NSString *keywords;
///必填，城市名称\n 说明：\n 1. 支持全国/省/市/区县行政区划范围的检索；\n 2. city = "全国"，即对用户全表搜索；\n 3. 当city值设置非法或不正确时，按照 city = "全国"返回。
@property (nonatomic, copy) NSString *city; 
@end

///企业地图搜索返回
@interface AMapCloudPOISearchResponse : AMapSearchObject
///返回结果总数目
@property (nonatomic, assign) NSInteger  count; 
///返回的结果, AMapCloudPOI 数组
@property (nonatomic, strong) NSArray<AMapCloudPOI *>   *POIs; 

@end

#pragma mark - AMapShareSearchBaseRequest

///短串分享搜索请求基类, 请使用具体的子类。
@interface AMapShareSearchBaseRequest : AMapSearchObject
@end

///位置短串分享请求
@interface AMapLocationShareSearchRequest : AMapShareSearchBaseRequest
///必填, 位置坐标
@property (nonatomic, copy) AMapGeoPoint *location; 
///位置名称，请不要包含【,%&@#】等特殊符号
@property (nonatomic, copy) NSString     *name;
@end

///兴趣点短串分享请求
@interface AMapPOIShareSearchRequest : AMapShareSearchBaseRequest
///POI的ID，如果有ID则指定POI，否则按name查询。
@property (nonatomic, copy) NSString     *uid; 
///坐标
@property (nonatomic, copy) AMapGeoPoint *location; 
///名称，请不要包含【,%&@#】等特殊符号。
@property (nonatomic, copy) NSString     *name; 
///地址，请不要包含【,%&@#】等特殊符号。
@property (nonatomic, copy) NSString     *address; 
@end

///路径规划短串分享请求
@interface AMapRouteShareSearchRequest : AMapShareSearchBaseRequest
///默认为0\n 驾车:0-速度最快（时间）;\n 1-避免收费（不走收费路段的最快道路）;\n 2-距离优先;\n 3-不走高速;\n 4-结合实时交通（躲避拥堵）;\n 5-不走高速且避免收费;\n 6-不走高速且躲避拥堵;\n 7-躲避收费和拥堵;\n 8-不走高速且躲避收费和拥堵\n\n 公交:0-最快捷;\n 1-最经济;\n 2-最少换乘;\n 3-最少步行;\n 4-最舒适;\n 5-不乘地铁;\n\n 步行，无策略，均一样
@property (nonatomic, assign) NSInteger     strategy; 
///Route的type，默认为0，超出范围为0.\n 0为驾车，\n 1为公交，\n 2为步行
@property (nonatomic, assign) NSInteger     type;
///起点坐标
@property (nonatomic, copy)   AMapGeoPoint *startCoordinate; 
///终点坐标
@property (nonatomic, copy)   AMapGeoPoint *destinationCoordinate; 
///起点名称，默认为“已选择的位置”，请不要包含【,%&@#】等特殊符号
@property (nonatomic, copy)   NSString     *startName; 
///终点名称，默认为“已选择的位置”，请不要包含【,%&@#】等特殊符号
@property (nonatomic, copy)   NSString     *destinationName; 
@end

///导航短串分享请求
@interface AMapNavigationShareSearchRequest : AMapShareSearchBaseRequest

///默认为0，超出范围为0\n 驾车:0-速度最快（时间）;\n 1-避免收费（不走收费路段的最快道路）;\n 2-距离优先;\n 3-不走高速;\n 4-结合实时交通（躲避拥堵）;\n 5-不走高速且避免收费;\n 6-不走高速且躲避拥堵;\n 7-躲避收费和拥堵;\n 8-不走高速且躲避收费和拥堵
@property (nonatomic, assign) NSInteger     strategy; 
///起点坐标，若跳转到高德地图，默认更换为定位坐标
@property (nonatomic, copy)   AMapGeoPoint *startCoordinate; 
///终点坐标
@property (nonatomic, copy)   AMapGeoPoint *destinationCoordinate; 
@end

///导航短串分享响应
@interface AMapShareSearchResponse : AMapSearchObject
///转换后的短串
@property (nonatomic, copy) NSString *shareURL; 
@end

///未来路线规划（since 6.9.0）
@interface AMapFutureRouteSearchRequest : AMapRouteSearchBaseRequest
///出发时间 单位为秒
@property (nonatomic, copy) NSString *beginTime;
///时间间隔 单位为秒
@property (nonatomic, assign) NSInteger interval;
///时间点个数,最多48个
@property (nonatomic, assign) NSInteger timeCount;
/**
 未来路线规划策略，默认策略为0。
 1，返回的结果考虑路况，尽量躲避拥堵而规划路径，与高德地图的“躲避拥堵”策略一致
 2，返回的结果不走高速，与高德地图“不走高速”策略一致
 3，返回的结果尽可能规划收费较低甚至免费的路径，与高德地图“避免收费”策略一致
 4，返回的结果考虑路况，尽量躲避拥堵而规划路径，并且不走高速，与高德地图的“躲避拥堵&不走高速”策略一致
 5，返回的结果尽量不走高速，并且尽量规划收费较低甚至免费的路径结果，与高德地图的“避免收费&不走高速”策略一致
 6，返回路径规划结果会尽量的躲避拥堵，并且规划收费较低甚至免费的路径结果，与高德地图的“躲避拥堵&避免收费”策略一致
 7，返回的结果尽量躲避拥堵，规划收费较低甚至免费的路径结果，并且尽量不走高速路，与高德地图的“避免拥堵&避免收费&不走高速”策略一致
 8，返回的结果会优先选择高速路，与高德地图的“高速优先”策略一致
 9，返回的结果会优先考虑高速路，并且会考虑路况躲避拥堵，与高德地图的“躲避拥堵&高速优先”策略一致
 10，不考虑路况，返回速度最优、耗时最短的路线，但是此路线不一定距离最短
 11，避让拥堵&速度优先&避免收费
 */
@property (nonatomic, assign) NSInteger strategy;
///出发点 POI ID
@property (nonatomic, copy) NSString *originId;
///目的地 POI ID
@property (nonatomic, copy) NSString *destinationId;
///出发点POI类型编码
@property (nonatomic, copy) NSString *origintype;
///目的地POI类型编码
@property (nonatomic, copy) NSString *destinationtype;
///终点的父POI ID
@property (nonatomic, copy) NSString *parentId;

/////是否返回扩展信息，默认为 NO
//@property (nonatomic, assign) BOOL requireExtension;
///车牌省份，用汉字填入车牌省份缩写。用于判断是否限行
@property (nonatomic, copy) NSString *plateProvince;
///车牌详情,填入除省份及标点之外的字母和数字（需大写）。用于判断是否限行。
@property (nonatomic, copy) NSString *plateNumber;
/**
 驾车路径规划车辆类型，默认策略为0。
 0：普通汽车(默认值);
 1：纯电动车;
 2：插电混动车
 */
@property (nonatomic, assign) NSInteger cartype;
@end

///未来路线规划（since 6.9.0）
@interface AMapFutureRouteSearchResponse : AMapSearchObject
///路径规划方案,只会返回AMapPath中的distance、totalTrafficLights、steps
@property (nonatomic, strong) NSArray<AMapPath *> *paths;
///不同时间的规划以及信息列表
@property (nonatomic, strong) NSArray<AMapFutureTimeInfo *> *timeInfos;
@end
