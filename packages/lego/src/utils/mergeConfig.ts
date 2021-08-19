/**
 * @功能描述: 图表配置合并方法，用targetConfig上的属性替换originConfig上的对应属性并得到最后的对象(增量复写)
 * @参数: originConfig 原配置，targetConfig：目标配置
 * @返回值: 返回合并后的 config
 */
export const mergeConfig = <T>(originConfig: Partial<T>, targetConfig: Partial<T>) => {
  const modifiedObj = Object.assign({}, originConfig, targetConfig);
  Object.keys(modifiedObj).forEach(key => {
    // 如果是 originConfig，targetConfig上都有的属性且为对象,再合并一次
    if (
      originConfig[key] &&
      targetConfig[key] &&
      typeof targetConfig[key] === 'object' &&
      !Array.isArray(targetConfig[key])
    ) {
      modifiedObj[key] = mergeConfig(originConfig[key], targetConfig[key]);
    }
  });
  return modifiedObj;
};
