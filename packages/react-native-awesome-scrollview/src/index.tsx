import { requireNativeComponent, ViewStyle } from 'react-native';

type ReactNativeAwesomeScrollviewProps = {
  color: string;
  style: ViewStyle;
};


export const ReactNativeAwesomeScrollviewViewManager = requireNativeComponent<ReactNativeAwesomeScrollviewProps>(
  'ReactNativeAwesomeScrollviewView'
);

export default ReactNativeAwesomeScrollviewViewManager;
