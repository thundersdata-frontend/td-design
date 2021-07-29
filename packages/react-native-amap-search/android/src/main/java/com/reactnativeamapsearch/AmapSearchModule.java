package com.reactnativeamapsearch;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.core.PoiItem;
import com.amap.api.services.poisearch.PoiResult;
import com.amap.api.services.poisearch.PoiSearch;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;


import java.util.ArrayList;
import java.util.List;

@ReactModule(name = AmapSearchModule.NAME)
public class AmapSearchModule extends ReactContextBaseJavaModule implements PoiSearch.OnPoiSearchListener {
    public static final String NAME = "AMapSearchManager";
    private PoiResult poiResult; // poi返回的结果
    private int currentPage = 0;// 当前页面，从0开始计数
    private PoiSearch.Query query;// Poi查询条件类
    private PoiSearch poiSearch;
    private List<PoiItem> poiItems;// poi数据
    private String keyWord = "";
    private String city = "";

    private Callback successCallback;
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



  public  WritableMap formatData(PoiResult poiResult){
    WritableMap params = Arguments.createMap();
    ArrayList<PoiItem> poiItems = poiResult.getPois();
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

    System.out.println("===>formatData");
    params.putArray("searchResultList",  array);
    return params;
  }

  @Override
  public void onPoiSearched(PoiResult poiResult, int i) {
    System.out.println("===>onPoiSearched");
    System.out.println(poiResult);

    WritableMap params  = formatData(poiResult);

    this.sendEvent(this.reactContext,"EventReminder",params);

  }

  @Override
  public void onPoiItemSearched(PoiItem poiItem, int i) {

    System.out.println("===>onPoiItemSearched");
  }



  @ReactMethod
  public void init1(){
    System.out.println("===>start!");

  }

  @ReactMethod
  public void  aMapPOIAroundSearch(double latitude , double longitude , String keywords,Integer radius ,String city ,Boolean special){
    this.doAMapPOIAroundSearch(latitude,longitude,keywords,radius,city,special);
  }

  /**
   * 开始进行poi搜索
   */
  protected void doAMapPOIAroundSearch(double latitude , double longitude , String keywords,Integer radius,String city,Boolean special  ) {
    System.out.println("===>doSearchQuery");
    System.out.print(keywords);
    currentPage = 0;
    query = new PoiSearch.Query(keywords, "", city);// 第一个参数表示搜索字符串，第二个参数表示poi搜索类型，第三个参数表示poi搜索区域（空字符串代表全国）
    query.setPageSize(20);// 设置每页最多返回多少条poiitem
    query.setPageNum(currentPage);// 设置查第一页
    poiSearch = new PoiSearch(this.reactContext, query);
    poiSearch.setOnPoiSearchListener(this);
    poiSearch.setBound(new PoiSearch.SearchBound(new LatLonPoint(latitude,longitude), radius, special));
    poiSearch.searchPOIAsyn();// 异步搜索
  }

    // 给js发送消息
    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
