(self["webpackChunkthundersdata_frontend"]=self["webpackChunkthundersdata_frontend"]||[]).push([[5047],{31743:function(e,t,n){"use strict";n.r(t);var a=n(59496),l=n(58353);t["default"]=()=>{var e=[{name:"\u6728\u6750",value:"47043"},{name:"\u673a\u68b0\u3001\u8bbe\u5907",value:"38603"},{name:"\u94a2\u94c1",value:"31316"}];return a.createElement(l.fj,{data:e,style:{width:500,height:400}})}},48585:function(e,t,n){"use strict";n.r(t);n(76096);var a=n(77116),l=n(52923),i=n(59496),u=n(58353);t["default"]=()=>{var e,t,n=(0,i.useRef)(null),d=null===(e=n.current)||void 0===e?void 0:e.getEchartsInstance(),r=(0,i.useState)(-1),c=(0,l.Z)(r,2),s=c[0],h=c[1],o=[{name:"\u6728\u6750",value:"47043"},{name:"\u673a\u68b0\u3001\u8bbe\u5907",value:"38603"},{name:"\u94a2\u94c1",value:"31316"}],v=null===(t=o[s])||void 0===t?void 0:t.name,f=()=>{s>=0&&h((e=>e-1))},m=()=>{s<o.length&&h((e=>e+1))};return(0,i.useEffect)((()=>{null===d||void 0===d||d.dispatchAction({type:"downplay"}),null===d||void 0===d||d.dispatchAction({type:"hideTip"}),s>-1&&(null===d||void 0===d||d.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:s}),v&&(null===d||void 0===d||d.dispatchAction({type:"highlight",name:v})))}),[s,v,d]),i.createElement("div",null,i.createElement("div",null,i.createElement(a.Z,{onClick:f},"\u9ad8\u4eae\u4e0a\u4e00\u4e2a"),i.createElement(a.Z,{onClick:m},"\u9ad8\u4eae\u4e0b\u4e00\u4e2a")),i.createElement(u.fj,{ref:n,data:o,style:{width:407,height:351}}))}}}]);