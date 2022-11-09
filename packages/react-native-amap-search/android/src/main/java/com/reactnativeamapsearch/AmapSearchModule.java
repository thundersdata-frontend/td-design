package com.reactnativeamapsearch;

import androidx.annotation.NonNull;

import com.amap.api.services.core.AMapException;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.core.PoiItem;
import com.amap.api.services.poisearch.PoiResult;
import com.amap.api.services.poisearch.PoiSearch;
import com.amap.api.services.routepoisearch.RoutePOIItem;
import com.amap.api.services.routepoisearch.RoutePOISearch;
import com.amap.api.services.routepoisearch.RoutePOISearchQuery;
import com.amap.api.services.routepoisearch.RoutePOISearchResult;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.amap.api.services.core.ServiceSettings;

import java.util.ArrayList;
import java.util.List;

@ReactModule(name = AmapSearchModule.NAME)
public class AmapSearchModule extends ReactContextBaseJavaModule implements PoiSearch.OnPoiSearchListener, RoutePOISearch.OnRoutePOISearchListener {
    public static final String NAME = "AMapSearchManager";

    private int currentPage = 0;// 当前页面，从0开始计数
    private PoiSearch.Query query;// Poi查询条件类
    private PoiSearch poiSearch;
    private RoutePOISearch routePOISearch;
    private List<PoiItem> poiItems;// poi数据
    private String keyWord = "";
    private String city = "";
    private Callback jsCallBack;

    private static ReactApplicationContext reactContext;

    public AmapSearchModule(ReactApplicationContext context) {
        super(context);
        reactContext=context;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }



  public  WritableArray formatData(ArrayList<PoiItem> poiItems){

    WritableArray array = Arguments.createArray();

    for(int i = 0 ; i< poiItems.size();i++){
      WritableMap item = Arguments.createMap();
      PoiItem poiItem = poiItems.get(i);

      item.putString("uid",poiItem.getPoiId()); //id
      item.putString("name",poiItem.getTitle()); //名称
      item.putString("type",poiItem.getTypeDes()); //兴趣点类型
      item.putString("typecode",poiItem.getTypeCode()); //类型编码
      item.putDouble("latitude",poiItem.getLatLonPoint().getLatitude()); //纬度
      item.putDouble("longitude",poiItem.getLatLonPoint().getLongitude()); //经度
      item.putString("address",poiItem.getSnippet()); // 地址
      item.putString("tel",poiItem.getTel()); // 电话
      item.putInt("distance",poiItem.getDistance());  //距中心点的距离，单位米
      item.putString("parkingType",poiItem.getParkingType()); //停车场类型，地上、地下
      item.putString("shopID",poiItem.getShopID());
      item.putString("postcode",poiItem.getPostcode()); //邮编
      item.putString("website",poiItem.getWebsite());  //网址
      item.putString("email",poiItem.getEmail()); //电子邮件
      item.putString("province",poiItem.getProvinceName()); //省
      item.putString("pcode",poiItem.getProvinceCode()); //省编码
      item.putString("city",poiItem.getCityName()); //市
      item.putString("citycode",poiItem.getCityCode()); //城市编码
      item.putString("district",poiItem.getAdName()); //区域名称
      item.putString("adcode",poiItem.getAdCode()); //区域编码

      array.pushMap(item);
    }

    return array;
  }

  @Override
  public void onPoiSearched(PoiResult poiResult, int i) {
    System.out.println("===>onPoiSearched");

    WritableArray array  = formatData(poiResult.getPois());

    if(this.jsCallBack==null){
      return;
    }
    this.jsCallBack.invoke(null,array);
    this.jsCallBack = null;
  }

  @Override
  public void onRoutePoiSearched(RoutePOISearchResult result, int errorCode){
    WritableArray array = Arguments.createArray();
    List<RoutePOIItem> poiItems = result.getRoutePois();
    for(int i = 0 ; i< poiItems.size();i++){
      WritableMap item = Arguments.createMap();
      RoutePOIItem poiItem = poiItems.get(i);
      item.putString("uid",poiItem.getID());
      item.putString("name",poiItem.getTitle()); //名称
      item.putDouble("latitude",poiItem.getPoint().getLatitude()); //纬度
      item.putDouble("longitude",poiItem.getPoint().getLongitude()); //经度
      item.putDouble("distance", poiItem.getDistance());  //距中心点的距离，单位米
      array.pushMap(item);
    }
    this.jsCallBack.invoke(null,array);
    this.jsCallBack = null;
  }

  @Override
  public void onPoiItemSearched(PoiItem poiItem, int i) {

    System.out.println("===>onPoiItemSearched");
  }



  @ReactMethod
  public void initSDK(){
    ServiceSettings.updatePrivacyShow(this.reactContext, true, true);
    ServiceSettings.updatePrivacyAgree(this.reactContext,true);
    System.out.println("===>start!");
  }


  @ReactMethod
  public void  aMapPOIAroundSearch(double latitude , double longitude , String keywords,Integer radius ,String city ,Boolean special, Integer page, Integer pageSize ,String types, Callback callback){
      this.jsCallBack = callback;
      this.doAMapPOIAroundSearch(latitude,longitude,keywords,radius,city,special,page,pageSize,types);
  }

  @ReactMethod
  public void  aMapPOIKeywordsSearch( String keywords ,String city,String types ,Boolean cityLimit , Integer page, Integer pageSize, Callback callback){
    this.jsCallBack = callback;
    this.doAMapPOIAroundSearch(keywords,city,types,cityLimit,page,pageSize);
  }



