//
//  AMapSearchManager.m
//  freightDriver
//
//  Created by 陈英杰 on 2021/7/13.
//
#import <AMapFoundationKit/AMapFoundationKit.h>
#import "AMapSearchAPI.h"
#import "AMapSearchManager.h"



@implementation AMapSearchManager{
  AMapSearchAPI *_search;
  RCTResponseSenderBlock jsCallBack;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(init1)
{
  self->_search = [[AMapSearchAPI alloc] init];
  self->_search.delegate = self;
};

// 获取道路沿途的POI
RCT_EXPORT_METHOD(aMapRoutePOISearch:(NSDictionary *)origin destination:(NSDictionary *)destination  strategy:(NSInteger)strategy  searchType:(NSInteger)searchType range:(NSInteger )range callback:(RCTResponseSenderBlock)callback )
{
    AMapRoutePOISearchRequest *request = [[AMapRoutePOISearchRequest alloc] init];
    CGFloat originLatitude =[[origin objectForKey:@"latitude"] floatValue];
    CGFloat originLongitude=[[origin objectForKey:@"longitude"] floatValue];
    request.origin=[AMapGeoPoint locationWithLatitude:originLatitude longitude: originLongitude];
    CGFloat destinationLatitude =[[origin objectForKey:@"latitude"] floatValue];
    CGFloat destinationLongitude=[[origin objectForKey:@"longitude"] floatValue];
    request.destination=[AMapGeoPoint locationWithLatitude:destinationLatitude longitude: destinationLongitude];

    // 驾车导航策略，同驾车路径规划请求的策略（5 多策略除外）
    request.strategy = strategy;
    // 搜索类型
    request.searchType = searchType;
    
//     道路周围搜索范围,单位米,[0-500]，默认250。
    request.range= range;
    self->jsCallBack =callback;
    [self->_search AMapRoutePOISearch:request];
    
}



RCT_EXPORT_METHOD(aMapPOIPolygonSearch:(NSArray *)points keywords:(NSString *)keywords page:(nonnull NSInteger *)page pageSize:(nonnull NSInteger *)pageSize types:(NSString *)types callback:(RCTResponseSenderBlock)callback){
    
    NSMutableArray<AMapGeoPoint *> *polygonPoints= [[NSMutableArray alloc] init];
    if(points != nil && [points count] >= 2) {
        for (NSInteger i = 0; i < [points count]; i++) {
            NSDictionary* dict = [points objectAtIndex:i];
            CGFloat latitude = [[dict objectForKey:@"latitude"] floatValue];
            CGFloat longitude = [[dict objectForKey:@"longitude"] floatValue];
            ;[polygonPoints addObject:[AMapGeoPoint locationWithLatitude:latitude longitude:longitude]];
        }
    }
    
    
    
    self->jsCallBack =callback;
    
    AMapGeoPolygon *polygon = [AMapGeoPolygon polygonWithPoints:polygonPoints];

    AMapPOIPolygonSearchRequest *request = [[AMapPOIPolygonSearchRequest alloc] init];

    request.polygon = polygon;
    request.keywords = keywords;
    request.page = page;
    request.offset = pageSize;
    request.types = types;
    request.requireExtension    = YES;
    
    [self->_search AMapPOIPolygonSearch:request];

}

RCT_EXPORT_METHOD(aMapPOIKeywordsSearch:(NSString *)keywords city:(NSString *)city types:(NSString *)types cityLimit:(BOOL)cityLimit page:(nonnull NSInteger *)page pageSize:(nonnull NSInteger *)pageSize callback:(RCTResponseSenderBlock)callback)
{
    AMapPOIKeywordsSearchRequest *request = [[AMapPOIKeywordsSearchRequest alloc] init];
    self->jsCallBack =callback;
    request.keywords = keywords;
    request.city = city;
    if(![types  isEqual: @""]){
    request.types = types;
    }
    request.cityLimit=cityLimit;
    /* 设置分页页数 */
      request.page = page;
    /* 设置分页 */
      request.offset = pageSize;
    
    request.requireExtension= YES;
    
    [self->_search AMapPOIKeywordsSearch:request];
}


RCT_EXPORT_METHOD(aMapPOIAroundSearch:(nonnull NSNumber *)latitude longitude:(nonnull NSNumber *)longitude keywords:(NSString *)keywords radius:(nonnull NSInteger *)radius city:(NSString *)city special:(BOOL)special page:(nonnull NSInteger *)page pageSize:(nonnull NSInteger *)pageSize types:(NSString*)types callback:(RCTResponseSenderBlock)callback ){

  AMapPOIAroundSearchRequest *request = [[AMapPOIAroundSearchRequest alloc] init];

  self->jsCallBack =callback;
    
  request.location = [AMapGeoPoint locationWithLatitude:[latitude floatValue] longitude:[longitude floatValue]];
  request.keywords = keywords;
  /* 搜索城市 */
  request.city=city;
  /* 搜索半径 */
    request.radius = radius;
  /* 是否对结果进行人工干预 */
  request.special=special;
  /* 设置分页页数 */
    request.page = page;
  /* 设置分页 */
    request.offset = pageSize;
  /*设置类型 */
  request.types = types;
  /* 按照距离排序. */
  request.sortrule = 0;
  request.requireExtension = YES;
  [self->_search AMapPOIAroundSearch:request];
}

- (NSMutableArray *)formatData:(AMapPOISearchResponse *)response
{
    NSMutableArray *resultList;
    if (response.pois.count == 0)
    {
    resultList = [NSMutableArray arrayWithCapacity:0];
        return resultList;
    }
 
  resultList = [NSMutableArray arrayWithCapacity:response.pois.count];
   if (response.pois.count > 0)
   {
       [response.pois enumerateObjectsUsingBlock:^(AMapPOI *obj, NSUInteger idx, BOOL *stop) {
           
           [resultList addObject:@{
                                   @"uid": obj.uid, // uid
                                   @"name": obj.name, // 名称
                                   @"type": obj.type, //兴趣点类型
                                   @"typecode": obj.typecode, // 类型编码
                                   @"latitude": @(obj.location.latitude), //纬度
                                   @"longitude": @(obj.location.longitude), //经度
                                   @"address": obj.address, // 地址
                                   @"tel": obj.tel, // 电话
                                   @"distance": @(obj.distance), //距中心点的距离，单位米
                                   @"parkingType":obj.parkingType, //停车场类型，地上、地下
                                   @"shopID":obj.shopID, // 商铺id
                                   @"postcode":obj.postcode, //邮编
                                   @"website":obj.website, // 网址
                                   @"email":obj.email, //电子邮件
                                   @"province":obj.province, //省
                                   @"pcode" : obj.pcode, //省编码
                                   @"city": obj.city, //市
                                   @"citycode":obj.citycode, //城市编码
                                   @"district":obj.district, //区域名称
                                   @"adcode":obj.adcode, // 区域编码
                                   }];
           
       }];
   }
    return  resultList;
}

- (void)onPOISearchDone:(AMapPOISearchBaseRequest *)request response:(AMapPOISearchResponse *)response
{
  NSMutableArray *resultList = [self formatData:response];
    if(!self->jsCallBack){
        return;
    }
    self->jsCallBack(@[[NSNull null],resultList]);
    self->jsCallBack= nil;

}

/* 沿途搜索回调. */
- (void)onRoutePOISearchDone:(AMapRoutePOISearchRequest *)request response:(AMapRoutePOISearchResponse *)response
{
    NSMutableArray *resultList = [self formatData:response];
      if(!self->jsCallBack){
          return;
      }
      self->jsCallBack(@[[NSNull null],resultList]);
      self->jsCallBack= nil;
}

- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error
{
   
    if(!self->jsCallBack){
        return;
    }
    self->jsCallBack(@[error,[NSNull null]]);
    self->jsCallBack= nil;
}


@end
