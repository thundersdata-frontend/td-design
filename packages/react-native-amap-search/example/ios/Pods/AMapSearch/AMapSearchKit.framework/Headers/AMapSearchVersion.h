//
//  AMapSearchVersion.h
//  AMapSearchKit
//
//  Created by xiaoming han on 15/10/27.
//  Copyright © 2015年 Amap. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AMapFoundationKit/AMapFoundationVersion.h>

#ifndef AMapSearchVersion_h
#define AMapSearchVersion_h

#define AMapSearchVersionNumber                90405
#define AMapSearchMinRequiredFoundationVersion 10800

// 依赖库版本检测
#if AMapFoundationVersionNumber < AMapSearchMinRequiredFoundationVersion
#error "The AMapFoundationKit version is less than minimum required, please update! Any questions please to visit http://lbs.amap.com"
#endif

FOUNDATION_EXTERN NSString * const AMapSearchVersion;
FOUNDATION_EXTERN NSString * const AMapSearchName;

#endif /* AMapSearchVersion_h */
