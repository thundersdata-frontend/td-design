//
//  AMapCommonObj.h
//  AMapSearchKit
//
//  Created by xiaoming han on 15/7/22.
//  Copyright (c) 2015年 Amap. All rights reserved.
//

/* 该文件定义了搜索结果的基础数据类型。*/

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#pragma mark - AMapSearchObject

///搜索SDK基础类, 通用数据结构和response支持copy和coding（since 4.4.1）。
@interface AMapSearchObject : NSObject<NSCopying, NSCoding>

/**
 * @brief 返回格式化的描述信息。通用数据结构和response类型有效。
 */
- (NSString *)formattedDescription;

@end

#pragma mark - 通用数据结构

///经纬度, description中格式为 <经度,纬度>
@interface AMapGeoPoint : AMapSearchObject
///纬度（垂直方向）
@property (nonatomic, assign) CGFloat latitude;
///经度（水平方向）
@property (nonatomic, assign) CGFloat longitude;

/**
 * @brief 实例化一个AMapGeoPoint对象
 * @param lat 纬度
 * @param lon 经度
 */
+ (AMapGeoPoint *)locationWithLatitude:(CGFloat)lat longitude:(CGFloat)lon;
@end

///多边形, 当传入两个点的时候，当做矩形处理:左下-右上两个顶点；其他情况视为多边形，几个点即为几边型。
@interface AMapGeoPolygon : AMapSearchObject
///坐标集, AMapGeoPoint 数组
@property (nonatomic, strong) NSArray<AMapGeoPoint *> *points;

/**
 * @brief 实例化一个多边形对象
 * @param points 坐标集, AMapGeoPoint 数组
 */
+ (AMapGeoPolygon *)polygonWithPoints:(NSArray *)points;
@end

@class AMapDistrict;
///城市
@interface AMapCity : AMapSearchObject
///城市名称
@property (nonatomic, copy) NSString  *city;
///城市编码
@property (nonatomic, copy) NSString  *citycode;
///城市区域编码
@property (nonatomic, copy) NSString  *adcode;
///此区域的建议结果数目, AMapSuggestion 中使用
@property (nonatomic, assign) NSInteger  num;
///途径区域 AMapDistrict 数组，AMepStep中使用，只有name和adcode。
@property (nonatomic, strong) NSArray<AMapDistrict *> *districts;
@end

///建议信息
@interface AMapSuggestion : AMapSearchObject
///NSString 数组
@property (nonatomic, strong) NSArray<NSString *> *keywords;
///AMapCity 数组
@property (nonatomic, strong) NSArray<AMapCity *> *cities;
@end

#pragma mark - 输入提示

///输入提示
@interface AMapTip : AMapSearchObject
///poi的id
@property (nonatomic, copy) NSString *uid;
///名称
@property (nonatomic, copy) NSString *name;
///区域编码
@property (nonatomic, copy) NSString *adcode;
///所属区域
@property (nonatomic, copy) NSString *district;
///地址
@property (nonatomic, copy) NSString *address;
///位置
@property (nonatomic, copy) AMapGeoPoint *location;
///类型码, since 4.5.0. 对应描述可下载参考官网文档 http://a.amap.com/lbs/static/zip/AMap_API_Table.zip。
@property (nonatomic, copy) NSString *typecode;
@end

#pragma mark - POI

///POI图片信息
@interface AMapImage : AMapSearchObject
///标题
@property (nonatomic, copy) NSString *title;
///url
@property (nonatomic, copy) NSString *url;
@end

///POI扩展信息
@interface AMapPOIExtension : AMapSearchObject
///评分
@property (nonatomic, assign) CGFloat  rating;
///人均消费
@property (nonatomic, assign) CGFloat  cost;
///营业时间
@property (nonatomic, copy)   NSString *openTime;
@end

///POI室内地图信息
@interface AMapIndoorData : AMapSearchObject
/// 是否有室内地图标志 1为有 0为没有 @since 9.4.0
@property (nonatomic, assign) NSInteger indoorMap;
///楼层索引，一般会用数字表示，例如8。indoorMap为0时不返回
@property (nonatomic, assign) NSInteger floor;
///所在楼层，一般会带有字母，例如F8。indoorMap为0时不返回
@property (nonatomic, copy)   NSString  *floorName;
///如果当前POI为建筑物类POI，则cpid为自身POI ID；如果当前POI为商铺类POI，则cpid为其所在建筑物的POI ID。indoorMap为0时不返回
@property (nonatomic, copy)   NSString  *pid;
@end

