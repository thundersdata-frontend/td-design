//
//  AMapSearchAPI.h
//  AMapSearchKit
//
//  Created by xiaoming han on 15/7/22.
//  Copyright (c) 2015年 Amap. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AMapSearchObj.h"
#import "AMapCommonObj.h"
#import <AMapFoundationKit/AMapServices.h>

@protocol AMapSearchDelegate;

///搜索结果语言
#define AMapSearchLanguageZhCN @"zh" ///< 中文
#define AMapSearchLanguageEn @"en" ///< 英文

///搜索类
@interface AMapSearchAPI : NSObject

///实现了 AMapSearchDelegate 协议的类指针。
@property (nonatomic, weak) id<AMapSearchDelegate> delegate;

///查询超时时间，单位秒，默认为20秒。
@property (nonatomic, assign) NSInteger timeout;

///查询结果返回语言, 默认为中文。
@property (nonatomic, copy) NSString *language;

/**
 * @brief AMapSearch的初始化函数。
 * 初始化之前请正确设置key，否则将无法正常使用搜索服务.
 * @return AMapSearch类对象实例
 */
- (instancetype)init;

/**
 * @brief 取消所有未回调的请求，触发错误回调。
 */
- (void)cancelAllRequests;

#pragma mark - Privacy 隐私合规
/**
 * @brief 更新App是否显示隐私弹窗的状态，隐私弹窗是否包含高德SDK隐私协议内容的状态. since 8.1.0
 * @param showStatus 隐私弹窗状态
 * @param containStatus 包含高德SDK隐私协议状态
 */
+ (void)updatePrivacyShow:(AMapPrivacyShowStatus)showStatus privacyInfo:(AMapPrivacyInfoStatus)containStatus;
/**
* @brief 更新用户授权高德SDK隐私协议状态. since 8.1.0
* @param agreeStatus 用户授权高德SDK隐私协议状态
*/
+ (void)updatePrivacyAgree:(AMapPrivacyAgreeStatus)agreeStatus;


#pragma mark - 搜索服务接口

/**
 * @brief POI ID查询接口
 * @param request 查询选项。具体属性字段请参考 AMapPOIIDSearchRequest 类。
 */
- (void)AMapPOIIDSearch:(AMapPOIIDSearchRequest *)request;

/**
 * @brief POI 关键字查询接口
 * @param request 查询选项。具体属性字段请参考 AMapPOIKeywordsSearchRequest 类。
 */
- (void)AMapPOIKeywordsSearch:(AMapPOIKeywordsSearchRequest *)request;

/**
 * @brief POI 周边查询接口
 * @param request 查询选项。具体属性字段请参考 AMapPOIAroundSearchRequest 类。
 */
- (void)AMapPOIAroundSearch:(AMapPOIAroundSearchRequest *)request;

/**
 * @brief POI 多边形查询接口
 * @param request 查询选项。具体属性字段请参考 AMapPOIPolygonSearchRequest 类。
 */
- (void)AMapPOIPolygonSearch:(AMapPOIPolygonSearchRequest *)request;

/**
 * @brief 沿途查询接口 (v4.3.0)
 * @param request 查询选项。具体属性字段请参考 AMapRoutePOISearchRequest 类。
 */
- (void)AMapRoutePOISearch:(AMapRoutePOISearchRequest *)request;

/**
 * @brief 地址编码查询接口
 * @param request 查询选项。具体属性字段请参考 AMapGeocodeSearchRequest 类。
 */
- (void)AMapGeocodeSearch:(AMapGeocodeSearchRequest *)request;

/**
 * @brief 逆地址编码查询接口
 * @param request 查询选项。具体属性字段请参考 AMapReGeocodeSearchRequest 类。
 */
- (void)AMapReGoecodeSearch:(AMapReGeocodeSearchRequest *)request;

/**
 * @brief 输入提示查询接口
 * @param request 查询选项。具体属性字段请参考 AMapInputTipsSearchRequest 类。
 */
