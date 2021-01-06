import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {
  ImagePickerResponse,
  CameraOptions,
  launchImageLibrary,
  launchCamera as launchRNCamera,
} from 'react-native-image-picker/src';
import { useTheme, SpacingProps, useRestyle, spacing } from '@shopify/restyle';
import { isEmpty } from 'lodash-es';

import Text from '../text';
import Icon from '../icon';
import Toast from '../toast';
import { px } from '../helper';
import { Theme } from '../config/theme';
import ActionSheet from '../action-sheet';
import Box from '../box';

export interface StoreProps {
  [name: string]: any;
}

export interface File {
  fileName: string;
  fileType: string;
  uri: string;
}

export interface UploadResponse {
  createdAt: number;
  dirId?: number;
  fileId: number;
  fileName: string;
  fileSize: number;
  path?: string;
  updatedAt: number;
  url: string;
}

interface CustomImagePickerProps {
  /** 上传的地址 */
  action: string;
  /** 上传的额外参数 */
  data?: StoreProps;
  /** 设置上传头部 */
  headers?: StoreProps;
  /** 上传边框样式类型,分别为虚线框，实线框 */
  borderStyle?: 'dashed' | 'solid';
  /** 中间 icon，如果需要主题色需要自己传入 theme 里的 color，不传默认显示加号 icon */
  icon?: React.ReactNode;
  /** 初始化背景图,不传则没有背景图，如果是 showUploadImg 模式，上传后会自动展示图片 */
  initialImgSource?: ImageSourcePropType;
  /** 其他图片自定义配置,详细参考react-native-image-picker的option配置 */
  options?: CameraOptions;
  /** 悬浮提示文字,支持传入 dom */
  title?: React.ReactNode;
  /** 上传图片后是否在背景图展示，如果为 true 上传后会自动展示上传图片(此时只能上传一张) */
  showUploadImg?: boolean;
  /** 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传,同时可以在里面执行一些上传提示操作 */
  beforeUpload?: (file: File) => boolean | ((file: File) => Promise<boolean>);
  /** 通过覆盖默认的上传行为，可以自定义自己的上传实现，需要在file返回文件结果，success返回上传是否成功 */
  customRequest?: (file: File) => Promise<{ success: boolean; file: string }>;
  /** 取消上传事件回调 */
  onCancel?: (response: ImagePickerResponse) => void;
  /** 上传失败事件回调 */
  onFail?: (response: ImagePickerResponse) => void;
  /** 上传成功事件回调,返回文件路径和文件名称 */
  onSuccess?: (file: UploadResponse) => void;
}
type ImagePickerProps = CustomImagePickerProps & SpacingProps<Theme>;

// 背景图不显示图片默认值
const INITIAL_BG_VALUE = 0;

// 初始化请求头部
const INITIAL_HEADERS = {
  'Content-Type': 'multipart/form-data',
};

const restyleFunctions = [spacing];

