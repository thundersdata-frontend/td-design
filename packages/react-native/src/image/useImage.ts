import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { Source, OnProgressEvent } from 'react-native-fast-image';

export default function useImage(source: number | Source) {
  const [loading, setLoading] = useSafeState(false);
  const [progress, setProgress] = useSafeState(0);

  /**
   * 判断图片是网络图片或本地图片
   * 本地图片不需要loading
   * 网络图片需要loading
   */
  const handleStart = () => {
    typeof source === 'object' && setLoading(true);
  };

  /**
   * 图片请求成功
   */
  const handleSuccess = () => {
    setLoading(false);
  };

  /**
   * 图片请求失败
   */
  const handleError = () => {
    setLoading(false);
  };

  /**
   * 图片请求进度
   */
  const handleProgress = (e: OnProgressEvent) => {
    const { loaded, total } = e.nativeEvent;
    // 防止出现Infinity的情况
    if (total && loaded) {
      setProgress(Math.round(100 * (loaded / total)));
    }
  };

  return {
    loading,
    progress,
    handleStart: useMemoizedFn(handleStart),
    handleSuccess: useMemoizedFn(handleSuccess),
    handleError: useMemoizedFn(handleError),
    handleProgress: useMemoizedFn(handleProgress),
  };
}
