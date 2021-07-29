//
//  AMapSearch.h
//  freightDriver
//
//  Created by 陈英杰 on 2021/7/13.
//

#import <AMapFoundationKit/AMapFoundationKit.h>

#import <AMapSearchKit/AMapSearchKit.h>

self.search = [[AMapSearchAPI alloc] init];
self.search.delegate = self;

AMapPOIAroundSearchRequest *request = [[AMapPOIAroundSearchRequest alloc] init];

request.location = [AMapGeoPoint locationWithLatitude:39.990459 longitude:116.481476];
request.keywords = @"电影院";
/* 按照距离排序. */
request.sortrule = 0;
request.requireExtension = YES;

[self.search AMapPOIAroundSearch:request];
