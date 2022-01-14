#import "RCTAlipay.h"
#import <AlipaySDK/AlipaySDK.h>

static RCTPromiseResolveBlock _resolve;
static RCTPromiseRejectBlock _reject;

@implementation RCTAlipay

RCT_EXPORT_MODULE(Alipay);

RCT_REMAP_METHOD(pay, payInfo:(NSString *)payInfo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSArray *urls = [[NSBundle mainBundle] infoDictionary][@"CFBundleURLTypes"];
    NSMutableString *appScheme = [NSMutableString string];
    BOOL multiUrls = [urls count] > 1;
    for (NSDictionary *url in urls) {
        NSArray *schemes = url[@"CFBundleURLSchemes"];
        if (!multiUrls ||
            (multiUrls && [@"alipay" isEqualToString:url[@"CFBundleURLName"]])) {
            [appScheme appendString:schemes[0]];
            break;
        }
    }

    if ([appScheme isEqualToString:@""]) {
        NSString *error = @"scheme cannot be empty";
        reject(@"10000", error, [NSError errorWithDomain:error code:10000 userInfo:NULL]);
        return;
    }
    
    _resolve = resolve;
    _reject = reject;
    
    [[AlipaySDK defaultService] payOrder:payInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
        [RCTAlipay handleResult:resultDic];
    }];
}

+(void) handleCallback:(NSURL *)url
{
    NSLog(@"url = %@",url);
    //如果极简开发包不可用，会跳转支付宝钱包进行支付，需要将支付宝钱包的支付结果回传给开发包
    if ([url.host isEqualToString:@"safepay"]) {
        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
          NSLog(@"result = %@",resultDic);
          //【由于在跳转支付宝客户端支付的过程中，商户app在后台很可能被系统kill了，所以pay接口的callback就会失效，请商户对standbyCallback返回的回调结果进行处理,就是在这个方法里面处理跟callback一样的逻辑】
            [self handleResult:resultDic];
        }];
    }
    if ([url.host isEqualToString:@"platformapi"]){//支付宝钱包快登授权返回authCode
        
        [[AlipaySDK defaultService] processAuthResult:url standbyCallback:^(NSDictionary *resultDic) {
          NSLog(@"result = %@",resultDic);
            //【由于在跳转支付宝客户端支付的过程中，商户app在后台很可能被系统kill了，所以pay接口的callback就会失效，请商户对standbyCallback返回的回调结果进行处理,就是在这个方法里面处理跟callback一样的逻辑】
            [self handleResult:resultDic];
        }];
    }
}

+(void) handleResult:(NSDictionary *)resultDic
{
    NSString *status = resultDic[@"resultStatus"];
    if ([status integerValue] >= 8000) {
        _resolve(resultDic);
    } else {
        _reject(status, resultDic[@"memo"], [NSError errorWithDomain:resultDic[@"memo"] code:[status integerValue] userInfo:NULL]);
    }
}

+ (BOOL)requiresMainQueueSetup{
  return NO;
}

@end
