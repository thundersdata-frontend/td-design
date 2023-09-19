import React, { createContext, PropsWithChildren, ReactNode, useContext, useMemo } from 'react';

const EMPTY = Symbol('EMPTY');

type UseHook<Value, Props> = ((props: Props) => Value) | (() => Value);
type ConsumerProps<Value> = {
  children: (value: Value) => ReactNode;
};

/**
 * 创建局部共享数据
 * @param useHook 自定义hooks
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createShareModel<Value, Props = any>(useHook: UseHook<Value, Props>) {
  const Context = createContext<Value | typeof EMPTY>(EMPTY);
  const hookName = useHook.name || 'useHook';
  Context.displayName = `${hookName}Context`;

  const ShareModelProvider = ({ initialState, children }: PropsWithChildren<{ initialState: Props }>) => {
    const value = useHook(initialState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => <Context.Provider value={value}>{children}</Context.Provider>, [value]);
  };

  const useShareModel = () => {
    const value = useContext(Context);
    if (value === EMPTY) {
      throw new Error('Component must be wrapped within Provider');
    }
    return value;
  };

  const ShareModelConsumer = (props: ConsumerProps<Value>) => {
    return (
      <Context.Consumer>
        {value => {
          if (value === EMPTY) {
            throw new Error('Component must be wrapped with <Container.Provider>');
          }
          return props.children(value);
        }}
      </Context.Consumer>
    );
  };

  return {
    Provider: ShareModelProvider,
    Consumer: ShareModelConsumer,
    useModel: useShareModel,
  };
}
