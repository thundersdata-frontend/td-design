/*
 * @文件描述: image-picker 图片选择
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-09-17 14:57:22
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-09-18 14:31:42
 */

import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, ImageSourcePropType } from 'react-native';
import RNImagePicker from 'react-native-image-picker';
import { useTheme, VariantProps } from '@shopify/restyle';
import { isEmpty } from 'lodash-es';
import { Options, Response, ImgSourceProps, StoreProps, FileProps } from './type';
import Text from '../text';
import Icon from '../icon';
import { px, conditionalStyle } from '../helper';
import { Theme } from '../config/theme';

type ImagePickerProps = CustomImagePickerProps & VariantProps<Theme, 'textVariants'>;

interface CustomImagePickerProps {
  /** 上传的地址 */
  action: string;
  /** 上传的额外参数 */
  data?: StoreProps;
  /** 设置上传头部 */
  headers?: StoreProps;
  /** 上传边框样式类型,分别为虚线框，实线框 */
  borderStyle?: 'dashed' | 'solid';
  /** 中间 icon 样式类型,分别为圆框相机，新增标志，实线相机 */
  icon?: 'roundCamera' | 'plus' | 'linedCamera';
  /** 初始化背景图,不传则没有背景图，如果是 showUploadImg 模式，上传后会自动展示图片 */
  initialImgSource?: ImageSourcePropType;
  /** 其他图片自定义配置,详细参考react-native-image-picker的option配置 */
  imgConfig?: Options;
  /** 悬浮提示文字 */
  title?: string;
  /** 上传图片后是否在背景图展示，如果为 true 上传后会自动展示上传图片(此时只能上传一张) */
  showUploadImg?: boolean;
  /** 通过覆盖默认的上传行为，可以自定义自己的上传实现，需要在file返回文件结果，success返回上传是否成功 */
  customRequest?:
    | ((file: FileProps) => { success: boolean; file: string })
    | ((file: FileProps) => Promise<{ success: boolean; file: string }>);
  /** 取消上传事件回调 */
  onCancel?: (response: Response) => void;
  /** 上传失败事件回调 */
  onFailed?: (response: Response) => void;
  /** 上传成功事件回调,返回文件路径和文件名称 */
  onSuccess?: (file: { fileUrl: string; fileName?: string }) => void;
}

/** 初始化自定义配置 */
const initialImageOptions: Options = {
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

const ImagePicker: React.FC<ImagePickerProps> = props => {
  const theme = useTheme<Theme>();
  const {
    action,
    data = {},
    initialImgSource = false,
    headers = INITIAL_HEADERS,
    title = '上传图片',
    imgConfig = {},
    showUploadImg = false,
    borderStyle = 'solid',
    icon = 'roundCamera',
    customRequest,
    onCancel,
    // TODO: 用弹窗提示
    onFailed = () => console.log('上传失败！'),
    // TODO: 用弹窗提示
    onSuccess = () => console.log('上传成功！'),
    ...restStyle
  } = props;
  const [currentImgSource, setCurrentImgSource] = useState<ImgSourceProps>();
  const imagePickerOptions = { ...initialImageOptions, ...imgConfig };
  const { color: thirdBodyColorName } = theme.textVariants.thirdBody;
  const thirdBodyColor = theme.colors[thirdBodyColorName];
  // 图标是否为圆形照相机
  const isRoundCamera = icon === 'roundCamera';

  const styles = StyleSheet.create({
    backgroundImg: {
      width: px(100),
      height: px(100),
      marginLeft: px(28),
      zIndex: 0,
      borderRadius: px(6),
      borderWidth: 1,
      borderColor: theme.colors.primaryTipColor,
      borderStyle,
      overflow: 'hidden',
      ...restStyle,
    },
    iconWrap: {
      marginTop: px(24),
      textAlign: 'center',
    },
    titleText: {
      marginTop: px(2),
      textAlign: 'center',
    },
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
      if (response.error) {
        // TODO: 用弹窗提示
        console.log(response.error);
        return;
      }
      if (response.didCancel && onCancel) {
        // 用户取消上传 回调
        onCancel(response);
      } else if (response.error) {
        // 上传失败 回调
        onFailed(response);
      } else {
        const source = { uri: response.uri };
        const file = {
          fileName: response.fileName!,
          fileType: response.type!,
          uri: response.uri,
        };
        const uploadMethod = customRequest || uploadFile;
        // 上传成功 回调
        const uploadResult = await uploadMethod(file);
        if (uploadResult.success) {
          setCurrentImgSource(source);
          onSuccess({ fileUrl: uploadResult.file, fileName: response.fileName });
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
        // TODO: 用弹窗提示
        console.log(result.message);
      }
      return {
        success: result.success,
        file: result.data || '',
      };
    } catch (error) {
      if (error.message) {
        // TODO: 用弹窗提示
        console.log(error.message);
      }
      return {
        success: false,
        file: '',
      };
    }
  };

  /** 渲染图标 */
  const renderIcon = () => {
    switch (icon) {
      case 'plus':
        return <Icon name="plus" color={thirdBodyColor} size={44} />;
      case 'linedCamera':
        return <Icon name="camera" color={thirdBodyColor} size={42} />;
      case 'roundCamera':
      default:
        return <Icon shadow rounded name="camera" color={theme.colors.primaryColor} size={34} />;
    }
  };

  return (
    <TouchableOpacity onPress={handleUploadImage}>
      <ImageBackground
        source={showUploadImg ? currentImgSource || initialImgSource || INITIAL_BG_VALUE : INITIAL_BG_VALUE}
        style={styles.backgroundImg}
      >
        {(!currentImgSource || !showUploadImg) && (
          <>
            <Text style={[styles.iconWrap, conditionalStyle(isRoundCamera, { marginTop: 20 })]}>{renderIcon()}</Text>
            <Text style={[styles.titleText, conditionalStyle(isRoundCamera, { marginTop: px(4) })]} variant="thirdBody">
              {title}
            </Text>
          </>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ImagePicker;