- (void)AMapInputTipsSearch:(AMapInputTipsSearchRequest *)request;

/**
 * @brief 公交站点查询接口
 * @param request 查询选项。具体属性字段请参考 AMapBusStopSearchRequest 类。
 */
- (void)AMapBusStopSearch:(AMapBusStopSearchRequest *)request;

/**
 * @brief 公交线路关键字查询
 * @param request 查询选项。具体属性字段请参考 AMapBusLineIDSearchRequest 类。
 */
- (void)AMapBusLineIDSearch:(AMapBusLineIDSearchRequest *)request;

/**
 * @brief 公交线路关键字查询
 * @param request 查询选项。具体属性字段请参考 AMapBusLineNameSearchRequest 类。
 */
- (void)AMapBusLineNameSearch:(AMapBusLineNameSearchRequest *)request;

/**
 * @brief 行政区域查询接口
 * @param request 查询选项。具体属性字段请参考 AMapDistrictSearchRequest 类。
 */
- (void)AMapDistrictSearch:(AMapDistrictSearchRequest *)request;

/**
 * @brief 驾车路径规划V2.0查询接口
 * @param request 查询选项。具体属性字段请参考 AMapDrivingCalRouteSearchRequest 类。
 */
- (void)AMapDrivingV2RouteSearch:(AMapDrivingCalRouteSearchRequest *)request;

/**
 * @brief 步行路径规划查询接口
 * @param request 查询选项。具体属性字段请参考 AMapWalkingRouteSearchRequest 类。
 */
- (void)AMapWalkingRouteSearch:(AMapWalkingRouteSearchRequest *)request;

/**
 * @brief 公交路径规划查询接口
 * @param request 查询选项。具体属性字段请参考 AMapTransitRouteSearchRequest 类。
 */
- (void)AMapTransitRouteSearch:(AMapTransitRouteSearchRequest *)request;

/**
 * @brief 骑行路径规划查询接口 (since 4.3.0)
 * @param request 查询选项。具体属性字段请参考 AMapRidingRouteSearchRequest 类。
 */
- (void)AMapRidingRouteSearch:(AMapRidingRouteSearchRequest *)request;

/**
 * @brief 货车路径规划查询接口 （since 6.1.0）
 * @param request 查询选项。具体属性字段请参考 AMapTruckRouteSearchRequest 类。
 */
- (void)AMapTruckRouteSearch:(AMapTruckRouteSearchRequest *)request;

/**
 * @brief 未来路线规划查询接口 （since 6.9.0）
 * @param request 查询选项。具体属性字段请参考 AMapTruckRouteSearchRequest 类。
 */
- (void)AMapFutureRouteSearch:(AMapFutureRouteSearchRequest *)request;

/**
 * @brief 天气查询接口
 * @param request 查询选项。具体属性字段请参考 AMapWeatherSearchRequest 类。
 */
- (void)AMapWeatherSearch:(AMapWeatherSearchRequest *)request;

/**
 * @brief 距离查询（since 6.1.0）
 * @param request 查询选项。具体属性字段请参考 AMapDistanceSearchRequest 类。
 */
- (void)AMapDistanceSearch:(AMapDistanceSearchRequest *)request;

#pragma mark - 附近搜索相关

/**
 * @brief 附近搜索查询接口
 * @param request 查询选项。具体属性字段请参考 AMapNearbySearchRequest 类。
 */
- (void)AMapNearbySearch:(AMapNearbySearchRequest *)request __attribute__((deprecated("已废弃, from 7.4.0，该功能不再支持")));

#pragma mark - 企业地图搜索相关

/**
 * @brief 企业地图周边查询接口
 * @param request 查询选项。具体属性字段请参考 AMapCloudPOIAroundSearchRequest 类。
 */
- (void)AMapCloudPOIAroundSearch:(AMapCloudPOIAroundSearchRequest *)request;

