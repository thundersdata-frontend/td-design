import * as React from 'react';

interface IconfontProps {
  name: string;
  classname?: string;
}
/**自定义图标 */
const Iconfont: React.SFC<IconfontProps> = (props: IconfontProps) => {
  return <i className={`iconfont ${props.name || ''} ${props.classname}`} />;
};

export default Iconfont;
