import React from 'react';
import { Table } from 'antd';
import Container from '../container';
import ActionButtons, { ActionProps } from '../action-buttons';
import Tip, { TipProps } from '../tip';
import FilterForm, { FilterFormProps } from '../filter-form';
import { TableProps } from 'antd/lib/table';

export interface TDTableProps extends Partial<ActionProps>, Partial<TipProps>, Partial<FilterFormProps> {
  header: string;
}

function TDTable<T>(props: TDTableProps & TableProps<T>) {
  const {
    header,
    formItems,
    onSubmit,
    onReset,
    actions,
    maxExpandNum,
    selectedNum,
    onClear,
    customContent,
    ...tableProps
  } = props;

  return (
    <Container header={header}>
      <FilterForm formItems={formItems} onSubmit={onSubmit} onReset={onReset} />
      <ActionButtons actions={actions} maxExpandNum={maxExpandNum} />
      <Tip selectedNum={selectedNum} onClear={onClear} customContent={customContent} />
      <Table {...tableProps} />
    </Container>
  );
}

export default TDTable;
