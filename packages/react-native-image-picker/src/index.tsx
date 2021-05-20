import React, { useState } from 'react';
import { TouchableOpacity, ImageSourcePropType, Image, Platform, View, PermissionsAndroid } from 'react-native';
import {
  ImagePickerResponse,
  CameraOptions,
  launchImageLibrary,
  launchCamera as launchRNCamera,
} from 'react-native-image-picker/src';
import Svg, { Defs, Rect, Mask, Use, ForeignObject } from 'react-native-svg';
import { useTheme } from '@shopify/restyle';
import { helpers, Theme, Icon, ActionSheet, Text, Toast } from '@td-design/react-native';

const { px } = helpers;
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

interface ImagePickerProps {
  width?: number;
  height?: number;
  /** 上传边框类型,分别为虚线框，实线框 */
  borderType?: 'dashed' | 'solid';
  /** 上传边框颜色 */
  borderColor?: string;
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
  /** 上传 */
  upload?: (file: File) => void;
  /** 取消上传事件回调 */
  onCancel?: (response: ImagePickerResponse) => void;
  /** 上传失败事件回调 */
  onFail?: (response: ImagePickerResponse) => void;
}

// 背景图不显示图片默认值
const INITIAL_BG_VALUE = 0;

const ImagePicker: React.FC<ImagePickerProps> = props => {
  const theme = useTheme<Theme>();
  const {
    width = px(100),
    height = px(100),
    initialImgSource = INITIAL_BG_VALUE,
    title = '上传图片',
    options = {},
    showUploadImg = true,
    borderType = 'solid',
    borderColor,
    icon,
    beforeUpload,
    upload,
    onCancel,
    onFail,
  } = props;

  const [visible, setVisible] = useState(false);
  const [currentImgSource, setCurrentImgSource] = useState<ImageSourcePropType>(initialImgSource);

  // 初始化图片上传配置
  const initialOptions: CameraOptions = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 1,
    saveToPhotos: false,
    durationLimit: 15,
    videoQuality: 'high',
  };

  /** 打开相册 */
  const launchLibrary = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
        title: '获取读取文件权限',
        message: '若不允许，您将无法访问图库',
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
        message: '若不允许，您将无法使用摄像头功能',
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

  /** 打开相册或者摄像头的回调函数 */
  const handleCallback = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      // 用户取消上传 回调
      onCancel?.(response);
    } else if (response.errorCode) {
      // 上传失败 回调
      onFail?.(response);
    } else {
      const source = { uri: response.uri };
      const file: File = {
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
      setCurrentImgSource(source);
      upload?.(file);
    }
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
        {showUploadImg && currentImgSource ? (
          <Image
            source={showUploadImg ? currentImgSource! : INITIAL_BG_VALUE}
            style={{
              width,
              height,
              borderRadius: theme.borderRadii.base,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : (
          <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <Defs>
              <Rect id="prefix__a" x={0} y={0} width={width} height={height} rx={4} />
              <Mask id="prefix__b" x={0} y={0} width={width} height={height} fill="#fff">
                <Use xlinkHref="#prefix__a" />
              </Mask>
            </Defs>
            <Use
              stroke={borderColor ?? theme.colors.imagepicker_border}
              mask="url(#prefix__b)"
              strokeWidth={2}
              xlinkHref="#prefix__a"
              fill="none"
              fillRule="evenodd"
              strokeDasharray={borderType === 'dashed' ? '4,4' : '0'}
            />
            <ForeignObject>
              <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
                {icon ?? <Icon name="plus" color={theme.colors.imagepicker_icon} size={px(32)} />}
                {typeof title === 'string' ? <Text variant="content5">{title}</Text> : title}
              </View>
            </ForeignObject>
          </Svg>
        )}
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
