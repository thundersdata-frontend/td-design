export interface Response {
  customButton: string;
  didCancel: boolean;
  error: string;
  data: string;
  uri: string;
  origURL?: string;
  isVertical: boolean;
  width: number;
  height: number;
  fileSize: number;
  type?: string;
  fileName?: string;
  path?: string;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
}

interface StorageOptions {
  skipBackup?: boolean;
  path?: string;
  cameraRoll?: boolean;
  waitUntilSaved?: boolean;
}

export interface Options {
  title?: string;
  cancelButtonTitle?: string;
  takePhotoButtonTitle?: string;
  chooseFromLibraryButtonTitle?: string;
  customButtons?: Array<CustomButtonOptions>;
  cameraType?: 'front' | 'back';
  mediaType?: 'photo' | 'video' | 'mixed';
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  videoQuality?: 'low' | 'medium' | 'high';
  durationLimit?: number;
  rotation?: number;
  allowsEditing?: boolean;
  noData?: boolean;
  storageOptions?: StorageOptions;
}

export interface ImgSourceProps {
  uri: string;
}

export interface StoreProps {
  [name: string]: any;
}

export interface FileProps {
  fileName: string;
  fileType: string;
  uri: string;
}

export interface FileResponseProps {
  createdAt: number;
  dirId?: number;
  fileId: number;
  fileName: string;
  fileSize: number;
  path?: string;
  updatedAt: number;
  url: string;
}
