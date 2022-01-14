# react-native-alipay

## Getting started

`$ npm install @td-design/react-native-alipay --save`

# android

1 需要在支付宝文档下载 alipaysdk-15.8.06.211122170115.aar（文件名仅做演示，请以实际 SDK 文件名为准）

[SDK 下载地址](https://opendocs.alipay.com/support/01rfry)

2 把 alipaySdk 放置在 android/app 目录下的 libs 文件夹中(如果没有则新建一个)

3 在项目的 build.gradle 中

```
buildscript {
    ext {
        buildToolsVersion = "30.0.2"
        minSdkVersion = 21
        compileSdkVersion = 30
        targetSdkVersion = 30
        ndkVersion = "21.4.7075529"

        // 增加
        AliPay_DIR = projectDir.getPath() +  "/app/libs/alipaysdk-15.8.06.211122170115.aar"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:4.2.2")
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
```

4 申请安卓权限

支付宝需要申请以下权限

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
```
