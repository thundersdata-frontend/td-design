import { useEffect } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { TapRatingProps } from './type';

export default function useTapRating({
  rating = 3,
  onFinishRating,
}: Pick<TapRatingProps, 'rating' | 'onFinishRating'>) {
  const [position, setPosition] = useSafeState(rating);

  useEffect(() => {
    setPosition(rating);
  }, [rating]);

  const handleSelect = (position: number) => {
    setPosition(position);
    onFinishRating?.(position);
  };

  return { position, handleSelect: useMemoizedFn(handleSelect) };
}
