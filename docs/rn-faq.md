---
nav:
  title: RN应用开发常见问题
  path: /faq
group:
  title: 开发常见问题
  path: /
  order: 0
---

# RN 应用开发常见问题

## 1. 自定义图标

## 2. 集成极光推送

## 3. 集成热更新

### 安装与注册 CodePush

- 在终端输入`npm install -g code-push-cli`
- 安装完毕后，输入`code-push -v`查看版本，如看到版本号则代表安装成功
- 在终端输入 `code-push register`，会在浏览器自动打开注册页面让你选择授权账号，授权通过之后 CodePush 会告诉你 access key，复制此可以到终端即可完成注册
- 然后输入`code-push login`进行登录，登录成功会提示 successfully logged-in
- 为了让 CodePush 服务器知道你的 app，我们需要向它注册 app：在终端输入`code-push app add <appName> <os> react-native`，如: `code-push app add animalHusbandryCollectorApp android react-native`。一般`appName`就是项目中`app.json`文件中的`name`。注册完成之后会返回一套 `deploymentKey`，请记录下该 key，会在后面步骤中用到。如果 android 和 iOS 都需要热更新功能，需要分别生成一套 key

```code
code-push app add animalHusbandryCollectorApp-android android react-native
code-push app add animalHusbandryCollectorApp-ios ios react-native
```

### 项目中安装依赖

```code
    yarn add react-native-code-push
```

### Android 配置

- `android/app/build.gradle。把上面生成的 android 的 deploymentKey 放到下面 buildTypes 中`

```code
apply from: "../../node_modules/react-native/react.gradle"
apply from: "../../node_modules/react-native-code-push/android/codepush.gradle" // <- 添加这行

android {
   ...
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        releaseStaging {
            storeFile file('staging.keystore')
            storePassword 'android'
            keyAlias 'androidstagingkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('RELEASE_STORE_FILE')) {
                storeFile file(RELEASE_STORE_FILE)
                storePassword RELEASE_STORE_PASSWORD
                keyAlias RELEASE_KEY_ALIAS
                keyPassword RELEASE_KEY_PASSWORD
            }
        }
    }

    buildTypes {
        debug {
            ...
            // Note: CodePush updates should not be tested in Debug mode as they are overriden by the RN packager. However, because CodePush checks for updates in all modes, we must supply a key.
            resValue "string", "CodePushDeploymentKey", '""'
            ...
        }

        releaseStaging.initWith(release)
        releaseStaging {
            ...
            signingConfig signingConfigs.releaseStaging
            resValue "string", "CodePushDeploymentKey", '"<INSERT_STAGING_KEY>"'

            // Note: It is a good idea to provide matchingFallbacks for the new buildType you create to prevent build issues
            // Add the following line if not already there
            matchingFallbacks = ['release']
            ...
        }

        release {
            ...
            resValue "string", "CodePushDeploymentKey", '"<INSERT_PRODUCTION_KEY>"'
            ...
        }
    }
    ...
}

```

- `android/settings.gradle`

```code
include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
```

- `MainApplication.java`

```java
import com.microsoft.codepush.react.CodePush;

private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  ...
  @Override
  protected String getJSBundleFile() {
    return CodePush.getJSBundleFile();
  }
};
```

### IOS 配置

```code
cd ios && pod install
```

- `AppDelegate.m`

```code
#import <CodePush/CodePush.h>

// 把下面这行代码：
return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// 改成：
return [CodePush bundleURL];

// 最后的sourceURLForBridge方法如下：
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    return [CodePush bundleURL];
  #endif
}
```

- Info.plist 执行命令：`appcenter codepush deployment list -a <ownerName>/<appName> -k`查看 server 上的 deployment key 在`Info.plist`文件里面新建一个键值对：

```code
<key>CodePushDeploymentKey</key>
<string>Your Deployment Key</string>
```

- 打开 xcode，选中自己的项目，选中**project**下的项目名称，选择`Info`标签页，点击`Configurations`下的加号，选择`Duplicate "Release" Configuration` 命名为`Staging`.
<center>
<img src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644829195776339205.png" alt="数组插入" width="400" />
</center>

