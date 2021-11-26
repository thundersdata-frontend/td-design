import { useMemoizedFn, useLatest } from '@td-design/rn-hooks';
import type { AccordionProps } from './index';
import { useImmer } from 'use-immer';

export default function useAccordion({
  multiple = false,
  onChange,
  activeSections = [],
}: Pick<AccordionProps, 'multiple' | 'onChange' | 'activeSections'>) {
  const [currentSections, setCurrentSections] = useImmer(activeSections);
  const changeFn = useLatest(onChange);

  const handleChange = (currentIndex: number) => {
    setCurrentSections(draft => {
      if (!multiple) {
        if (draft[0] === currentIndex) {
          draft = [];
        } else {
          draft[0] = currentIndex;
        }
      } else {
        const index = draft.findIndex(item => item === currentIndex);
        if (index > -1) {
          draft.splice(index, 1);
        } else {
          draft.push(currentIndex);
        }
      }
      changeFn.current?.(draft);
    });
  };

  return {
    currentSections,
    handleChange: useMemoizedFn(handleChange),
  };
}
