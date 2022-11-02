// ReactNativeAlipay.h
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCTAlipay : NSObject<RCTBridgeModule>

+(void) handleCallback:(NSURL *)url;

@end