const ImagePicker: React.FC<ImagePickerProps> = props => {
  const theme = useTheme<Theme>();
  const {
    action,
    data = {},
    initialImgSource = INITIAL_BG_VALUE,
    headers = INITIAL_HEADERS,
    title = '上传图片',
    options = {},
    showUploadImg = false,
    borderStyle = 'solid',
    icon = <Icon name="plus" color={theme.colors.secondaryTextColor} size={px(36)} />,
    customRequest,
    beforeUpload,
    onCancel,
    onFail = () => Toast.fail({ content: '上传失败！' }),
    onSuccess = () => Toast.success({ content: '上传成功！' }),
    ...restProps
  } = props;

  const [uploading, setUploading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentImgSource, setCurrentImgSource] = useState<ImageSourcePropType | undefined>(initialImgSource);

  // 初始化图片上传配置
  const initialOptions: CameraOptions = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 1,
    saveToPhotos: false,
    durationLimit: 15,
    videoQuality: 'high',
  };

  // 背景图属性
  const imageProps = useRestyle(restyleFunctions, {
    style: {
      width: px(100),
      height: px(100),
      borderRadius: theme.borderRadii.base,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      borderStyle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ...restProps,
  });

  /**
   * 从 data 中获得请求的 url 参数字符串
   * @param action
   * @param data
   */
  const getQueryUrl = (action: string, data: StoreProps) => {
    if (isEmpty(data)) {
      return action;
    }
    const paramsString = Object.keys(data)
      .map(item => `${item}=${data[item]}`)
      .join('&');
    return `${action}?${paramsString}`;
  };

  /** 打开相册 */
  const launchLibrary = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
        title: '获取读取文件权限',
        message: '请授予APP读取文件的权限',
        buttonPositive: '同意',
        buttonNegative: '取消',
        buttonNeutral: '下次再说',
      });
      if (result !== 'granted') {
        Toast.fail({ content: '对不起，您未授权' });
        return;
      }
    }
    launchImageLibrary(
      {
        ...initialOptions,
        ...options,
      },
      handleCallback
    );
  };

  /** 打开摄像头 */
  const launchCamera = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: '获取摄像头权限',
        message: '请授予APP唤起摄像头的权限',
        buttonPositive: '同意',
        buttonNegative: '取消',
        buttonNeutral: '下次再说',
      });
      if (result !== 'granted') {
        Toast.fail({ content: '对不起，您未授权' });
        return;
      }
    }
    launchRNCamera(
      {
        ...initialOptions,
        ...options,
      },
      handleCallback
    );
  };

  const handleCallback = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      // 用户取消上传 回调
      onCancel?.(response);
    } else if (response.errorCode) {
      // 上传失败 回调
      onFail(response);
    } else {
      const source = { uri: response.uri };
      const file = {
        fileName: response.fileName!,
        fileType: response.type!,
        uri: response.uri!,
      };
      // 执行上传前的操作及判断
      if (beforeUpload) {
        const result = await beforeUpload(file);
        if (!result) {
          return;
        }
      }
      setUploading(true);
      const uploadMethod = customRequest || uploadFile;
      // 上传成功 回调
      const uploadResult = await uploadMethod(file);
      setUploading(false);
      if (uploadResult.success) {
        setCurrentImgSource(source);
        onSuccess(uploadResult.file);
      }
    }
  };

  /** 上传文件 */
  const uploadFile = async ({ fileName, fileType, uri }: { fileName: string; fileType: string; uri: string }) => {
    try {
      const resultData = await RNFetchBlob.fetch('POST', getQueryUrl(action, data), headers, [
        {
          name: 'file',
          filename: fileName,
          type: fileType,
          data: RNFetchBlob.wrap(uri.replace('file://', '')),
        },
      ]);
      const result = resultData.json();
      if (!result.success) {
        Toast.fail({ content: result.message });
      }
      return {
        success: result.success,
        file: result.data || '',
      };
    } catch (error) {
      if (error.message) {
        Toast.fail({ content: error.message });
      }
      return {
        success: false,
        file: '',
      };
    }
  };

  /** 渲染悬浮标题文字 */
  const renderTitle = () => (typeof title === 'string' ? <Text variant="thirdBody">{title}</Text> : title);

  return (
    <>
      <TouchableOpacity disabled={uploading} activeOpacity={0.8} onPress={() => setVisible(true)}>
        <ImageBackground
          source={showUploadImg ? currentImgSource || initialImgSource : INITIAL_BG_VALUE}
          {...imageProps}
        >
          {(!currentImgSource || !showUploadImg) && (
            <>
              {icon}
              {renderTitle()}
            </>
          )}
          {uploading && (
            <Box
              width={px(100)}
              height={px(100)}
              backgroundColor="backgroundColor5"
              position="absolute"
              justifyContent="center"
              alignItems="center"
            >
              <ActivityIndicator color="black" />
            </Box>
          )}
        </ImageBackground>
      </TouchableOpacity>
      <ActionSheet
        data={[
          { text: '打开相册', onPress: launchLibrary },
          { text: '打开摄像头', onPress: launchCamera },
        ]}
        onCancel={() => setVisible(false)}
        visible={visible}
      />
    </>
  );
};

export default ImagePicker;
