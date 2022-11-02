import { useBoolean, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import { Keyboard, PermissionsAndroid, Platform } from 'react-native';
import {
  CameraOptions,
  launchImageLibrary,
  launchCamera as launchRNCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import type { File, ImagePickerProps } from '.';

function getSource(value?: string) {
  if (value && (value.startsWith('http') || value.startsWith('file:'))) {
    return value;
  }
  return '';
}

export default function useImagePicker({
  value,
  options,
  showUploadImg = true,
  beforeUpload,
  upload,
  uploadFinish,
  onCancel,
  onFail,
  onGrantFail,
  cameraRationale,
  libraryRationale,
}: ImagePickerProps) {
  /** 打开相册或者摄像头的ActionSheet */
  const [launchVisible, { setTrue: setLaunchVisibleTrue, setFalse: setLaunchVisibleFalse }] = useBoolean(false);
  /** 打开预览或者删除的ActionSheet */
  const [visible, { setTrue: setVisibleTrue, setFalse: setVisibleFalse }] = useBoolean(false);
  /** 打开预览图片的弹窗 */
  const [previewVisible, { setTrue: setPreviewVisibleTrue, setFalse: setPreviewVisibleFalse }] = useBoolean(false);

  const [currentImgSource, setCurrentImgSource] = useSafeState<string>(getSource(value));
  const [loading, setLoading] = useSafeState(false);

  useUpdateEffect(() => {
    const source = getSource(value);
    setCurrentImgSource(source);
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
        return;
      }
    }
    setTimeout(() => {
      launchImageLibrary(
        {
          ...initialOptions,
          ...options,
        },
        handleCallback
      );
    }, 200);
  };

  /** 打开摄像头 */
  const launchCamera = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, cameraRationale);
      if (result !== 'granted') {
        onGrantFail();
        return;
      }
    }
    setTimeout(() => {
      launchRNCamera(
        {
          ...initialOptions,
          ...options,
        },
        handleCallback
      );
    }, 200);
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
    setVisibleFalse();
    setPreviewVisibleTrue();
  };

  const deleteImage = () => {
    uploadFinish?.('');
    setCurrentImgSource('');
    setVisibleFalse();
  };

  const handlePress = () => {
    Keyboard.dismiss();
    setLaunchVisibleTrue();
  };

  const handleLongPress = () => {
    Keyboard.dismiss();
    if (showUploadImg && currentImgSource) {
      setVisibleTrue();
    }
  };

  return {
    currentImgSource,
    loading,
    launchLibrary,
    launchCamera,
    launchVisible,
    previewImage,
    deleteImage,
    handlePress,
    handleLongPress,
    previewVisible,
    visible,
    setVisibleFalse,
    setLaunchVisibleFalse,
    setPreviewVisibleFalse,
  };
}
