import React, { FC, ReactElement, useMemo } from 'react';

import Flex from '../flex';
import Pressable from '../pressable';
import Text from '../text';
import usePagination from './usePagination';

export interface PaginationProps {
  /** 当前页数 */
  page?: number;
  /** 总数量 */
  total: number;
  /** 一页的数量 */
  pageSize?: number;
  /** 页面改变的事件 */
  onChange?: (page: number) => void;
  /** 上一页按钮文字 */
  prevButtonText?: string;
  /** 下一页按钮文字 */
  nextButtonText?: string;
  /** 自定义上一页按钮 */
  prevButtonRender?: (isFirstPage: boolean) => ReactElement;
  /** 自定义下一页按钮 */
  nextButtonRender?: (isLastPage: boolean) => ReactElement;
  /** 自定义计数器 */
  counterRender?: (current: number, totalPage: number) => ReactElement;
  /** 上一页/下一页按下时的不透明度 */
  activeOpacity?: number;
}

const Pagination: FC<PaginationProps> = ({
  page = 1,
  pageSize = 10,
  total,
  onChange,
  prevButtonText = '上一页',
  nextButtonText = '下一页',
  prevButtonRender,
  nextButtonRender,
  counterRender,
  activeOpacity = 0.6,
}) => {
  const { current, prev, next, totalPage, isFirstPage, isLastPage } = usePagination({
    page,
    pageSize,
    total,
    onChange,
  });

  /** 渲染上一页按钮 */
  const PrevBtn = useMemo(() => {
    if (prevButtonRender) {
      return prevButtonRender(isFirstPage);
    }
    return (
      <Text variant="p1" color={isFirstPage ? 'disabled' : 'text'}>
        {prevButtonText}
      </Text>
    );
  }, [isFirstPage, prevButtonRender, prevButtonText]);

  /** 渲染当前页 */
  const Current = useMemo(() => {
    if (counterRender) {
      return counterRender(current, totalPage);
    }
    return (
      <Flex>
        <Text variant="p1" color="primary200">
          {current}
        </Text>
        <Text variant="p1" color="text">
          {' '}
          / {totalPage}
        </Text>
      </Flex>
    );
  }, [counterRender, current, totalPage]);

  /** 渲染下一页按钮 */
  const NextBtn = useMemo(() => {
    if (nextButtonRender) {
      return nextButtonRender(isLastPage);
    }
    return (
      <Text variant="p1" color={isLastPage ? 'disabled' : 'text'}>
        {nextButtonText}
      </Text>
    );
  }, [isLastPage, nextButtonRender, nextButtonText]);

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Pressable activeOpacity={activeOpacity} disabled={isFirstPage} onPress={prev}>
        {PrevBtn}
      </Pressable>
      {Current}
      <Pressable disabled={isLastPage} activeOpacity={activeOpacity} onPress={next}>
        {NextBtn}
      </Pressable>
    </Flex>
  );
};
Pagination.displayName = 'Pagination';

export default Pagination;
