import { useSafeState, useUpdateEffect, useMemoizedFn, useLatest } from '@td-design/rn-hooks';
import { TapRatingProps } from './type';

export default function useTapRating({
  rating = 3,
  onFinishRating,
}: Pick<TapRatingProps, 'rating' | 'onFinishRating'>) {
  const [position, setPosition] = useSafeState(rating);
  const onFinishRatingRef = useLatest(onFinishRating);

  useUpdateEffect(() => {
    setPosition(rating);
  }, [rating]);

  const handleSelect = (position: number) => {
    setPosition(position);
    onFinishRatingRef.current?.(position);
  };

  return { position, handleSelect: useMemoizedFn(handleSelect) };
}
