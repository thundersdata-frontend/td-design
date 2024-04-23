import { useEffect } from 'react';
import { Keyboard, PermissionsAndroid, Platform } from 'react-native';
import { ImagePickerResponse, launchImageLibrary, launchCamera as launchRNCamera } from 'react-native-image-picker';

import type { File } from '@td-design/react-native';
import { useBoolean, useSafeState } from '@td-design/rn-hooks';

import { HookProps } from './type';

function getSource(value?: string) {
  if (value && (value.startsWith('http') || value.startsWith('file:'))) {
    return value;
  }
  return undefined;
}

export default function useImagePicker({
  value,
  options,
  showUploadImg,
  onBeforeUpload,
  onUpload,
  onAfterUpload,
  onCancel,
  onFail,
  onGrantFail,
}: HookProps) {
  /** 打开相册或者摄像头的ActionSheet */
  const [launchVisible, { setTrue: setLaunchVisibleTrue, setFalse: setLaunchVisibleFalse }] = useBoolean(false);
  /** 打开预览或者删除的ActionSheet */
  const [visible, { setTrue: setVisibleTrue, setFalse: setVisibleFalse }] = useBoolean(false);
  /** 打开预览图片的弹窗 */
  const [previewVisible, { setTrue: setPreviewVisibleTrue, setFalse: setPreviewVisibleFalse }] = useBoolean(false);

  const [currentImgSource, setCurrentImgSource] = useSafeState<string | undefined>(getSource(value));
  const [loading, setLoading] = useSafeState(false);

  useEffect(() => {
    const source = getSource(value);
    if (showUploadImg) {
      setCurrentImgSource(source);
    }
  }, [value, showUploadImg]);

  /** 打开相册 */
  const launchLibrary = async () => {
    const response = await launchImageLibrary(options);
    handleCallback(response);
  };

  /** 打开摄像头 */
  const launchCamera = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (result !== 'granted') {
        onGrantFail?.();
        return;
      }
    }
    const response = await launchRNCamera(options);
    handleCallback(response);
  };

  /** 打开相册或者摄像头的回调函数 */
  const handleCallback = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      // 用户取消上传 回调
      onCancel?.(response);
    } else if (response.errorCode) {
      // 上传失败 回调
      onFail?.(response);
    }

    if (!response.assets || response.assets.length === 0) return;

    const file: File = {
      fileName: response.assets[0].fileName!,
      fileType: response.assets[0].type!,
      uri: response.assets[0].uri!,
      fileSize: response.assets[0].fileSize!,
    };
    // 执行上传前的操作及判断
    if (onBeforeUpload) {
      const result = await onBeforeUpload(file);
      if (!result) {
        return;
      }
    }
    setLoading(true);
    const result = await onUpload?.(file);
    setLoading(false);
    onAfterUpload?.(result);
    if (result && showUploadImg) {
      setCurrentImgSource(result);
    }
  };

  const previewImage = () => {
    setVisibleFalse();
    setPreviewVisibleTrue();
  };

  const deleteImage = () => {
    onAfterUpload?.(undefined);
    setCurrentImgSource(undefined);
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