/**
 * @brief 企业地图polygon区域查询接口
 * @param request 查询选项。具体属性字段请参考 AMapCloudPOIPolygonSearchRequest 类。
 */
- (void)AMapCloudPOIPolygonSearch:(AMapCloudPOIPolygonSearchRequest *)request;

/**
 * @brief 企业地图ID查询接口
 * @param request 查询选项。具体属性字段请参考 AMapCloudPOIIDSearchRequest 类。
 */
- (void)AMapCloudPOIIDSearch:(AMapCloudPOIIDSearchRequest *)request;

/**
 * @brief 企业地图本地查询接口
 * @param request 查询选项。具体属性字段请参考 AMapCloudPOILocalSearchRequest 类。
 */
- (void)AMapCloudPOILocalSearch:(AMapCloudPOILocalSearchRequest *)request;

#pragma mark - 短串分享相关

/**
 * @brief 位置短串分享接口
 * @param request 查询选项。具体属性字段请参考 AMapLocationShareSearchRequest 类。
 */
- (void)AMapLocationShareSearch:(AMapLocationShareSearchRequest *)request;

/**
 * @brief 兴趣点短串分享接口
 * @param request 查询选项。具体属性字段请参考 AMapPOIShareSearchRequest 类。
 */
- (void)AMapPOIShareSearch:(AMapPOIShareSearchRequest *)request;

/**
 * @brief 路线规划短串分享接口
 * @param request 查询选项。具体属性字段请参考 AMapRouteShareSearchRequest 类。
 */
- (void)AMapRouteShareSearch:(AMapRouteShareSearchRequest *)request;

/**
 * @brief 导航短串分享接口
 * @param request 查询选项。具体属性字段请参考 AMapNavigationShareSearchRequest 类。
 */
- (void)AMapNavigationShareSearch:(AMapNavigationShareSearchRequest *)request;

@end

#pragma mark - AMapSearchDelegate

///AMapSearchDelegate协议, 定义了搜索结果的回调方法，发生错误时的错误回调方法。
@protocol AMapSearchDelegate<NSObject>
@optional

/**
 * @brief 当请求发生错误时，会调用代理的此方法.
 * @param request 发生错误的请求.
 * @param error   返回的错误.
 */
- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error;

/**
 * @brief POI查询回调函数
 * @param request  发起的请求，具体字段参考 AMapPOISearchBaseRequest 及其子类。
 * @param response 响应结果，具体字段参考 AMapPOISearchResponse 。
 */
- (void)onPOISearchDone:(AMapPOISearchBaseRequest *)request response:(AMapPOISearchResponse *)response;

/**
 * @brief 沿途查询回调函数 (since v4.3.0)
 * @param request  发起的请求，具体字段参考 AMapRoutePOISearchRequest 及其子类。
 * @param response 响应结果，具体字段参考 AMapRoutePOISearchResponse 。
 */
- (void)onRoutePOISearchDone:(AMapRoutePOISearchRequest *)request response:(AMapRoutePOISearchResponse *)response;

/**
 * @brief 地理编码查询回调函数
 * @param request  发起的请求，具体字段参考 AMapGeocodeSearchRequest 。
 * @param response 响应结果，具体字段参考 AMapGeocodeSearchResponse 。
 */
- (void)onGeocodeSearchDone:(AMapGeocodeSearchRequest *)request response:(AMapGeocodeSearchResponse *)response;

/**
 * @brief 逆地理编码查询回调函数
 * @param request  发起的请求，具体字段参考 AMapReGeocodeSearchRequest 。
 * @param response 响应结果，具体字段参考 AMapReGeocodeSearchResponse 。
 */
- (void)onReGeocodeSearchDone:(AMapReGeocodeSearchRequest *)request response:(AMapReGeocodeSearchResponse *)response;

/**
 * @brief 输入提示查询回调函数
 * @param request  发起的请求，具体字段参考 AMapInputTipsSearchRequest 。
 * @param response 响应结果，具体字段参考 AMapInputTipsSearchResponse 。
 */
