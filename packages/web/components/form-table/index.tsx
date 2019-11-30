import React, { useState, useEffect, forwardRef } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Modal, Table } from 'antd';
import EditTableForm, { EditObject } from './EditTableForm';
import { FormItemProps } from '../form-creator';
import { date } from '@td-design/utils';

interface FormItemTableProps {
  items: FormItemProps[];
  value?: EditObject[];
  onChange?: (value: EditObject[]) => void;
  visible: boolean;
  toggle: (visible: boolean) => void;
  modalTitle: string;
  dateParams?: string[];
  showIndex?: boolean;
}

type Ref = HTMLDivElement;

const FormItemTable = forwardRef<Ref, FormItemTableProps>(
  ({ items, value = [], onChange, visible, toggle, modalTitle, dateParams, showIndex = false }, ref) => {
    const [dataSource, setDataSource] = useState<EditObject[]>([]);
    const [editObj, setEditObj] = useState<EditObject>();

    useEffect(() => {
      if (dateParams && dateParams.length > 0) {
        setDataSource(
          value.map((val, index) => {
            const dateObj = {};
            dateParams.forEach(param => {
              dateObj[param] = date.formatDate(val[param] as string, 'YYYY-MM-DD');
            });
            return {
              ...val,
              index: index + 1,
              ...dateObj,
            };
          }),
        );
      } else {
        setDataSource(
          value.map((val, index) => ({
            ...val,
            index: index + 1,
          })),
        );
      }
    }, [dateParams, value]);

    const columns: ColumnProps<EditObject>[] = items.map(item => ({
      dataIndex: item.name,
      title: item.formLabel,
    }));

    if (showIndex) {
      columns.unshift({
        dataIndex: 'index',
        title: '序号',
      });
    }

    const handleSubmit = (values: EditObject) => {
      const _dataSource = dataSource.slice();
      if (values.index === 0) {
        _dataSource.push({
          ...values,
          index: _dataSource.length + 1,
        });
      } else {
        _dataSource.splice(values.index - 1, 1, values);
      }
      setDataSource(_dataSource);
      setEditObj(undefined);
      if (onChange) {
        onChange(_dataSource);
      }
      toggle(false);
    };

    return (
      <div ref={ref}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey={record => `${record.index}`}
          size="middle"
        />
        <Modal
          width={600}
          visible={visible}
          destroyOnClose
          footer={null}
          title={editObj ? `添加${modalTitle}` : `修改${modalTitle}`}
          centered
          onCancel={() => toggle(false)}
        >
          <EditTableForm
            items={items}
            onSubmit={handleSubmit}
            obj={editObj}
            onCancel={() => toggle(false)}
            dateParams={dateParams}
          />
        </Modal>
      </div>
    );
  },
);

export default React.memo(FormItemTable);