- 选择`Build Settings`标签页，点击加号，选择`Add User Defined Setting`用.xcodeproj 打开项目，先把 Debug/Release/Staging 的值配置好： Debug: `$(BUILD_DIR)/$(CONFIGURATION)$(EFFECTIVE_PLATFORM_NAME)` Release: `$(BUILD_DIR)/$(CONFIGURATION)$(EFFECTIVE_PLATFORM_NAME)` Staging: `$(BUILD_DIR)/Release$(EFFECTIVE_PLATFORM_NAME)` 然后把配置名称改成：`CONFIGURATION_BUILD_DIR`，然后再切换回.xcworkspace 打开项目
<center>
<img src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644829210496443837.png" alt="数组插入" width="400" />
</center>

- 再次选择`Add User Defined Setting`，输入`CODEPUSH_KEY`，通过命令`appcenter codepush deployment list -a <ownerName>/<appName> -k`把`Staging`和`Production`的 deployment key 分别填到`CODEPUSH_KEY`下匹配的属性里。

- 打开`Info.plist`，把之前的`CodePushDeploymentKey`的值改成`$(CODEPUSH_KEY)`

- 重新运行`pod install`

- 运行代码，能够正常启动模拟器，就表示集成成功

### 代码中使用

1. 在项目中增加文件（可以直接拷贝）：`scripts/codePush/index.js`

```code
'use strict';

const { makePush } = require('./makePush');
const inquirer = require('inquirer');

const ENV_PARAMS = {
  message: '请选择您要部署环境',
  type: 'list',
  name: 'environment',
  items: {
    1: 'Production',
    2: 'Staging'
  },
  choices: ['Staging', 'Production']
};

const PLATFORM_PARAMS = {
  message: '请选择您要部署的平台',
  type: 'list',
  name: 'platform',
  choices: ['both', 'android', 'ios'],
  default: 'both'
};

const VERSION_PARAMS = {
  name: 'version',
  type: 'input',
  message: '请输入要更新的目标版本号'
};

const DES_PARAMS = {
  name: 'description',
  type: 'editor',
  message: '请输入本次修改的描述'
};

const MANDATORY_PARAMS = {
  message: '本次更新是否为强制更新',
  type: 'list',
  name: 'mandatory',
  choices: ['true', 'false'],
  default: 'false',
};

const QUESTIONS = [ENV_PARAMS, PLATFORM_PARAMS, DES_PARAMS, VERSION_PARAMS, MANDATORY_PARAMS];

function main (){
  inquirer.prompt(QUESTIONS).then(option => {
    const { description, environment, platform, version, mandatory } = option;
    if (!description) {
      console.error('你没有输入改动描述');
      process.exit(1);
    }
    makePush({
      environment,
      platform,
      version,
      description,
      mandatory,
    });
  });
}

main();

```

2. 在项目中增加文件：`scripts/codePush/makePush.js`

`注意：需要把下面的的包的名字给替换掉 thundersdata/rn-template-android ---> ownerName/在之前步骤注册的对应平台的app的名字，如果android和ios都需要热更新，则都要替换 `

```code
'use strict';
const shell = require('shelljs');

function makePush({ environment, platform, description, mandatory, version }) {
  let androidCmd = `appcenter codepush release-react -a thundersdata/rn-template-android -d ${environment} --description "${description}" -m "${mandatory}"`;
  let iosCmd = `appcenter codepush release-react -a thundersdata/rn-template-ios -d ${environment} --description "${description}" -m "${mandatory}"`;
  if (version) {
    androidCmd += ` -t "${version}"`;
    iosCmd += ` -t "${version}"`;
  }
  let finalCmd = '';
  if (platform === 'both') {
    finalCmd = `${androidCmd} && ${iosCmd}`;
  } else if (platform === 'android') {
    finalCmd = androidCmd;
  } else {
    finalCmd = iosCmd;
  }

  shell.exec(finalCmd);
}

module.exports = {
  makePush,
};

```

3. 在项目中添加文件：`hooks/useCodePush.ts`