- (void)onInputTipsSearchDone:(AMapInputTipsSearchRequest *)request response:(AMapInputTipsSearchResponse *)response;

/**
 * @brief 公交站查询回调函数
 * @param request  发起的请求，具体字段参考 AMapBusStopSearchRequest 。
 * @param response 响应结果，具体字段参考 AMapBusStopSearchResponse 。
 */
- (void)onBusStopSearchDone:(AMapBusStopSearchRequest *)request response:(AMapBusStopSearchResponse *)response;

/**
 * @brief 公交线路关键字查询回调
 * @param request  发起的请求，具体字段参考 AMapBusLineSearchRequest 。
 * @param response 响应结果，具体字段参考 AMapBusLineSearchResponse 。
 */
- (void)onBusLineSearchDone:(AMapBusLineBaseSearchRequest *)request response:(AMapBusLineSearchResponse *)response;

/**
 * @brief 行政区域查询回调函数
 * @param request  发起的请求，具体字段参考 AMapDistrictSearchRequest 。
 * @param response 响应结果，具体字段参考 AMapDistrictSearchResponse 。
 */
- (void)onDistrictSearchDone:(AMapDistrictSearchRequest *)request response:(AMapDistrictSearchResponse *)response;

/**
 * @brief 路径规划查询回调
 * @param request  发起的请求，具体字段参考 AMapRouteSearchBaseRequest 及其子类。
 * @param response 响应结果，具体字段参考 AMapRouteSearchResponse 。
 */
- (void)onRouteSearchDone:(AMapRouteSearchBaseRequest *)request response:(AMapRouteSearchResponse *)response;

/**
 * @brief 未来路径规划查询回调 since 6.9.0
 * @param request  发起的请求，具体字段参考 AMapRouteSearchBaseRequest 及其子类。
 * @param response 响应结果，具体字段参考 AMapRouteSearchResponse 。
 */
- (void)onFutureRouteSearchDone:(AMapRouteSearchBaseRequest *)request response:(AMapFutureRouteSearchResponse *)response;

/**
 * @brief 距离查询回调
 * @param request  发起的请求，具体字段参考 AMapDistanceSearchRequest 及其子类。
 * @param response 响应结果，具体字段参考 AMapDistanceSearchResponse 。
 */
- (void)onDistanceSearchDone:(AMapDistanceSearchRequest *)request response:(AMapDistanceSearchResponse *)response;

/**
 * @brief 天气查询回调
 * @param request  发起的请求，具体字段参考 AMapWeatherSearchRequest 。
 * @param response 响应结果，具体字段参考 AMapWeatherSearchResponse 。
 */
- (void)onWeatherSearchDone:(AMapWeatherSearchRequest *)request response:(AMapWeatherSearchResponse *)response;

#pragma mark - 附近搜索回调

/**
 * @brief 附近搜索回调
 * @param request  发起的请求，具体字段参考 AMapNearbySearchRequest 。
 * @param response 响应结果，具体字段参考 AMapNearbySearchResponse 。
 */
- (void)onNearbySearchDone:(AMapNearbySearchRequest *)request response:(AMapNearbySearchResponse *)response;

#pragma mark - 企业地图搜索回调

/**
 * @brief  企业地图查询回调函数
 * @param request 发起的请求，具体字段参考 AMapCloudSearchBaseRequest 。
 * @param response 响应结果，具体字段参考 AMapCloudPOISearchResponse 。
 */
- (void)onCloudSearchDone:(AMapCloudSearchBaseRequest *)request response:(AMapCloudPOISearchResponse *)response;

#pragma mark - 短串分享搜索回调

/**
 * @brief 短串分享搜索回调
 * @param request  发起的请求
 * @param response 相应结果，具体字段参考 AMapShareSearchResponse。
 */
- (void)onShareSearchDone:(AMapShareSearchBaseRequest *)request response:(AMapShareSearchResponse *)response;

@end
