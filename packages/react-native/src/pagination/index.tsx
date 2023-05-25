import React, { FC, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import Flex from '../flex';
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
}) => {
  const { current, setCurrent, totalPage, isFirstPage, isLastPage } = usePagination({ page, pageSize, total });

  /** 渲染上一页按钮 */
  const renderPrevBtn = () => {
    if (prevButtonRender) {
      return prevButtonRender(isFirstPage);
    }
    return (
      <Text variant="p0" color={isFirstPage ? 'disabled' : 'gray500'}>
        {prevButtonText}
      </Text>
    );
  };

  /** 渲染当前页 */
  const renderCurrent = () => {
    if (counterRender) {
      return counterRender(current, totalPage);
    }
    return (
      <Flex>
        <Text variant="p0" color="primary200">
          {current}
        </Text>
        <Text variant="p0" color="gray500">
          {' '}
          / {totalPage}
        </Text>
      </Flex>
    );
  };

  /** 渲染下一页按钮 */
  const renderNextBtn = () => {
    if (nextButtonRender) {
      return nextButtonRender(isLastPage);
    }
    return (
      <Text variant="p0" color={isLastPage ? 'disabled' : 'gray500'}>
        {nextButtonText}
      </Text>
    );
  };

  /** 前一页 */
  const prev = () => {
    const perPage = current - 1;
    setCurrent(perPage);
    onChange?.(perPage);
  };

  /** 后一页 */
  const next = () => {
    const nextPage = current + 1;
    setCurrent(nextPage);
    onChange?.(nextPage);
  };

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <TouchableOpacity activeOpacity={0.5} disabled={isFirstPage} onPress={prev}>
        {renderPrevBtn()}
      </TouchableOpacity>

      {renderCurrent()}

      <TouchableOpacity disabled={isLastPage} activeOpacity={0.5} onPress={next}>
        {renderNextBtn()}
      </TouchableOpacity>
    </Flex>
  );
};
Pagination.displayName = 'Pagination';

export default Pagination;
