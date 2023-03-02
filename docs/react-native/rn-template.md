---
toc: menu
order: 3
---

# 项目模板

github 地址：[rn-template](https://github.com/thundersdata-frontend/rn-template)

`rn-template` 是雷数前端团队基于以往 APP 的项目经验，积累沉淀下来的一套支撑 APP 快速开发的模板。内置了以下功能：

- [@td-design/react-native](https://github.com/thundersdata-frontend/td-design/tree/master/packages/react-native) 组件库
- [react-navigation](https://github.com/react-navigation/react-navigation) 作为 APP 导航
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) 错误边界处理，防止app因某个页面或者模块报错导致崩溃
- [react-native-exception-handler](https://github.com/a7ul/react-native-exception-handler) 全局的异常捕获，可以集成Sentry等上报平台
- [react-native-config](https://github.com/luggit/react-native-config) 用于区分不同的开发环境
- [react-native-make](https://github.com/bamlab/react-native-make) 用来创建 APP Icon
- [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash) 比 react-native-splash-screen 更好用的启动页工具
- [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) 比 AsyncStorage 更好用的本地数据存储
- [react-native-code-push](https://github.com/microsoft/react-native-code-push) 集成了热更新功能
- [commitlint](https://github.com/conventional-changelog/commitlint) 更性感的 git 提交
- [pont](https://github.com/alibaba/pont) 基于后端 swagger 文档自动生成前端接口
- [webp](https://github.com/Aleksefo/react-native-webp-format) 更小更适合在app上使用的图片格式

我们将一一对以上功能做出更加详细的介绍。

## 新建项目

新建项目很简单，只需要几行简单的命令即可：

```code
npm install -g @td-design/cli

td-cli init <projectName>
```
根据提示，模板选择`app`, 分支目前支持: `main`/`0.66`/`0.67`/`0.68`/`0.69`/`0.70`

## 设置 APP 图标

有了`react-native-make`库的支持，实现修改图标的功能就变得非常简单。你只需要下面的一行代码即可实现：

### 生成IOS图标

```code
react-native set-icon  --platform ios --path [path-to-image]
```
要求：
- `path` 必填
- icon图片格式只支持：png / jpeg
- icon图片必须要是正方形
- icon图片不能是透明的
- icon图片最小尺寸为 1024*1024
### 生成安卓图标

```code
react-native set-icon --platform android --path path-to-image --background color
```
要求：
- `path` 必填
- icon图片格式只支持：png / jpeg
- icon图片必须要是正方形
- icon图片不能是透明的
- icon图片最小尺寸为 1024*1024
- 安卓8使用adaptive_icon.使用指南可以参考：[adaptive_icon](https://medium.com/google-design/designing-adaptive-icons-515af294c783)
- 背景色默认是白色

## 设置 APP 启动页
我们在实际项目中使用`react-native-bootsplash`管理App的启动页，效果非常不错。它提供有对应CLI可以很方便地为你的APP自动创建启动页：
```code
npx react-native generate-bootsplash <logoPath>

Generate a launch screen using an original logo file

Options:
  --background-color <color>  color used as launch screen background (in hexadecimal format) (default: "#fff")
  --logo-width <width>        logo width at @1x (in dp - we recommend approximately ~100) (default: 100)
  --assets-path [path]        path to your static assets directory (useful to require the logo file in JS)
  --flavor <flavor>           [android only] flavor build variant (outputs in an android resource directory other than "main")
  -h, --help                  output usage information
```
使用示例：
```code
npx react-native generate-bootsplash assets/bootsplash_logo_original.png \
  --background-color=F5FCFF \
  --logo-width=100 \
  --assets-path=assets \
  --flavor=main
```

## 配置不同的开发环境

通常在项目开发中我们会有很多不同的开发环境，比如 dev 环境，staging 环境，pre-UAT 环境，UAT 环境，production 环境等等，这些环境里面基础的代码部分基本上都是一样的。不同的地方更多的体现在环境的不同，比如各个环境连接的数据库不同，各个环境配置的环境变量、秘钥等参数不同。

以往我们会根据不同的分支来切换不同的环境，比如 develop 分支对应 dev 环境，master 分支对应 production 环境，等等。但是这种效果最大的问题是我们在开发的时候需要不停地在不同的分支进行切换，而且在分支很多的情况下，修复 bug，以及对应的代码合并操作非常繁琐而且很容易出现冲突甚至错误，导致开发效率低下，甚至严重时还会引起生产的 bug（切肤之痛！！！）。

那么除了用分支这种方式来管理不同的环境之外，还有其他更简单的方式来实现吗？

答案是有的。这就是这里要介绍的`react-native-config`。

在按照 readme 正确安装`react-native-config`之后，我们会在项目根目录下根据不同的环境新建几个`.env`的文件，比如:

- `.env` （需要有，以便在后面实现 IOS 上多环境切换的配置）
- `.env.dev` 对应开发环境
- `.env.staging` 对应测试环境
- `.env.production` 对应生产环境

每个文件中存放的内容的 key 值相同，但是 value 不同。比如：

```js
#这个参数在Android上用来比较两个版本哪个更新（值越大越新），在IOS上表示构建次数
VERSION_CODE=3

#这个参数在Android上表示用户看到的版本号，在IOS上表示Version
VERSION_NAME=1.1

#这个参数表示用户看到的APP的名字
APP_DISPLAY_NAME=rnTemplate

#后端API接口地址
authorization=http://authorization.thundersdata.com
```

配置完成后，那么 APP 在编译的时候是怎么知道该去读哪个环境变量配置文件呢？

### Android：

在`package.json`的`scripts`下新建几条命令：

```code
"android": "ENVFILE=.env.dev react-native run-android",
"android:staging": "cd ./android && ENVFILE=.env.staging ./gradlew app:assembleRelease",
"android:prod": "cd ./android && ENVFILE=.env.prod ./gradlew app:assembleRelease",
```

这样，通过`ENVFILE`我们就可以将我们需要对应的环境变量配置文件注入到开发或者打包命令中。

### IOS：

IOS 上的配置略显繁琐，具体步骤可以参见 readme 里面的步骤：

- [基础配置](https://github.com/luggit/react-native-config#availability-in-build-settings-and-infoplist)
- [多环境支持](https://github.com/luggit/react-native-config#ios-1)

## 处理页面间跳转

在应用中，我们选择使用`react-navigation`库来处理页面间跳转。更多信息可以参考[react-navigation 文档](https://reactnavigation.org/docs/getting-started)

## 处理表单提交

在应用中，我们选择使用`rc-field-form`作为表单解决方案。它是 ant-design 的 Form 组件的底层依赖，使用它可以让我们在开发上保证和 PC 上相同的写法，减少心智负担。 所以我们把`rc-field-form`内置到了组件库中，你可以直接使用组件库里提供的`Form`/`FormItem`/`FormListItem`等组件。
示例如下：

```tsx | pure
import {
  Box,
  Button,
  Checkbox,
  Form,
  helpers,
  Input,
  NumberKeyboard,
  Radio,
  Stepper,
  Switch,
  Text,
  WhiteSpace,
  WingBlank,
} from '@td-design/react-native';
import ImagePicker from '@td-design/react-native-image-picker';
import { DatePickerItem, PickerItem } from '@td-design/react-native-picker';
import { Container, KeyboardAwareView } from 'components';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import { ScrollView } from 'react-native';

const { FormItem, FormListItem, useForm } = Form;
const { InputItem, TextArea } = Input;
const { NumberKeyboardItem } = NumberKeyboard;
const { px, ONE_PIXEL } = helpers;
const residences = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          {
            value: 'xihu',
            label: '西湖区',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门区',
          },
        ],
      },
    ],
  },
];

export function LongForm() {
  const [form] = useForm();

  const handleFinish = (values: Store) => {
    console.log(values);
  };

  const handleFinishFailed = (errorInfo: ValidateErrorEntity<Store>) => {
    console.error(errorInfo);
  };

  return (
    <Container>
      <KeyboardAwareView>
        <ScrollView>
          <WingBlank>
            <Form form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
              <FormItem name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <InputItem required label="姓名" placeholder="请输入姓名" inputStyle={{ textAlign: 'right' }} />
              </FormItem>
              <FormItem name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                <InputItem
                  keyboardType="email-address"
                  required
                  label="邮箱"
                  placeholder="请输入邮箱"
                  inputStyle={{ textAlign: 'right' }}
                />
              </FormItem>
              <FormListItem title="性别" name="gender" required rules={[{ required: true, message: '请选择性别' }]}>
                <Radio
                  options={[
                    { label: '男', value: '1' },
                    { label: '女', value: '0' },
                    { label: '保密', value: '-' },
                  ]}
                />
              </FormListItem>
              <FormListItem title="年龄" name="age" required rules={[{ required: true, message: '请选择年龄' }]}>
                <Stepper min={0} />
              </FormListItem>
              <FormListItem
                title="身份证号"
                name="idcard"
                required
                rules={[{ required: true, message: '请输入身份证号' }]}
              >
                <NumberKeyboardItem type="IdCard" placeholder="请输入身份证号" inputStyle={{ textAlign: 'right' }} />
              </FormListItem>
              <FormListItem
                title="爱好"
                name="favorites"
                minHeight={px(32)}
                required
                rules={[{ required: true, message: '请选择爱好' }]}
              >
                <Checkbox
                  showCheckAll={false}
                  options={[
                    { label: '钓鱼', value: '1' },
                    { label: '看书', value: '0' },
                    { label: '跑步', value: '3' },
                  ]}
                />
              </FormListItem>
              <FormListItem
                title="出生地"
                name="residences"
                required
                rules={[{ required: true, message: '请选择出生地' }]}
              >
                <PickerItem cascade data={residences} style={{ height: px(32) }} />
              </FormListItem>
              <FormListItem
                title="出生日期"
                name="birthday"
                required
                rules={[{ required: true, message: '请选择出生日期' }]}
              >
                <DatePickerItem style={{ height: px(32) }} />
              </FormListItem>
              <FormListItem title="公开个人资料" name="public" valuePropName="checked">
                <Switch />
              </FormListItem>
              <FormListItem name="avatar" title="个人头像">
                <ImagePicker onGrantFail={() => console.log('111')}>
                  <Box
                    width="100%"
                    flex={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderWidth={ONE_PIXEL}
                    borderColor="border"
                  >
                    <Text>上传照片</Text>
                  </Box>
                </ImagePicker>
              </FormListItem>
              <FormItem name="info">
                <TextArea label="个人简介" placeholder="请输入姓名" />
              </FormItem>
              <FormItem name="website" rules={[{ required: true, message: '请输入个人网站' }]}>
                <InputItem
                  returnKeyType="done"
                  keyboardType="url"
                  required
                  label="个人网站"
                  placeholder="请输入个人网站"
                  inputStyle={{ textAlign: 'right' }}
                />
              </FormItem>
            </Form>
            <WhiteSpace />
            <Button title="提交" onPress={form.submit} />
          </WingBlank>
        </ScrollView>
      </KeyboardAwareView>
    </Container>
  );
}
```

## 处理异常问题

异常处理问题一直是开发人员比较头疼的问题，尤其是在 APP 上表现得会更加严重，毕竟没有人会希望 APP 在使用过程中无故白屏或者崩溃。那么我们应该怎么优雅地处理 RN APP 中的异常问题呢？我们可以借助两个库来帮助我们实现更好的异常处理：

- react-error-boundary 处理 React 组件的异常问题
- react-native-exception-handler 处理 JavaScript 和原生模块的异常问题

先来介绍`react-error-boundary`。 `[ErrorBoundary](https://reactjs.org/docs/error-boundaries.html)`这个概念是在 React 16 中首次提出，它的主要目的是为了捕获组件在生命周期和渲染过程中出现的异常。`react-error-boundary`是基于`ErrorBoundary`的一个可复用组件，使用它包裹你要处理的组件，它会自动捕获这个组件以及它的所有子组件的异常，同时也提供一个好办法来恢复。在 RN APP 开发中，比较推荐的最佳实践是，用`react-error-boundary`包裹每一个导航页面，提供一个回退组件（出现异常时用来代替）来展示一个更友好的提示信息，也可以顺便提供一个重新刷新的功能尝试重新渲染该页面。

1. 封装一个全局的`ErrorHandler`组件：

```tsx | pure
import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Text, View } from 'react-native';

function errorHandler(error: Error) {
  // 对error做处理，比如接入Sentry进行异常上报
  console.error(error);
}

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <View>
      <Text>对不起，这个页面出问题了</Text>
      <Button title="重试" onPress={resetErrorBoundary} />
    </View>
  );
}

export const ErrorHandler: FC = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
    {children}
  </ErrorBoundary>
);
```

2. 在页面中使用：

```tsx | pure
import React from 'react';

export default HomepageScreen() {
  return (
    <ErrorHandler>
      <Container>
        <View>
          <Text>我是首页</Text>
        </View>
      </Container>
    </ErrorHandler>
  );
}
```

到目前为止，我们已经可以对组件的异常进行很好的处理，接下来我们来看看 JS 异常和原生模块异常我们应该怎么捕获。我们需要借助`react-native-exception-handler`。在项目根目录下的`index.js`里面添加以下代码：

```js
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

setJSExceptionHandler((error, isFatal) => {
  // 在这里进行处理，比如做一个弹窗提示，或者把异常上报给sentry
});

setNativeExceptionHandler(nativeExceptionHandler, forceAppQuit, executeDefaultHandler);
```

## 数据存储
在项目中我们使用`react-native-mmkv`代替`react-native-async-storage`作为数据本地存储的介质。
相比于`AsyncStorage`， `MMKV`的优势在于：
- 可以直接get/set 字符串、boolean、数字类型
- 代码是同步的，不需要async/await
- 快！比`AsyncStorage`快30倍
- 支持数据加密
- 支持多实例（可以区分全局数据和用户数据）
- 支持hooks，更方便地操作数据

更多使用可以查看[react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)

## 热更新
在项目中我们使用`react-native-code-push`实现热更新功能。热更新功能可以让我们在不需要提交app审核的前提下快速修复一些线上的bug。
它的配置和使用也很简单，可以直接按照官方手册里面的步骤操作集成就好。

在我们的模板中，我们将code-push相关的配置提取在了.env文件中分别进行管理：
```code
// .env.staging
CODEPUSH_KEY_ANDROID=7JyUASUIcBijBdYfxwjeTre4h7Zy4ksvOXqog
CODEPUSH_KEY_IOS=jKGov823Qs8kbwMKVORFIApNPDmd4ksvOXqog
CODEPUSH_URL=http://192.168.1.82:3000/

// .env.prod
CODEPUSH_KEY_ANDROID=QUXw82coUTYHlRQg6KtBX3fyrGy04ksvOXqog
CODEPUSH_KEY_IOS=CwcmEJIIOvuyoYi3HuJLAFIaLbMX4ksvOXqog
CODEPUSH_URL=http://192.168.1.82:3000/
```
具体这个`deploymentKey`怎么生成的，可以看看`code-push`的readme里面有详细的介绍。
另外，`CODEPUSH_URL`默认值是`https://codepush.appcenter.ms/`，你也可以私有化部署一个自己的code push服务端，然后把这里修改为你自己服务端的IP地址。

我司使用的是:

`https://github.com/shm-open/code-push-server`

`https://github.com/shm-open/code-push-cli`

两者配合使用。

## 优化 git 提交记录

一个比较好的 git 提交记录，应该明确地指出本次提交的目的，修改的内容，是否有相关的 issue 等。但是实际工作中大家对 git 提交记录重视不够，提交 message 随便写，导致后期在想要做诸如版本回退，版本切换等操作时，无法根据提交记录准确定位到具体某个提交。所以我们需要借助一些技术手段来让团队开发成员提交更加规范的 git 记录。同时，还可以做一些提交前的代码检查，运行测试用例等操作让提交的代码没有问题。这里需要借助以下几个库：

- husky -lint-staged
- commitlint -commitizen

具体配置信息可以查看以上库的说明，以及项目中的具体配置。最终的效果：

1. 执行`yarn commit`命令，会弹出以下界面：

![commit-01](../images/commit-01.png)

根据提示一步一步操作，最后将看到以下界面：

![commit-02](../images/commit-02.png)

输入 yes 后，程序自动执行 typescript 代码检查、eslint 代码检查、prettier 代码检查、运行测试用例，如果这些有任何一个失败了，则本次提交会自动失败。

## 前后端接口联调

在实际项目中使用 pont，让我们获得的最大好处就是极大地提高了前后端在接口联调上的效率。pont 可以基于后端生成的 swagger 文档和我们定制的模板文件，自动为我们生成后端接口定义文件以及相应的类型声明文件和初始值。在后端接口发生改变的时候，pont 也可以自动感知到变化，借助 vscode 的 pont 插件，可以非常方便地同步这些改变生成新的文件，保持前端接口文件和类型声明跟后端接口、字段的一致性。这样一来，前后端之间最大的沟通成本就得到了解决。

## 集成对 WEBP 格式图片的支持

相比于传统的png和jpeg格式，webp格式对于压缩图片大小有非常大的提升效果。这有助于进一步减小我们生成的jsbundle文件，加速app的启动以及热更新的下载速度。
在项目中，我们内置了一个webp的shell脚本，开发者可以执行这个脚本将app内用到的所有png格式的图片一键转成webp格式，极大地提升了开发体验。
