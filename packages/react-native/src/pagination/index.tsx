import React, { FC, useState, useEffect, ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Flex from '../flex';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';

interface PaginationProps {
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
  counterRender?: (current: number, totalpages: number) => ReactElement;
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
  const theme = useTheme<Theme>();
  const [current, setCurrent] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrent(page);
  }, [page]);

  useEffect(() => {
    const totalPages = Math.ceil(total / pageSize);
    setTotalPages(totalPages);
  }, [pageSize, total]);

  const isFirstPage = current === 1;
  const isLastPage = current === totalPages;

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isFirstPage}
        onPress={() => {
          const perPage = current - 1;
          setCurrent(perPage);
          onChange?.(perPage);
        }}
      >
        {prevButtonRender ? (
          prevButtonRender(isFirstPage)
        ) : (
          <Text
            style={[
              theme.textVariants.primaryBody,
              { color: isFirstPage ? theme.colors.disabledColor : theme.colors.primaryTextColor },
            ]}
          >
            {prevButtonText}
          </Text>
        )}
      </TouchableOpacity>
      {counterRender ? (
        counterRender(current, totalPages)
      ) : (
        <Flex>
          <Text style={[theme.textVariants.primaryBody, { color: theme.colors.primaryColor }]}>{current}</Text>
          <Text style={theme.textVariants.primaryBody}>/{totalPages}</Text>
        </Flex>
      )}

      <TouchableOpacity
        disabled={isLastPage}
        activeOpacity={0.8}
        onPress={() => {
          const nextPage = current + 1;
          setCurrent(nextPage);
          onChange?.(nextPage);
        }}
      >
        {nextButtonRender ? (
          nextButtonRender(isLastPage)
        ) : (
          <Text
            style={[
              theme.textVariants.primaryBody,
              { color: isLastPage ? theme.colors.disabledColor : theme.colors.primaryTextColor },
            ]}
          >
            {nextButtonText}
          </Text>
        )}
      </TouchableOpacity>
    </Flex>
  );
};

export default Pagination;
