import { NativeModules } from 'react-native';
import { useCallback, useState } from 'react';
import { RADIUS, SPECIAL, PAGE, PAGESIZE } from './constant';

const AMapSearchManager = NativeModules.AMapSearchManager;
function useAMapSearch() {
  const [data, setData] = useState<ResultPOI[]>();

  const onPOISearchDone = useCallback((err: any, result: ResultPOI[]) => {
    if (err) {
      Error('err');
    } else {
      setData(result);
    }
  }, []);

  const aMapPOIAroundSearch = useCallback(
    (params: SearchPOIParams) => {
      const {
        latitude,
        longitude,
        keywords = '',
        radius = RADIUS,
        city = '',
        special = SPECIAL,
        page = PAGE,
        pageSize = PAGESIZE,
        types = '',
      } = params;

      AMapSearchManager.aMapPOIAroundSearch(
        latitude,
        longitude,
        keywords,
        radius,
        city,
        special,
        page,
        pageSize,
        types,
        onPOISearchDone
      );
    },
    [onPOISearchDone]
  );

  const aMapPOIKeywordsSearch = useCallback(
    (params: KeyWordsSearchPOIParams) => {
      const { keywords = '', city = '', page = PAGE, pageSize = PAGESIZE, types = '', cityLimit = false } = params;

      AMapSearchManager.aMapPOIKeywordsSearch(keywords, city, types, cityLimit, page, pageSize, onPOISearchDone);
    },
    [onPOISearchDone]
  );

  const aMapPOIPolygonSearch = useCallback(
    (params: PolygonSearchParams) => {
      const { points = [], keywords = '', page = PAGE, pageSize = PAGESIZE, types = '' } = params;

      AMapSearchManager.aMapPOIPolygonSearch(points, keywords, page, pageSize, types, onPOISearchDone);
    },
    [onPOISearchDone]
  );

  const aMapRoutePOISearch = useCallback(
    (params: RouteSearchParams) => {
      const { origin, destination, strategy = 0, searchType = 0, range = 250 } = params;

      AMapSearchManager.aMapRoutePOISearch(origin, destination, strategy, searchType, range, onPOISearchDone);
    },
    [onPOISearchDone]
  );

  return {
    aMapPOIKeywordsSearch: aMapPOIKeywordsSearch,
    aMapPOIAroundSearch: aMapPOIAroundSearch,
    aMapPOIPolygonSearch: aMapPOIPolygonSearch,
    aMapRoutePOISearch: aMapRoutePOISearch,
    data: data,
  };
}

export default useAMapSearch;