  @ReactMethod
  public void  aMapPOIPolygonSearch(ReadableArray points, String keywords , Integer page, Integer pageSize,String types, Callback callback){
    this.jsCallBack = callback;
    this.doAMapPOIAroundSearch(points,keywords,page,pageSize,types);
  }
  @ReactMethod
  public void  aMapRoutePOISearch(ReadableMap origin, ReadableMap destination, Integer strategy, Integer searchType,Integer range,Callback callback){
    this.jsCallBack = callback;
    this.doRoutePOISearch(origin,destination,strategy,searchType,range);
  }

  /**
   * 开始进行poi搜索
   */
  protected void doAMapPOIAroundSearch(double latitude , double longitude , String keywords,Integer radius,String city,Boolean special,Integer page, Integer pageSize ,String types  ) {
    System.out.println("===>doSearchQuery");

    query = new PoiSearch.Query(keywords, "", city);// 第一个参数表示搜索字符串，第二个参数表示poi搜索类型，第三个参数表示poi搜索区域（空字符串代表全国）
    query.setPageSize(pageSize);// 设置每页最多返回多少条poiitem
    query.setPageNum(page);// 设置查第一页
//    query.setSpecial(special);


    try {
      poiSearch = new PoiSearch(this.reactContext, query);
    } catch (AMapException e) {
      e.printStackTrace();
    }

    poiSearch.setOnPoiSearchListener(this);
    poiSearch.setBound(new PoiSearch.SearchBound(new LatLonPoint(latitude,longitude), radius, true));
    poiSearch.searchPOIAsyn();// 异步搜索
  }

  /**
   * 开始进行poi搜索
   */
  protected void doAMapPOIAroundSearch(String keywords ,String city,String types ,Boolean cityLimit , Integer page, Integer pageSize) {
    System.out.println("===>doSearchQuery");

    query = new PoiSearch.Query(keywords, "", city);// 第一个参数表示搜索字符串，第二个参数表示poi搜索类型，第三个参数表示poi搜索区域（空字符串代表全国）
    query.setPageSize(pageSize);// 设置每页最多返回多少条poiitem
    query.setPageNum(page);// 设置查第一页

    try {
      poiSearch = new PoiSearch(this.reactContext, query);
    } catch (AMapException e) {
      e.printStackTrace();
    }
    poiSearch.setOnPoiSearchListener(this);
    poiSearch.searchPOIAsyn();// 异步搜索
  }

  /**
   * 开始进行poi搜索
   * 周边搜索
   */
  protected void doAMapPOIAroundSearch(ReadableArray points, String keywords , Integer page, Integer pageSize,String types) {
    System.out.println("===>doSearchQuery");

    query = new PoiSearch.Query(keywords, "", "");// 第一个参数表示搜索字符串，第二个参数表示poi搜索类型，第三个参数表示poi搜索区域（空字符串代表全国）
    query.setPageSize(pageSize);// 设置每页最多返回多少条poiitem
    query.setPageNum(page);// 设置查第一页

    List<LatLonPoint> polygonPoints = new ArrayList<LatLonPoint>();

    for(Integer i=0;i<points.size();i++ ){
      ReadableMap map = points.getMap(i);
      polygonPoints.add(new LatLonPoint(map.getDouble("latitude"),map.getDouble("longitude")));
    }

    try {
      poiSearch = new PoiSearch(this.reactContext, query);
    } catch (AMapException e) {
      e.printStackTrace();
    }
    poiSearch.setOnPoiSearchListener(this);
    poiSearch.setBound(new PoiSearch.SearchBound(polygonPoints));//设置多边形区域
    poiSearch.searchPOIAsyn();// 异步搜索
  }


  /**
   * 开始进行poi搜索
   * 道路沿途检索POI
   */
  protected void doRoutePOISearch(ReadableMap origin, ReadableMap destination, Integer strategy, Integer searchType,Integer range) {

    RoutePOISearch.RoutePOISearchType mode ;

    switch (searchType){
      case 0:
        mode = RoutePOISearch.RoutePOISearchType.TypeGasStation;
        break;
      case  1:
        mode = RoutePOISearch.RoutePOISearchType.TypeMaintenanceStation;
        break;
      case 2:
        mode = RoutePOISearch.RoutePOISearchType.TypeATM;
        break;
      case 3:
        mode = RoutePOISearch.RoutePOISearchType.TypeToilet;
        break;
      case 4:
        mode = RoutePOISearch.RoutePOISearchType.TypeFillingStation;
        break;
      case 5:
        mode = RoutePOISearch.RoutePOISearchType.TypeServiceArea;
        break;
      default:
        mode = RoutePOISearch.RoutePOISearchType.TypeGasStation;
        break;
    }

    System.out.println("===>doSearchQuery");
    LatLonPoint mStartPoint = new LatLonPoint(origin.getDouble("latitude"),origin.getDouble("longitude"));
    LatLonPoint mEndPoint = new LatLonPoint(destination.getDouble("latitude"),origin.getDouble("longitude"));


    RoutePOISearchQuery query = new RoutePOISearchQuery(mStartPoint ,mEndPoint, strategy, mode, range);
    try {
      routePOISearch = new RoutePOISearch(this.reactContext, query);
    } catch (AMapException e) {
      e.printStackTrace();
    }
    routePOISearch.setPoiSearchListener(this);
    routePOISearch.searchRoutePOIAsyn();
  }

}