///POI商圈信息 @since 9.4.0
@interface AMapBusinessData : AMapSearchObject
///POI所属商圈
@property (nonatomic, copy)   NSString *businessArea;
///POI今日营业时间，如 08:30-17:30 08:30-09:00 12:00-13:30 09:00-13:00
@property (nonatomic, copy)   NSString *opentimeToday;
///POI营业时间描述，如 周一至周五:08:30-17:30(延时服务时间:08:30-09:00；12:00-13:30)；周六延时服务时间:09:00-13:00(法定节假日除外)
@property (nonatomic, copy)   NSString *opentimeWeek;
///POI的联系电话
@property (nonatomic, copy)   NSString  *tel;
///POI特色内容，目前仅在美食POI下返回
@property (nonatomic, copy)   NSString  *tag;
///POI评分，目前仅在餐饮、酒店、景点、影院类POI下返回
@property (nonatomic, copy)   NSString  *rating;
///POI人均消费，目前仅在餐饮、酒店、景点、影院类POI下返回
@property (nonatomic, copy)   NSString  *cost;
///停车场类型（地下、地面、路边），目前仅在停车场类POI下返回
@property (nonatomic, copy)   NSString  *parkingType;
///POI的别名，无别名时不返回
@property (nonatomic, copy)   NSString  *alias;
@end

///子POI
@interface AMapSubPOI : AMapSearchObject
///POI全局唯一ID
@property (nonatomic, copy)   NSString     *uid;
///名称
@property (nonatomic, copy)   NSString     *name;
///名称简写
@property (nonatomic, copy)   NSString     *sname;
///经纬度
@property (nonatomic, copy)   AMapGeoPoint *location;
///地址
@property (nonatomic, copy)   NSString     *address;
///距中心点距离
@property (nonatomic, assign) NSInteger     distance;
///子POI类型
@property (nonatomic, copy)   NSString     *subtype;
///子POI分类编码 @since 9.4.0
@property (nonatomic, copy)   NSString     *typeCode;
@end

///沿途POI
@interface AMapRoutePOI : AMapSearchObject
///POI全局唯一ID
@property (nonatomic, copy)   NSString     *uid;
///名称
@property (nonatomic, copy)   NSString     *name;
///经纬度
@property (nonatomic, copy)   AMapGeoPoint *location;
///用户起点经过途经点再到终点的距离，单位是米
@property (nonatomic, assign) NSInteger     distance;
///用户起点经过途经点再到终点的时间，单位为秒
@property (nonatomic, assign) NSInteger     duration;
@end

///POI
@interface AMapPOI : AMapSearchObject
///POI全局唯一ID
@property (nonatomic, copy)   NSString     *uid;
///名称
@property (nonatomic, copy)   NSString     *name;
///兴趣点类型
@property (nonatomic, copy)   NSString     *type;
///类型编码
@property (nonatomic, copy)   NSString     *typecode;
///经纬度
@property (nonatomic, copy)   AMapGeoPoint *location;
///地址
@property (nonatomic, copy)   NSString     *address;
///电话
@property (nonatomic, copy)   NSString     *tel;
///距中心点的距离，单位米。在周边搜索时有效
@property (nonatomic, assign) NSInteger     distance;
///停车场类型，地上、地下、路边
@property (nonatomic, copy)   NSString     *parkingType;
///商铺id
@property (nonatomic, copy)   NSString     *shopID;

///邮编
@property (nonatomic, copy)   NSString     *postcode;
///网址
@property (nonatomic, copy)   NSString     *website;
///电子邮件
@property (nonatomic, copy)   NSString     *email;
///省
@property (nonatomic, copy)   NSString     *province;
///省编码
@property (nonatomic, copy)   NSString     *pcode;
///城市名称
@property (nonatomic, copy)   NSString     *city;
///城市编码
@property (nonatomic, copy)   NSString     *citycode;
///区域名称
@property (nonatomic, copy)   NSString     *district;
///区域编码
@property (nonatomic, copy)   NSString     *adcode;
///POI对应的导航引导点坐标 @since 9.4.0
@property (nonatomic, copy)   NSString     *naviPOIId;
///地理格ID
@property (nonatomic, copy)   NSString     *gridcode;
///入口经纬度
@property (nonatomic, copy)   AMapGeoPoint *enterLocation;
///出口经纬度
@property (nonatomic, copy)   AMapGeoPoint *exitLocation;
///方向
@property (nonatomic, copy)   NSString     *direction;
///是否有室内地图
@property (nonatomic, assign) BOOL          hasIndoorMap;
///所在商圈
@property (nonatomic, copy)   NSString     *businessArea;
///室内信息
@property (nonatomic, strong) AMapIndoorData *indoorData;
///子POI列表
@property (nonatomic, strong) NSArray<AMapSubPOI *> *subPOIs;
///图片列表
@property (nonatomic, strong) NSArray<AMapImage *> *images;
///所在商圈 @since 9.4.0
@property (nonatomic, strong) AMapBusinessData *businessData;
///扩展信息只有在ID查询时有效
@property (nonatomic, strong) AMapPOIExtension *extensionInfo;
@end

