import { Platform } from 'react-native';
import { PullToRefresh as PullToRefreshAndroid } from './PullToRefresh.android';
import { PullToRefresh as PullToRefreshIOS } from './PullToRefresh.ios';

const PullToRefresh = Platform.OS === 'android' ? PullToRefreshAndroid : PullToRefreshIOS;

export default PullToRefresh;