```code
import codePush, { DownloadProgress } from 'react-native-code-push';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { useRef } from 'react';
import { Modal, Toast } from '@td-design/react-native';

export function useCodePush() {
  const key = useRef(-1);

  const [progress, setProgress] = useSafeState<string>();

  // eslint-disable-next-line complexity
  const codePushStatusDidChange = async (syncStatus: codePush.SyncStatus) => {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        // 0 - 正在查询CodePush服务器以进行更新。
        console.info('[CodePush] Checking for update.');
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        // 1 - 有可用的更新，并且向最终用户显示了一个确认对话框。（仅在updateDialog使用时适用）
        console.info('[CodePush] Awaiting user action.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // 2 - 正在从CodePush服务器下载可用更新。
        console.info('[CodePush] Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        // 3 - 已下载一个可用的更新，并将其安装。
        console.info('[CodePush] Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        // 4 - 应用程序已配置的部署完全最新。
        console.info('[CodePush] App is up to date.');
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        // 5 该应用程序具有可选更新，最终用户选择忽略该更新。（仅在updateDialog使用时适用）
        console.info('[CodePush] User cancelled the update.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // 6 - 安装了一个可用的更新，它将根据 SyncOptions 中的 InstallMode指定在 syncStatusChangedCallback 函数返回后立即或在下次应用恢复/重新启动时立即运行。
        console.info('[CodePush] Installed update.');
        break;
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        // 7 - 正在执行的 sync 操作
        console.info('[CodePush] Sync already in progress.');
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        // -1 - 同步操作遇到未知错误。
        console.info('[CodePush] An unknown error occurred.');
        break;
    }
  };

  const codePushDownloadDidProgress = (progress: DownloadProgress) => {
    const curPercent = ((progress.receivedBytes / progress.totalBytes) * 100).toFixed(0);
    console.info('[CodePushUtils] Downloading Progress', `${curPercent}%`);
    setProgress(`${curPercent}%`);
  };

  const syncImmediate = async () => {
    codePush.sync(
      {
        updateDialog: {
          // 是否显示更新描述
          appendReleaseDescription: true,
          // 更新描述的前缀。 默认为"Description"
          descriptionPrefix: '\n\n更新内容：\n',
          // 强制更新按钮文字，默认为continue
          mandatoryContinueButtonLabel: '立即更新',
          // 强制更新时的信息. 默认为"An update is available that must be installed."
          mandatoryUpdateMessage: '必须更新后才能使用',
          // 非强制更新时，按钮文字,默认为"ignore"
          optionalIgnoreButtonLabel: '稍后',
          // 非强制更新时，确认按钮文字. 默认为"Install"
          optionalInstallButtonLabel: '后台更新',
          // 非强制更新时，检查到更新的消息文本
          optionalUpdateMessage: '有新版本了，是否更新？',
          // Alert窗口的标题
          title: '更新',
        },
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  };

  /** 个人中心页面用 */
  const checkForUpdate = async () => {
    key.current = Toast.submitting({ content: '检查中...' });
    const update = await codePush.checkForUpdate();
    Toast.remove(key.current);
    if (!update) {
      Modal.alert({
        title: '提示',
        content: '当前版本没有发现需要安装的更新',
      });
    } else {
      syncImmediate();
    }
  };

  /** app启动时不需要弹窗提示 */
  const checkForUpdateWithoutMessage = async () => {
    const update = await codePush.checkForUpdate();
    if (!update) {
      // 如果没有在app启动时调用sync，则需要显式调用notifyAppReady，否则插件将认为更新失败并回滚回以前版本
      codePush.notifyAppReady();
    } else {
      syncImmediate();
    }
  };

  return {
    progress,
    checkForUpdate: useMemoizedFn(checkForUpdate),
    checkForUpdateWithoutMessage: useMemoizedFn(checkForUpdateWithoutMessage),
    sync: syncImmediate,
  };
}

```

4. `由于热更新时我们只能针对特定的版本进行热更新，所以为了保证后续用户手机上 app 版本的一致性，我们推荐使用强更新和热更新相结合的方式。当有版本更新时，我们推荐使用强更新功能，当需要对某个版本进行 bug 修复时，我们推荐使用热更新功能。`

`注意：热更新要求app版本必须是三段式的，如: 1.1.0。`

添加文件：`hooks/useCheckUpdate.ts`