#pragma mark - 逆地理编码 && 地理编码

///兴趣区域
@interface AMapAOI : AMapSearchObject
///AOI全局唯一ID
@property (nonatomic, copy)   NSString     *uid;
///名称
@property (nonatomic, copy)   NSString     *name;
///所在区域编码
@property (nonatomic, copy)   NSString     *adcode;
///中心点经纬度
@property (nonatomic, copy)   AMapGeoPoint *location;
///面积，单位平方米
@property (nonatomic, assign) CGFloat      area;
@end

///道路
@interface AMapRoad : AMapSearchObject
///道路ID
@property (nonatomic, copy)   NSString     *uid; 
///道路名称
@property (nonatomic, copy)   NSString     *name; 
///距离（单位：米）
@property (nonatomic, assign) NSInteger     distance; 
///方向
@property (nonatomic, copy)   NSString     *direction; 
///坐标点
@property (nonatomic, copy)   AMapGeoPoint *location;
@end

///道路交叉口
@interface AMapRoadInter : AMapSearchObject
///距离（单位：米）
@property (nonatomic, assign) NSInteger     distance; 
///方向
@property (nonatomic, copy)   NSString     *direction; 
///经纬度
@property (nonatomic, copy)   AMapGeoPoint *location; 
///第一条道路ID
@property (nonatomic, copy)   NSString     *firstId; 
///第一条道路名称
@property (nonatomic, copy)   NSString     *firstName; 
///第二条道路ID
@property (nonatomic, copy)   NSString     *secondId; 
///第二条道路名称
@property (nonatomic, copy)   NSString     *secondName;
@end

///门牌信息
@interface AMapStreetNumber : AMapSearchObject
///街道名称
@property (nonatomic, copy)   NSString     *street; 
///门牌号
@property (nonatomic, copy)   NSString     *number; 
///坐标点
@property (nonatomic, copy)   AMapGeoPoint *location; 
///距离（单位：米）
@property (nonatomic, assign) NSInteger     distance; 
///方向
@property (nonatomic, copy)   NSString     *direction;
@end

///商圈
@interface AMapBusinessArea : AMapSearchObject
///名称
@property (nonatomic, strong) NSString     *name; 
///中心坐标
@property (nonatomic, copy)   AMapGeoPoint *location;
@end

///地址组成要素
@interface AMapAddressComponent : AMapSearchObject
///国家（since 5.7.0）
@property (nonatomic, copy)   NSString         *country;
///国家简码（since 7.4.0）仅海外生效
@property (nonatomic, copy)   NSString         *countryCode;
///省/直辖市
@property (nonatomic, copy)   NSString         *province; 
///市
@property (nonatomic, copy)   NSString         *city; 
///城市编码
@property (nonatomic, copy)   NSString         *citycode; 
///区
@property (nonatomic, copy)   NSString         *district; 
///区域编码
@property (nonatomic, copy)   NSString         *adcode; 
///乡镇街道
@property (nonatomic, copy)   NSString         *township; 
///乡镇街道编码
@property (nonatomic, copy)   NSString         *towncode; 
///社区
@property (nonatomic, copy)   NSString         *neighborhood; 
///建筑
@property (nonatomic, copy)   NSString         *building; 
///门牌信息
@property (nonatomic, strong) AMapStreetNumber *streetNumber; 
///商圈列表 AMapBusinessArea 数组
@property (nonatomic, strong) NSArray<AMapBusinessArea *> *businessAreas;
@end

///逆地理编码
@interface AMapReGeocode : AMapSearchObject
///格式化地址
@property (nonatomic, copy)   NSString             *formattedAddress; 
///地址组成要素
@property (nonatomic, strong) AMapAddressComponent *addressComponent; 

