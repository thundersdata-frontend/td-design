import { NativeModules, NativeEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';
import type { SeaechPOIParams, ResultPOI } from './AMapSearch';

const AMapSearchManager = NativeModules.AMapSearchManager;
const AMapSearchManagerEmitter = new NativeEventEmitter(AMapSearchManager);
function useAMapSearch() {
  const [data, setData] = useState<ResultPOI[]>();
  useEffect(() => {
    AMapSearchManagerEmitter.addListener('EventReminder', (reminder: any) => {
      setData(reminder?.searchResultList);
    });
    return () => {
      AMapSearchManagerEmitter.removeAllListeners('EventReminder');
    };
  }, []);

  const aMapPOIAroundSearch = (params: SeaechPOIParams) => {
    const {
      latitude,
      longitude,
      keywords = '',
      radius = 1500,
      city = '',
      special = true,
    } = params;

    AMapSearchManager.aMapPOIAroundSearch(
      latitude,
      longitude,
      keywords,
      radius,
      city,
      special
    );
  };

  return {
    init: AMapSearchManager.init1,
    aMapPOIAroundSearch: aMapPOIAroundSearch,
    data: data,
  };
}

export default useAMapSearch;