```code
import { useRef } from 'react';
import { helpers, Image, Modal, Toast } from '@td-design/react-native';
import { ForceUpdateEnum } from 'enums';
import RNFetchBlob from 'rn-fetch-blob';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useCustomRequest } from './useCustomRequest';
import { useToast } from './useToast';
import { useCodePush } from './useCodePush';
import { Linking, Platform } from 'react-native';

const { px } = helpers;

export function useCheckUpdate(showMessage = false) {
  const { toastFail } = useToast();
  const { checkForUpdate, checkForUpdateWithoutMessage } = useCodePush();

  const key = useRef(-1);

  const appUpdate = async (androidDownloadUrl: string, appStoreUrl: string, version: string) => {
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (result !== 'granted') {
        toastFail('请授权APP下载文件的权限');
        return;
      }
      key.current = Toast.submitting({ content: '下载中...' });
      const downloadPath = RNFetchBlob.fs.dirs.DownloadDir + `/animalHusbandryCollectorApp-${version}.apk`;
      const android = RNFetchBlob.android;
      RNFetchBlob.config({
        addAndroidDownloads: {
          // 调起原生下载管理
          useDownloadManager: true,
          // 下载的安装包保存的名字
          title: `animalHusbandryCollectorApp-${version}.apk`,
          // 下载时候顶部通知栏的描述
          description: '下载完成之后将会自动安装',
          // 下载的文件格式
          mime: 'application/vnd.android.package-archive',
          // 下载完成之后扫描下载的文件
          mediaScannable: true,
          // 通知栏显示下载情况
          notification: true,
          // 下载地址
          path: downloadPath,
        },
      })
        .fetch('GET', androidDownloadUrl)
        .then(res => {
          android.actionViewIntent(res.path(), 'application/vnd.android.package-archive');
        })
        .catch(() => {
          toastFail('下载失败');
        })
        .finally(() => {
          Toast.remove(key.current);
        });
    } else {
      Linking.canOpenURL(appStoreUrl)
        .then(supported => {
          if (!supported) {
            console.warn('找不到对应的应用');
            return false;
          }
          return Linking.openURL(appStoreUrl);
        })
        .catch(err => {
          console.error('跳转到APP_STORE失败，失败原因：', err);
        });
    }
  };

  /**
   * 根据版本号对比是否需要强制更新，默认版本号为三段 如：1.2.3
   * 和后端约定：第一段和第二段为强制更新，第三段为非强制更新
   * 如果是非强制更新的话，走热更新功能
   */
  const { run: checkUpdate } = useCustomRequest(API.collector.appVersion.check.fetch, {
    manual: true,
    onSuccess: data => {
      if (data?.forcedUpdate === ForceUpdateEnum.强制) {
        Modal.alert({
          icon: (
            <Image
              source={require('modules/offline/assets/modal_confirm.webp')}
              style={{ width: px(55), height: px(55), marginTop: px(36) }}
            />
          ),
          title: '版本更新',
          content: '检测到有新版本请立即升级',
          onPress: () => appUpdate(data?.downloadUrl ?? '', data?.appStoreUrl ?? '', data?.version ?? ''),
        });
        return;
      }

      // 热更新，判断是否需要显示检查更新的弹窗
      if (showMessage) {
        checkForUpdate();
      } else {
        checkForUpdateWithoutMessage();
      }
    },
  });
  return { checkUpdate };
}

```

配置文件：`android/app/src/main/AndroidManifest.xml`，否则 android apk 下载失败

```code
    ...
    <!-- 文件权限 -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" />
    <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
    ...
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <action android:name="android.intent.action.DOWNLOAD_COMPLETE"/> ---->添加这行
      ...
    </intent-filter>
```

5. 添加 `npm scripts`

```code
{
  "scripts": {
    ...
    "codePush": "node scripts/codePush/index.js",
    "android:staging": "yarn bundle && cd ./android && ./gradlew app:assembleReleaseStaging",
    ...
  },
}
```

6. 在 `App.tsx`中使用

```code
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { hide as hideSplash } from 'react-native-bootsplash';
import { ThemeProvider } from '@td-design/react-native';
import { useMount } from '@td-design/rn-hooks';
import { getVersion } from 'react-native-device-info';

import { Stack } from './stacks';
import { authAtom } from 'atoms';
import { Fallback } from 'components';
import { lightTheme } from 'theme';
import { linking } from 'linking';
import { isSignedIn } from 'utils/auth';
import { useUpdateAtom } from 'jotai/utils';
import { useCheckUpdate } from 'hooks/useCheckUpdate';

export function App() {
  const updateAuth = useUpdateAtom(authAtom);

  const { checkUpdate } = useCheckUpdate();

  useMount(() => {
    const init = async () => {
      // 判断用户是否已经登录
      const signedIn = await isSignedIn();
      updateAuth({ signedIn });
    };

    init().finally(async () => {
      await hideSplash({ fade: true });
      checkUpdate({ version: getVersion() });
    });
  });

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={lightTheme}>
        <NavigationContainer linking={linking} fallback={<Fallback />} theme={DefaultTheme}>
          <Stack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

```

7. `发布热更新：在项目下执行命令：yarn codePush 然后按照步骤执行即可`

## 4. 外链唤醒 APP