///道路信息 AMapRoad 数组
@property (nonatomic, strong) NSArray<AMapRoad *> *roads; 
///道路路口信息 AMapRoadInter 数组
@property (nonatomic, strong) NSArray<AMapRoadInter *> *roadinters; 
///兴趣点信息 AMapPOI 数组
@property (nonatomic, strong) NSArray<AMapPOI *> *pois; 
///兴趣区域信息 AMapAOI 数组
@property (nonatomic, strong) NSArray<AMapAOI *> *aois;
@end

///地理编码
@interface AMapGeocode : AMapSearchObject
///格式化地址
@property (nonatomic, copy) NSString     *formattedAddress; 
///所在省/直辖市
@property (nonatomic, copy) NSString     *province; 
///城市名
@property (nonatomic, copy) NSString     *city; 
///城市编码
@property (nonatomic, copy) NSString     *citycode; 
///区域名称
@property (nonatomic, copy) NSString     *district; 
///区域编码
@property (nonatomic, copy) NSString     *adcode; 
///乡镇街道
@property (nonatomic, copy) NSString     *township; 
///社区
@property (nonatomic, copy) NSString     *neighborhood; 
///楼
@property (nonatomic, copy) NSString     *building; 
///坐标点
@property (nonatomic, copy) AMapGeoPoint *location; 
///匹配的等级
@property (nonatomic, copy) NSString     *level;
///国家（since 7.4.0）仅海外生效
@property (nonatomic, copy)   NSString   *country;
///国家简码（since 7.4.0）仅海外生效
@property (nonatomic, copy)   NSString   *postcode;
@end

#pragma mark - 公交查询
@class AMapBusLine;

///公交站
@interface AMapBusStop : AMapSearchObject
///公交站点ID
@property (nonatomic, copy)   NSString     *uid; 
///区域编码
@property (nonatomic, copy)   NSString     *adcode; 
///公交站名
@property (nonatomic, copy)   NSString     *name; 
///城市编码
@property (nonatomic, copy)   NSString     *citycode; 
///经纬度坐标
@property (nonatomic, copy)   AMapGeoPoint *location; 
///途径此站的公交路线 AMapBusLine 数组
@property (nonatomic, strong) NSArray<AMapBusLine *> *buslines; 
///查询公交线路时的第几站
@property (nonatomic, copy)   NSString *sequence;
@end

///公交线路
@interface AMapBusLine : AMapSearchObject
///公交线路ID
@property (nonatomic, copy) NSString     *uid; 
///公交类型
@property (nonatomic, copy) NSString     *type; 
///公交线路名称
@property (nonatomic, copy) NSString     *name; 
///坐标集合
@property (nonatomic, copy) NSString     *polyline; 
///城市编码
@property (nonatomic, copy) NSString     *citycode; 
///首发站
@property (nonatomic, copy) NSString     *startStop; 
///终点站
@property (nonatomic, copy) NSString     *endStop; 
///当查询公交站点时，返回的 AMapBusLine 中含有该字段
@property (nonatomic, copy) AMapGeoPoint *location; 

///首班车时间
@property (nonatomic, copy)   NSString *startTime; 
///末班车时间
@property (nonatomic, copy)   NSString *endTime; 
///所属公交公司
@property (nonatomic, copy)   NSString *company; 
///距离。在公交线路查询时，该值为此线路的全程距离，单位为千米; 在公交路径规划时，该值为乘坐此路公交车的行驶距离，单位为米
@property (nonatomic, assign) CGFloat distance; 
///起步价
@property (nonatomic, assign) CGFloat basicPrice; 
///全程票价
@property (nonatomic, assign) CGFloat totalPrice; 
///矩形区域左下、右上顶点坐标
@property (nonatomic, copy)   AMapGeoPolygon *bounds; 
///本线路公交站 AMapBusStop 数组
@property (nonatomic, strong) NSArray<AMapBusStop *> *busStops; 

///起程站
@property (nonatomic, strong) AMapBusStop *departureStop; 
///下车站
@property (nonatomic, strong) AMapBusStop *arrivalStop; 
///途径公交站 AMapBusStop 数组
@property (nonatomic, strong) NSArray<AMapBusStop *> *viaBusStops; 
///预计行驶时间（单位：秒）
@property (nonatomic, assign) NSInteger duration;
///此段途径公交站数
@property (nonatomic, assign) NSInteger viaNum;

@end

