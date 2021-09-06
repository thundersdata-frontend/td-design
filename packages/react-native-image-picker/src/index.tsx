import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Keyboard,
  Rationale,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  ImagePickerResponse,
  CameraOptions,
  launchImageLibrary,
  launchCamera as launchRNCamera,
} from 'react-native-image-picker';
import { useTheme } from '@shopify/restyle';
import { helpers, Theme, ActionSheet, Box, Indicator, Modal } from '@td-design/react-native';

const { px, ONE_PIXEL, deviceWidth, deviceHeight } = helpers;
const { UIActivityIndicator } = Indicator;
export interface File {
  fileName: string;
  fileType: string;
  uri: string;
  fileSize?: number;
}

interface ImagePickerProps {
  width?: number;
  height?: number;
  value?: string;
  /** 其他图片自定义配置,详细参考react-native-image-picker的option配置 */
  options?: CameraOptions;
  /** 上传图片后是否在背景图展示，如果为 true 上传后会自动展示上传图片(此时只能上传一张) */
  showUploadImg?: boolean;
  /** 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传,同时可以在里面执行一些上传提示操作 */
  beforeUpload?: (file: File) => boolean | ((file: File) => Promise<boolean>);
  /** 上传 */
  upload?: (file: File) => Promise<string>;
  /** 上传完成 */
  uploadFinish?: (result?: string) => void;
  /** 取消上传事件回调 */
  onCancel?: (response: ImagePickerResponse) => void;
  /** 上传失败事件回调 */
  onFail?: (response: ImagePickerResponse) => void;
  /** 授权失败的回调 */
  onGrantFail: () => void;
  /** 打开相册授权的文本 */
  libraryRationale?: Rationale;
  /** 打开摄像头授权的文本 */
  cameraRationale?: Rationale;
  /**打开相册文本 */
  launchLibraryText?: string;
  /** 打开摄像头文本 */
  launchCameraText?: string;
  /** 预览图片文本 */
  previewImgText?: string;
  /** 删除图片文本 */
  deleteImgText?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = props => {
  const theme = useTheme<Theme>();
  const {
    value,
    width = px(100),
    height = px(100),
    options = {},
    showUploadImg = true,
    beforeUpload,
    upload,
    uploadFinish,
    onCancel,
    onFail,
    onGrantFail,
    cameraRationale = {
      title: '获取摄像头权限',
      message: '若不允许，您将无法使用摄像头功能',
      buttonPositive: '同意',
      buttonNegative: '取消',
      buttonNeutral: '下次再说',
    },
    libraryRationale = {
      title: '获取读取文件权限',
      message: '若不允许，您将无法访问图库',
      buttonPositive: '同意',
      buttonNegative: '取消',
      buttonNeutral: '下次再说',
    },
    launchLibraryText = '打开相册',
    launchCameraText = '打开摄像头',
    previewImgText = '预览图片',
    deleteImgText = '删除图片',
  } = props;

  /** 打开相册或者摄像头的ActionSheet */
  const [launchVisible, setLaunchVisible] = useState(false);
  /** 打开预览或者删除的ActionSheet */
  const [visible, setVisible] = useState(false);
  /** 打开预览图片的弹窗 */
  const [previewVisible, setPreviewVisible] = useState(false);

  const [currentImgSource, setCurrentImgSource] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value && value.startsWith('http')) {
      setCurrentImgSource(value);
    } else {
      setCurrentImgSource('');
    }
  }, [value]);

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
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        libraryRationale
      );
      if (result !== 'granted') {
        onGrantFail();
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
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, cameraRationale);
      if (result !== 'granted') {
        onGrantFail();
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
    try {
      if (response.didCancel) {
        // 用户取消上传 回调
        onCancel?.(response);
      } else if (response.errorCode) {
        // 上传失败 回调
        onFail?.(response);
      } else {
        if (!response.assets || response.assets.length === 0) return;

        const file: File = {
          fileName: response.assets[0].fileName!,
          fileType: response.assets[0].type!,
          uri: response.assets[0].uri!,
          fileSize: response.assets[0].fileSize!,
        };
        // 执行上传前的操作及判断
        if (beforeUpload) {
          const result = await beforeUpload(file);
          if (!result) {
            return;
          }
        }
        setLoading(true);
        const result = await upload?.(file);
        setLoading(false);
        uploadFinish?.(result);
        if (result) {
          setCurrentImgSource(result);
        }
      }
    } catch (error) {
      setLoading(false);
      throw new Error('图片选择器出问题了');
    }
  };

  const previewImage = () => {
    setVisible(false);
    setPreviewVisible(true);
  };

  const deleteImage = () => {
    uploadFinish?.('');
    setCurrentImgSource('');
    setVisible(false);
  };

  return (
    <Box>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          Keyboard.dismiss();
          setLaunchVisible(true);
        }}
        onLongPress={() => {
          Keyboard.dismiss();
          if (showUploadImg && currentImgSource) {
            setVisible(true);
          }
        }}
        disabled={loading}
        style={{ justifyContent: 'center', alignItems: 'center', width, height }}
      >
        {showUploadImg && currentImgSource ? (
          <Image
            source={{ uri: currentImgSource }}
            style={{
              width,
              height,
              borderRadius: theme.borderRadii.x1,
            }}
          />
        ) : (
          props.children
        )}
      </TouchableOpacity>
      {loading && (
        <Box
          width={width}
          height={height}
          borderWidth={ONE_PIXEL}
          borderColor="border"
          borderRadius="x1"
          justifyContent="center"
          alignItems="center"
          backgroundColor="mask"
          position="absolute"
          top={0}
          left={0}
        >
          <UIActivityIndicator size={px(24)} color={theme.colors.primary200} />
        </Box>
      )}
      <ActionSheet
        data={[
          { text: launchLibraryText, onPress: launchLibrary },
          { text: launchCameraText, onPress: launchCamera },
        ]}
        onCancel={() => setLaunchVisible(false)}
        visible={launchVisible}
      />
      <ActionSheet
        data={[
          { text: previewImgText, onPress: previewImage },
          { text: deleteImgText, onPress: deleteImage, type: 'danger' },
        ]}
        onCancel={() => setVisible(false)}
        visible={visible}
      />
      <Modal visible={previewVisible} onClose={() => setPreviewVisible(false)} position="fullscreen">
        <TouchableWithoutFeedback onPress={() => setPreviewVisible(false)}>
          <Image
            source={{ uri: currentImgSource }}
            style={{
              width: deviceWidth,
              height: deviceHeight,
            }}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      </Modal>
    </Box>
  );
};

export default ImagePicker;
