//
//  AMapNearbySearchManager.h
//  AMapSearchKit
//
//  Created by xiaoming han on 15/8/31.
//  Copyright (c) 2015年 Amap. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AMapNearbyUploadInfo.h"

@class AMapNearbySearchManager;

///附近搜索代理
@protocol AMapNearbySearchManagerDelegate <NSObject>
@optional

/**
 * @brief 开启自动上传，需实现该回调。
 */
- (AMapNearbyUploadInfo *)nearbyInfoForUploading:(AMapNearbySearchManager *)manager;

/**
 * @brief 用户信息上传完毕回调。
 * @param error 错误，为空时表示成功。
 */
- (void)onNearbyInfoUploadedWithError:(NSError *)error;

/**
 * @brief  用户信息清除完毕回调。
 * @param error 错误，为空时表示成功。
 */
- (void)onUserInfoClearedWithError:(NSError *)error;

@end

///附近搜索管理类，同时只能有一个实例开启，否则可能会出现错误。
@interface AMapNearbySearchManager : NSObject

///上传最小间隔，默认15s，最小7s。自动上传的过程中设置无效。
@property (nonatomic, assign) NSTimeInterval uploadTimeInterval;

///代理对象。
@property (nonatomic, weak) id<AMapNearbySearchManagerDelegate> delegate;

///是否正在自动上传状态中。
@property (nonatomic, readonly) BOOL isAutoUploading;

/**
 * @brief manager单例.
 * 初始化之前请设置key，否则将无法正常使用该服务.
 * @return nearbySearch实例。
 */
+ (instancetype)sharedInstance;

/**
 * @brief 请使用单例。
 */
- (instancetype)init __attribute__((unavailable));

/**
 * @brief 启动自动上传。
 */
- (void)startAutoUploadNearbyInfo;

/**
 * @brief 关闭自动上传。
 */
- (void)stopAutoUploadNearbyInfo;

/**
 * @brief 执行单次上传，执行间隔不低于uploadTimeInterval最小值，否则执行失败。
 * @param info 需要上传的信息。
 * @return 成功执行返回YES，否则返回NO。
 */
- (BOOL)uploadNearbyInfo:(AMapNearbyUploadInfo *)info __attribute((deprecated("已废弃 since 7.4.0，该功能不再支持")));

/**
 * @brief 清除服务器上某一用户的信息。
 * @param userID 指定的用户ID
 * @return 成功执行返回YES，否则返回NO。
 */
- (BOOL)clearUserInfoWithID:(NSString *)userID __attribute((deprecated("已废弃 since 7.4.0，该功能不再支持")));

@end