#pragma mark - 行政区划
///行政区划
@interface AMapDistrict : AMapSearchObject
///区域编码
@property (nonatomic, copy)   NSString     *adcode; 
///城市编码
@property (nonatomic, copy)   NSString     *citycode; 
///行政区名称
@property (nonatomic, copy)   NSString     *name; 
///级别
@property (nonatomic, copy)   NSString     *level; 
///城市中心点
@property (nonatomic, copy)   AMapGeoPoint *center; 
///下级行政区域数组
@property (nonatomic, strong) NSArray<AMapDistrict *> *districts; 
///行政区边界坐标点, NSString 数组
@property (nonatomic, strong) NSArray<NSString *> *polylines;
@end

#pragma mark - 路径规划
///公交方案详细导航动作指令
@interface AMapTransitNavi : AMapSearchObject
///导航主要动作指令
@property (nonatomic, copy)   NSString     *action;
///导航辅助动作指令
@property (nonatomic, copy)   NSString     *assistantAction;
///算路结果中存在的道路类型：
/*
 *0，普通道路 1，人行横道 3，地下通道 4，过街天桥
 *5，地铁通道 6，公园 7，广场 8，扶梯 9，直梯
 *10，索道 11，空中通道 12，建筑物穿越通道
 *13，行人通道 14，游船路线 15，观光车路线 16，滑道
 *18，扩路 19，道路附属连接线 20，阶梯 21，斜坡
 *22，桥 23，隧道 30，轮渡
 */
@property (nonatomic, copy)   NSString     *walkType;
@end

///实时路况信息
@interface AMapTMC : AMapSearchObject
///长度（单位：米）
@property (nonatomic, assign) NSInteger distance; 
///路况状态描述：0 未知，1 畅通，2 缓行，3 拥堵，4 严重拥堵
@property (nonatomic, copy)   NSString  *status; 
///此路段坐标点串
@property (nonatomic, copy)   NSString  *polyline;
@end

///路段基本信息
@interface AMapStep : AMapSearchObject
///行走指示
@property (nonatomic, copy)   NSString  *instruction; 
///方向
@property (nonatomic, copy)   NSString  *orientation; 
///道路名称
@property (nonatomic, copy)   NSString  *road; 
///此路段长度（单位：米）
@property (nonatomic, assign) NSInteger  distance; 
///此路段预计耗时（单位：秒）
@property (nonatomic, assign) NSInteger  duration; 
///此路段坐标点串
@property (nonatomic, copy)   NSString  *polyline; 
///导航主要动作
@property (nonatomic, copy)   NSString  *action; 
///导航辅助动作
@property (nonatomic, copy)   NSString  *assistantAction; 
///道路类型
@property (nonatomic, assign) NSInteger  walkType;
///此段收费（单位：元）
@property (nonatomic, assign) CGFloat    tolls; 
///收费路段长度（单位：米）
@property (nonatomic, assign) NSInteger  tollDistance; 
///主要收费路段
@property (nonatomic, copy)   NSString  *tollRoad;
///此段交通信号灯个数 since 9.2.0 ( 只在算路2.0接口有效 )
@property (nonatomic, assign) NSInteger totalTrafficLights;

///途径城市 AMapCity 数组，只有驾车路径规划时有效
@property (nonatomic, strong) NSArray<AMapCity *> *cities;
///路况信息数组，只有驾车路径规划时有效
@property (nonatomic, strong) NSArray<AMapTMC *> *tmcs;
@end

///步行、骑行、驾车方案
@interface AMapPath : AMapSearchObject
///起点和终点的距离
@property (nonatomic, assign) NSInteger  distance; 
///预计耗时（单位：秒）
@property (nonatomic, assign) NSInteger  duration; 
///导航策略
@property (nonatomic, copy)   NSString  *strategy; 
///导航路段 AMapStep 数组
@property (nonatomic, strong) NSArray<AMapStep *> *steps; 
///此方案费用（单位：元）
@property (nonatomic, assign) CGFloat    tolls; 
///此方案收费路段长度（单位：米）
@property (nonatomic, assign) NSInteger  tollDistance; 
///此方案交通信号灯个数
@property (nonatomic, assign) NSInteger  totalTrafficLights;

/**
 限行信息，仅在驾车和货车路径规划时有效。（since 6.0.0）
 驾车路径规划时：
 0 代表限行已规避或未限行; 1 代表限行无法规避。
 货车路径规划时：
 0，未知（未输入完整/正确车牌号信息时候显示）
 1，已规避限行
 2，起点限行
 3，途径点在限行区域内（设置途径点才出现此报错）
 4，途径限行区域
 5，终点限行
 */
