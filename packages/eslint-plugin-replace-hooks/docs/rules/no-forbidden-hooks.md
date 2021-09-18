# no forbidden hooks in project (no-forbidden-hooks)

## Rule Details

可以通过配置，把项目中不允许使用的 hooks 标记出来，同时提示用指定的其他 hooks 替换

Examples of **incorrect** code for this rule:

```js
// 其他配置
rules: {
  // 其他规则
  'replace-hooks/no-forbidden-hooks': 'error',
}

```

Examples of **correct** code for this rule:

```js
// 其他配置
rules: {
  // 其他规则
  'replace-hooks/no-forbidden-hooks': ['error', { useState: 'useSafeState' }],
}

```

### Options

要提示错误的 hooks，是一个键值对。键是要提示错误的 hooks，值是提示要替换的 hooks。比如：

```js
{
  useState: 'useSafeState';
}
```

## When Not To Use It

如果你的项目里不需要用一些自定义的 hooks 封装，替换默认的 hooks
