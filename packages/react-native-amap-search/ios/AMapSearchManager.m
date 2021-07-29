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
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(init1)
{
  self->_search = [[AMapSearchAPI alloc] init];
  self->_search.delegate = self;
}



RCT_EXPORT_METHOD(aMapPOIAroundSearch:(nonnull NSNumber *)latitude longitude:(nonnull NSNumber *)longitude keywords:(NSString *)keywords radius:(nonnull NSNumber *)radius city:(NSString *)city special:(BOOL)special ){

  AMapPOIAroundSearchRequest *request = [[AMapPOIAroundSearchRequest alloc] init];

  request.location = [AMapGeoPoint locationWithLatitude:[latitude floatValue] longitude:[longitude floatValue]];
  request.keywords = keywords;
  /* 搜索城市 */
  request.city=city;
  /* 搜索半径 */
    request.radius = radius;
    /* 是否对结果进行人工干预 */
    request.special=special;
  /* 按照距离排序. */
  request.sortrule = 0;
  request.requireExtension = YES;
  [self->_search AMapPOIAroundSearch:request];
}


- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventReminder"];
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
  

    [self sendEventWithName:@"EventReminder" body:@{@"searchResultList": resultList}];
}
- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error
{

    
}

@end