@property (nonatomic, assign) NSInteger restriction;
///规划路径完整坐标点串集合（since 7.4.0）
@property (nonatomic, copy)   NSString  *polyline;

@end

@interface AMapFutureTimeInfoElement : AMapSearchObject

///总时长（分钟）
@property (nonatomic, assign) NSInteger     duration;
///对应的路径规划方案中的路线
@property (nonatomic, assign) NSInteger     pathindex;
/**
 0：代表限行已规避或未限行，即该路线没有限行路段
 1：代表限行无法规避，即该线路有限行路段
 */
@property (nonatomic, assign) NSInteger     restriction;
///路况信息数组，只会返回AMapTMC中的status、polyline
@property (nonatomic, strong) NSArray<AMapTMC *> *tmcs;

@end

@interface AMapFutureTimeInfo : AMapSearchObject

///出发时间
@property (nonatomic, copy)   NSString *startTime;
///路线列表 AMapFutureTimeInfoElement 数组
@property (nonatomic, strong) NSArray<AMapFutureTimeInfoElement *> *elements;
@end

///步行换乘信息
@interface AMapWalking : AMapSearchObject
///起点坐标
@property (nonatomic, copy)   AMapGeoPoint *origin; 
///终点坐标
@property (nonatomic, copy)   AMapGeoPoint *destination; 
///起点和终点的步行距离
@property (nonatomic, assign) NSInteger     distance; 
///步行预计时间
@property (nonatomic, assign) NSInteger     duration; 
///步行路段 AMapStep 数组
@property (nonatomic, strong) NSArray<AMapStep *> *steps; 
@end

///出租车信息
@interface AMapTaxi : AMapSearchObject
///起点坐标
@property (nonatomic, copy)   AMapGeoPoint *origin; 
///终点坐标
@property (nonatomic, copy)   AMapGeoPoint *destination; 
///距离，单位米
@property (nonatomic, assign) NSInteger    distance; 
///耗时，单位秒
@property (nonatomic, assign) NSInteger    duration; 
///起点名称
@property (nonatomic, copy)   NSString     *sname; 
///终点名称
@property (nonatomic, copy)   NSString     *tname;
///打车预计花费金额 @singce 9.4.0
@property (nonatomic, copy)   NSString     *price;
///线路点集合，通过show_fields控制返回与否 @singce 9.4.0
@property (nonatomic, copy)   NSString     *polyline;
@end

///火车站
@interface AMapRailwayStation : AMapSearchObject
///火车站ID
@property (nonatomic, copy) NSString     *uid; 
///名称
@property (nonatomic, copy) NSString     *name; 
///经纬度坐标
@property (nonatomic, copy) AMapGeoPoint *location; 
///区域编码
@property (nonatomic, copy) NSString     *adcode; 
///发车、到站时间，途径站时则为进站时间
@property (nonatomic, copy) NSString     *time; 
///途径站点的停靠时间，单位为分钟
@property (nonatomic, assign) NSInteger  wait; 
///是否是始发站，为出发站时有效
@property (nonatomic, assign) BOOL       isStart; 
///是否是终点站，为到达站时有效
@property (nonatomic, assign) BOOL       isEnd; 
@end

///火车仓位及价格信息
@interface AMapRailwaySpace : AMapSearchObject
///类型，硬卧、硬座等
@property (nonatomic, copy) NSString *code; 
///票价，单位元
@property (nonatomic, assign) CGFloat cost; 
@end

///火车信息
@interface AMapRailway : AMapSearchObject
///火车线路ID
@property (nonatomic, copy) NSString     *uid; 
///名称
@property (nonatomic, copy) NSString     *name; 
///车次
@property (nonatomic, copy) NSString     *trip; 
///类型
@property (nonatomic, copy) NSString     *type; 
///该换乘段行车总距离，单位为米
@property (nonatomic, assign) NSInteger  distance; 
///该线路车段耗时，单位为秒
@property (nonatomic, assign) NSInteger  time; 
///出发站
@property (nonatomic, strong) AMapRailwayStation *departureStation; 
///到达站
@property (nonatomic, strong) AMapRailwayStation *arrivalStation; 
///仓位及价格信息
@property (nonatomic, strong) NSArray<AMapRailwaySpace *> *spaces; 

///途径站点信息
@property (nonatomic, strong) NSArray<AMapRailwayStation *> *viaStops; 
///备选路线信息, 目前只有id和name
@property (nonatomic, strong) NSArray<AMapRailway *> *alters;
@end


