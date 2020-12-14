import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, ImageSourcePropType, Platform, TextStyle, StyleProp } from 'react-native';
import RNImagePicker, { ImagePickerOptions, ImagePickerResponse } from 'react-native-image-picker';
import { useTheme, SpacingProps, useRestyle, spacing } from '@shopify/restyle';
import { isEmpty } from 'lodash-es';
import Flex from '../flex';
import Text from '../text';
import Icon from '../icon';
import Toast from '../toast';
import { px } from '../helper';
import { Theme } from '../config/theme';

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

type ImagePickerProps = CustomImagePickerProps & SpacingProps<Theme>;

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
  imgConfig?: ImagePickerOptions;
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
  onFailed?: (response: ImagePickerResponse) => void;
  /** 上传成功事件回调,返回文件路径和文件名称 */
  onSuccess?: (file: UploadResponse) => void;
}

// 初始化图片上传配置
const initialImageOptions: ImagePickerOptions = {
  title: '选择图片',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  mediaType: 'photo',
  chooseFromLibraryButtonTitle: '图片库',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
};

// 背景图不显示图片默认值
const INITIAL_BG_VALUE = 0;

// 初始化请求头部
const INITIAL_HEADERS = {
  'Content-Type': 'multipart/form-data',
};

const restyleFunctions = [spacing];

const ImagePicker: React.FC<ImagePickerProps> = props => {
  const theme = useTheme<Theme>();
  // 默认展示的 icon
  const defaultIcon = <Icon name="plus" color={theme.colors.secondaryTextColor} size={44} />;
  const {
    action,
    data = {},
    initialImgSource = false,
    headers = INITIAL_HEADERS,
    title = '上传图片',
    imgConfig = {},
    showUploadImg = false,
    borderStyle = 'solid',
    icon = defaultIcon,
    customRequest,
    beforeUpload,
    onCancel,
    onFailed = () => Toast.fail({ content: '上传失败！' }),
    onSuccess = () => Toast.success({ content: '上传成功！' }),
    ...restProps
  } = props;
  const [currentImgSource, setCurrentImgSource] = useState<ImageSourcePropType>();
  const imagePickerOptions = { ...initialImageOptions, ...imgConfig };

  // 背景图属性
  const imageProps = useRestyle(restyleFunctions, {
    style: {
      width: px(100),
      height: px(100),
      marginLeft: px(28),
      zIndex: 0,
      borderRadius: px(6),
      borderWidth: 1,
      borderColor: theme.colors.primaryTipColor,
      borderStyle,
      overflow: 'hidden',
    },
    ...restProps,
  });

  // 从 data 中获得请求的 url 参数字符串
  const getQueryUrl = (action: string, data: StoreProps) => {
    if (isEmpty(data)) {
      return action;
    }
    const paramsString = Object.keys(data)
      .map(item => `${item}=${data[item]}`)
      .join('&');
    return `${action}?${paramsString}`;
  };

  /** ImagePicker上传调用 */
  const handleUploadImage = () => {
    RNImagePicker.showImagePicker(imagePickerOptions, async response => {
      if (response.didCancel && onCancel) {
        // 用户取消上传 回调
        onCancel(response);
      } else if (response.error) {
        Toast.fail({ content: response.error });
        // 上传失败 回调
        onFailed(response);
      } else {
        const source = { uri: response.uri };
        const file = {
          fileName: response.fileName!,
          fileType: response.type!,
          uri: response.uri,
        };
        // 执行上传前的操作及判断
        if (beforeUpload) {
          const result = await beforeUpload(file);
          if (!result) {
            return;
          }
        }
        const uploadMethod = customRequest || uploadFile;
        // 上传成功 回调
        const uploadResult = await uploadMethod(file);
        if (uploadResult.success) {
          setCurrentImgSource(source);
          onSuccess(uploadResult.file);
        }
      }
    });
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

  // 根据 ios 和 android 表现不同获得对应 title 样式
  const getTitleStyle = () =>
    [
      { textAlign: 'center' },
      Platform.select({
        android: {
          marginTop: 0,
        },
        ios: {
          marginTop: px(6),
        },
        default: {
          marginTop: 0,
        },
      }),
    ] as StyleProp<TextStyle>;

  /** 渲染悬浮标题文字 */
  const renderTitle = () =>
    typeof title === 'string' ? (
      <Text style={getTitleStyle()} variant="thirdBody">
        {title}
      </Text>
    ) : (
      title
    );

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleUploadImage}>
      <ImageBackground
        source={showUploadImg ? currentImgSource || initialImgSource || INITIAL_BG_VALUE : INITIAL_BG_VALUE}
        {...imageProps}
      >
        {(!currentImgSource || !showUploadImg) && (
          <>
            <Flex justifyContent="center" marginTop="xl">
              {icon}
            </Flex>
            {renderTitle()}
          </>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ImagePicker;
