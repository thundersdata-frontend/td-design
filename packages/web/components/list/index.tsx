import React from 'react';
import FilterForm, { FilterFormProps } from '../filter-form';
import Container from '../container';
import { Pagination } from 'antd';

export interface ListProps<T> extends FilterFormProps {
  header: string | JSX.Element;
  list: T[];
  page: number;
  pageSize?: number;
  total: number;
  renderItem: (record: T) => JSX.Element;
  onPageChange?: (current: number) => void;
}

function List<T>(props: ListProps<T>) {
  const { header, list, page, pageSize, total, renderItem, onPageChange, ...restProps } = props;
  if (!list || list.length === 0) return null;
  return (
    <Container header={header}>
      <FilterForm {...restProps} />
      <div className="list-content">{list.map(renderItem)}</div>
      {list.length > 0 && (
        <div className="list-pagination">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={10}
            current={page}
            pageSize={pageSize}
            total={total}
            showQuickJumper
            onChange={onPageChange}
          />
        </div>
      )}
    </Container>
  );
}
List.defaultProps = {
  pageSize: 10,
  page: 1,
  total: 0,
};
export default List;