///公交换乘路段，如果walking和buslines同时有值，则是先walking后buslines
@interface AMapSegment : AMapSearchObject
///此路段步行导航信息
@property (nonatomic, strong) AMapWalking  *walking; 
///此路段可供选择的不同公交线路 AMapBusLine 数组
@property (nonatomic, strong) NSArray<AMapBusLine *> *buslines; 
///出租车信息，跨城时有效
@property (nonatomic, strong) AMapTaxi     *taxi; 
///火车信息，跨城时有效
@property (nonatomic, strong) AMapRailway  *railway; 
///入口名称
@property (nonatomic, copy)   NSString     *enterName; 
///入口经纬度
@property (nonatomic, copy)   AMapGeoPoint *enterLocation; 
///出口名称
@property (nonatomic, copy)   NSString     *exitName; 
///出口经纬度
@property (nonatomic, copy)   AMapGeoPoint *exitLocation; 
@end

///公交方案
@interface AMapTransit : AMapSearchObject
///此公交方案价格（单位：元）
@property (nonatomic, assign) CGFloat    cost;
///此换乘方案预期时间（单位：秒）
@property (nonatomic, assign) NSInteger  duration; 
///是否是夜班车
@property (nonatomic, assign) BOOL       nightflag;
///此方案总步行距离（单位：米）
@property (nonatomic, assign) NSInteger  walkingDistance;
///换乘路段 AMapSegment 数组
@property (nonatomic, strong) NSArray<AMapSegment *> *segments; 
///当前方案的总距离
@property (nonatomic, assign) NSInteger  distance;
@end

///路径规划信息
@interface AMapRoute : AMapSearchObject
///起点坐标
@property (nonatomic, copy) AMapGeoPoint *origin; 
///终点坐标
@property (nonatomic, copy) AMapGeoPoint *destination; 
///出租车费用（单位：元）
@property (nonatomic, assign) CGFloat  taxiCost; 
///步行、骑行、驾车方案列表 AMapPath 数组
@property (nonatomic, strong) NSArray<AMapPath *> *paths; 
///公交换乘方案列表 AMapTransit 数组
@property (nonatomic, strong) NSArray<AMapTransit *> *transits;
///详细导航动作指令 since 9.4.0
@property (nonatomic, strong) AMapTransitNavi *transitNavi;
///分路段坐标点串，两点间用“,”分隔 since 9.4.0
@property (nonatomic, copy)   NSString     *polyline;
@end

///距离测量结果
@interface AMapDistanceResult : AMapSearchObject
///起点坐标，起点坐标序列号（从１开始）
@property (nonatomic, assign) NSInteger originID;
///终点坐标，终点坐标序列号（从１开始）
@property (nonatomic, assign) NSInteger destID;
///路径距离，单位：米
@property (nonatomic, assign) NSInteger distance;
///预计行驶时间，单位：秒
@property (nonatomic, assign) NSInteger duration;
///错误信息，建议用此字段判断请求是否成功
@property (nonatomic, copy) NSString *info;
///在驾车模式下有效。默认为0；1：指定地点之间没有可以行车的道路；2：起点/终点 距离所有道路均距离过远（例如在海洋/矿业）；3；起点/终点不在中国境内；
@property (nonatomic, assign) NSInteger code;
@end

#pragma mark - 天气查询

///实况天气，仅支持中国部分地区数据(台湾省目前没有数据)返回
@interface AMapLocalWeatherLive : AMapSearchObject
///区域编码
@property (nonatomic, copy) NSString *adcode; 
///省份名
@property (nonatomic, copy) NSString *province; 
///城市名
@property (nonatomic, copy) NSString *city; 
///天气现象
@property (nonatomic, copy) NSString *weather; 
///实时温度
@property (nonatomic, copy) NSString *temperature; 
///风向
@property (nonatomic, copy) NSString *windDirection; 
///风力，单位：级
@property (nonatomic, copy) NSString *windPower; 
///空气湿度
@property (nonatomic, copy) NSString *humidity; 
///数据发布时间
@property (nonatomic, copy) NSString *reportTime; 
@end

///某一天的天气预报信息
@interface AMapLocalDayWeatherForecast : AMapSearchObject
///日期
@property (nonatomic, copy) NSString *date; 
///星期
@property (nonatomic, copy) NSString *week; 
///白天天气现象
@property (nonatomic, copy) NSString *dayWeather; 
///晚上天气现象
@property (nonatomic, copy) NSString *nightWeather;
///白天温度
@property (nonatomic, copy) NSString *dayTemp; 
///晚上温度
@property (nonatomic, copy) NSString *nightTemp; 
///白天风向
@property (nonatomic, copy) NSString *dayWind; 
///晚上风向
@property (nonatomic, copy) NSString *nightWind; 
///白天风力
@property (nonatomic, copy) NSString *dayPower; 
///晚上风力
@property (nonatomic, copy) NSString *nightPower; 
@end

