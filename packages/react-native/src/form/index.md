---
title: Form - 表单
nav:
  title: RN 组件
  path: /react-native
group:
  title: Form
  path: /form
---

# Form 表单

对`rc-field-form`的封装，提供类似 antd Form 的效果

## 效果演示

### 1. FormItem 使用

```tsx | pure
import { Form } from '@td-design/react-native';
// ...other imports

const { FormItem, FormListItem, useForm } = Form;

export default function FormDemo() {
  const [form] = useForm();

  return (
    <Form onFinish={handleFinish} form={form}>
      <FormItem name="useCharacter2" rules={[{ required: true, message: '请输入姓名' }]}>
        <InputItem required label="姓名" placeholder="请输入姓名" inputStyle={{ textAlign: 'right' }} />
      </FormItem>
      <FormItem name="vehicleLoad2" rules={[{ required: true, message: '请输入密码' }]}>
        <InputItem required label="密码" placeholder="请输入密码" inputStyle={{ textAlign: 'right' }} />
      </FormItem>
    </Form>
  );
}
```

<center>
  <figure>
    <img
      alt="自定义线的样式 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643176119561668349.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. FormListItem 使用

```tsx | pure
import { Form } from '@td-design/react-native';
// ...other imports

const { FormItem, FormListItem, useForm } = Form;

export default function FormDemo() {
  const [form] = useForm();

  return (
    <Form onFinish={handleFinish} form={form}>
      <FormListItem
        title="性别"
        required
        name="gender"
        minHeight={54}
        rules={[{ required: true, message: '请选择性别' }]}
      >
        <Radio
          options={[
            { label: '男', value: '1' },
            { label: '女', value: '0' },
          ]}
        />
      </FormListItem>
      <FormListItem
        title="性别"
        required
        name="gender"
        minHeight={54}
        rules={[{ required: true, message: '请选择性别' }]}
      >
        <Checkbox
          showCheckAll={false}
          options={[
            { label: '男', value: '1' },
            { label: '女', value: '0' },
          ]}
        />
      </FormListItem>
      <FormListItem
        title="数量"
        required
        name="count"
        minHeight={48}
        rules={[{ required: true, message: '请选择数量' }]}
      >
        <Stepper />
      </FormListItem>
      <FormListItem
        title="数量"
        required
        name="count"
        minHeight={48}
        rules={[{ required: true, message: '请选择数量' }]}
      >
        <Switch />
      </FormListItem>
      <FormListItem
        title="数量"
        required
        name="count"
        minHeight={48}
        rules={[{ required: true, message: '请选择数量' }]}
      >
        <NumberKeyboardInput type="number" placeholder="请输入核定载质量" />
      </FormListItem>
    </Form>
  );
}
```

<center>
  <figure>
    <img
      alt="自定义线的样式 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643176202465585760.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 校验失败提示效果

```tsx | pure
import { Form } from '@td-design/react-native';
// ...other imports

const { FormItem, FormListItem, useForm } = Form;

export default function FormDemo() {
  const [form] = useForm();

  return (
    <Form onFinish={handleFinish} form={form}>
      <FormItem type="all" name="name" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input required label="用户名" labelPosition="top" placeholder="请输入用户名" />
      </FormItem>
      <FormItem type="all" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input required label="密码" labelPosition="top" placeholder="请输入密码" />
      </FormItem>
      <FormItem type="all" name="count2">
        <NumberKeyboardFilter label="核定载质量" type="number" placeholder="请输入核定载质量" />
      </FormItem>
    </Form>
  );
}
```

<center>
  <figure>
    <img
      alt="自定义线的样式 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643176327063261866.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Form API

```ts
import { FormProps as RcFormProps } from 'rc-field-form/es/Form';

export type FormProps = Omit<RcFormProps, 'component'>;
```

### FormItem API

```ts
import type { FieldProps } from 'rc-field-form/lib/Field';

type RcFieldProps = Omit<FieldProps, 'children'>;
export interface FormItemProps extends RcFieldProps {
  type?: 'bottom' | 'all';
  children: ReactElement;
}
```

### FormListItem API

```ts
import type { FieldProps } from 'rc-field-form/lib/Field';
import { ListItemProps } from '../list-item';

type RcFieldProps = Omit<FieldProps, 'children'>;
export interface FormListItemProps
  extends RcFieldProps,
    Pick<ListItemProps, 'title' | 'required' | 'style' | 'thumb' | 'onPress' | 'minHeight' | 'arrow'> {
  children: ReactElement;
}
```