///天气预报类，支持当前时间在内的3天的天气进行预报
@interface AMapLocalWeatherForecast : AMapSearchObject
///区域编码
@property (nonatomic, copy)   NSString *adcode; 
///省份名
@property (nonatomic, copy)   NSString *province; 
///城市名
@property (nonatomic, copy)   NSString *city; 
///数据发布时间
@property (nonatomic, copy)   NSString *reportTime; 
///天气预报AMapLocalDayWeatherForecast数组
@property (nonatomic, strong) NSArray<AMapLocalDayWeatherForecast *> *casts; 
@end

#pragma mark - 附近搜索
///附近搜索返回的用户信息
@interface AMapNearbyUserInfo : AMapSearchObject
///用户ID
@property (nonatomic, copy)   NSString       *userID; 
///最后更新位置
@property (nonatomic, copy)   AMapGeoPoint   *location; 
///与搜索点的距离，由搜索时searchType决定
@property (nonatomic, assign) CGFloat         distance; 
///最后更新的时间戳，单位秒
@property (nonatomic, assign) NSTimeInterval  updatetime; 
@end

#pragma mark - 交通态势

///道路路况评价 since 5.1.0
@interface AMapTrafficEvaluation : AMapSearchObject
///综述
@property (nonatomic, copy) NSString *evaluationDescription;
///0：未知;1：畅通;2：缓行;3：拥堵
@property (nonatomic, assign) NSInteger status;
///畅通所占百分比
@property (nonatomic, copy) NSString *expedite;
///缓行所占百分比
@property (nonatomic, copy) NSString *congested;
///拥堵所占百分比
@property (nonatomic, copy) NSString *blocked;
///未知路段所占百分比
@property (nonatomic, copy) NSString *unknown;
@end

///道路路况返回的道路信息 since 5.1.0
@interface AMapTrafficRoad : AMapSearchObject
///道路名称
@property (nonatomic, copy) NSString *name;
///0：未知;1：畅通;2：缓行;3：拥堵
@property (nonatomic, assign) NSInteger status;
///方向描述
@property (nonatomic, copy) NSString *direction;
///车行角度，判断道路正反向使用。	以正东方向为0度，逆时针方向为正，取值范围：[0,360]
@property (nonatomic, assign) float angle;
///速度 单位：千米/小时
@property (nonatomic, assign) float speed;
///道路坐标集，经度和纬度使用","分隔，坐标之间使用";"分隔。例如：x1,y1;x2,y2
@property (nonatomic, copy) NSString *polyline;
@end

///道路路况信息 since 5.1.0
@interface AMapTrafficInfo : AMapSearchObject
///路况综述
@property (nonatomic, copy) NSString *statusDescription;
///路况评价
@property (nonatomic, strong) AMapTrafficEvaluation *evaluation;
///道路信息
@property (nonatomic, strong) NSArray<AMapTrafficRoad*>* roads;

@end

#pragma mark - 企业地图基础数据类型

///POI点的图片信息
@interface AMapCloudImage : AMapSearchObject
///图片的id标识
@property (nonatomic, copy) NSString *uid; 
///图片压缩后的url串
@property (nonatomic, copy) NSString *preurl; 
///图片原始的url
@property (nonatomic, copy) NSString *url; 
@end

///POI信息
@interface AMapCloudPOI : AMapSearchObject
///唯一标识
@property (nonatomic, assign) NSInteger     uid; 
///名称
@property (nonatomic, copy)   NSString     *name; 
///坐标位置
@property (nonatomic, copy)   AMapGeoPoint *location; 
///地址
@property (nonatomic, copy)   NSString     *address;  
///用户自定义字段
@property (nonatomic, strong) NSDictionary *customFields; 
///创建时间
@property (nonatomic, copy)   NSString     *createTime; 
///更新时间
@property (nonatomic, copy)   NSString     *updateTime; 
///离当前位置的距离(只在企业地图周边搜索时有效)
@property (nonatomic, assign) NSInteger     distance; 
///图片信息
@property (nonatomic, strong) NSArray<AMapCloudImage *> *images __attribute((deprecated("已废弃 since 7.4.0")));

@end
