(self["webpackChunkthundersdata_frontend"]=self["webpackChunkthundersdata_frontend"]||[]).push([[8430],{2986:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,{Z:function(){return o}})},37764:function(t,e,r){"use strict";r.d(e,{Z:function(){return i}});var o=r(2986);function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){(0,o.Z)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},4945:function(t,e,r){"use strict";function o(t,e){if(null==t)return{};var r,o,n={},i=Object.keys(t);for(o=0;o<i.length;o++)r=i[o],e.indexOf(r)>=0||(n[r]=t[r]);return n}function n(t,e){if(null==t)return{};var r,n,i=o(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}r.d(e,{Z:function(){return n}})},26419:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return h}});var o=r(59496),n=r(4945),i=r(95798),a=r.n(i),l=r(11045),s=r(89469),c=r(41454),u=["max","style"],f=t=>{var e,r,i=t.max,f=void 0===i?100:i,h=t.style,v=void 0===h?{}:h,y=(0,n.Z)(t,u),g=+y.value;g=g>f?f:g;for(var d=(0,c.Z)(),p=(0,o.useRef)(0),b=(0,o.useRef)(null),m=(0,s.Z)(v),F=m.style,P=(0,o.useRef)(null),S=(0,l.Z)(P),O=f/5,C=120,Z=180,k=2*(null!==(e=null===S||void 0===S?void 0:S.width)&&void 0!==e?e:0),w=2*(null!==(r=null===S||void 0===S?void 0:S.height)&&void 0!==r?r:0),x=Math.min(k,w)/2,E=[d.colors.primary400[0],d.colors.primary300[0],d.colors.primary200[0],d.colors.primary100[0]],D=[d.colors.primary400[0],d.colors.primary50[1],d.colors.primary100[0]],j=[d.colors.primary400,d.colors.primary400,d.colors.primary300,d.colors.primary200,d.colors.primary50,d.colors.primary100],M=(0,o.useCallback)(((t,e,r)=>{for(var o=a().rgb(t).array(),n=o[0],i=o[1],l=o[2],s=a().rgb(e).array(),c=s[0],u=s[1],f=s[2],h=(+c-+n)/r,v=(+u-+i)/r,y=(+f-+l)/r,g=[],d=0;d<r;d++){var p=a().hsl("rgb("+parseInt(+h*d+ +n+"")+","+parseInt(+v*d+ +i+"")+","+parseInt(+y*d+ +l+"")+")");g.push(p)}return g}),[]),T=[],I=0;I<E.length-1;I++){var H=E[I+1],A=E[I],W=40;T=T.concat(M(A,H,W))}var z=(0,o.useCallback)((t=>{var e,r=null===(e=b.current)||void 0===e?void 0:e.getContext("2d");if(r){r.save();for(var o=0;o<=5;o++){r.beginPath(),r.lineWidth=4;var n=Math.ceil(o/5*119);r.strokeStyle=T[n],r.moveTo(.9*t,0),r.lineTo(.9*t+26,0),r.stroke(),r.rotate(12*Math.PI/450*10),r.closePath()}r.restore()}}),[T]),R=(0,o.useCallback)((t=>{var e,r=null===(e=b.current)||void 0===e?void 0:e.getContext("2d");if(r){r.save();for(var o=0;o<=C;o++)r.beginPath(),r.lineWidth=4,r.strokeStyle=T[o],r.moveTo(.9*t,0),r.lineTo(.9*t+16,0),r.stroke(),r.rotate(2*Math.PI/Z),r.closePath();r.restore()}}),[T]),_=(0,o.useCallback)((t=>{var e,r=null===(e=b.current)||void 0===e?void 0:e.getContext("2d");if(r){r.save(),r.rotate(Math.PI/2);for(var o=0;o<=5;o++){var n=r.createLinearGradient(0,0,400,0);n.addColorStop(0,j[o][0]),n.addColorStop(1,j[o][1]),r.fillStyle=n,r.font="36px Alibaba PuHuiTi",r.textAlign="center",r.fillText(O*o+"",0,.8*-t),r.rotate(12*Math.PI/450*10)}r.restore()}}),[O,j]),B=(0,o.useCallback)((t=>{var e,r=null===(e=b.current)||void 0===e?void 0:e.getContext("2d");if(r){for(var o=[],n=0;n<D.length-1;n++){var i=D[n+1],a=D[n],l=150;o=o.concat(M(a,i,l))}for(var s=0;s<300;s++)r.save(),r.beginPath(),r.lineWidth=20,r.strokeStyle=o[s],r.arc(0,0,3*t/4,60/45/300*s*Math.PI,60/45/300*(s+1.3)*Math.PI),r.stroke(),r.closePath(),r.restore()}}),[M,D]),q=(0,o.useCallback)(((t,e)=>{var r;if(e){var o=null===(r=b.current)||void 0===r?void 0:r.getContext("2d");o&&(o.save(),o.beginPath(),o.rotate(4*Math.PI/3*t/f),o.moveTo(0,4),o.lineTo(0,-4),o.lineTo(.9*e+24,0),o.fillStyle="#3DE6FF",o.fill(),o.closePath(),o.restore())}}),[f]),G=(0,o.useCallback)((()=>{var t,e=null===(t=b.current)||void 0===t?void 0:t.getContext("2d");e&&(e.save(),e.beginPath(),e.rotate(12*Math.PI/450*0),e.lineWidth=3,e.strokeStyle="#3DE6FF",e.arc(0,0,12,0,2*Math.PI),e.stroke(),e.closePath(),e.beginPath(),e.fillStyle="#3DE6FF",e.arc(0,0,6,0,2*Math.PI),e.fill(),e.closePath(),e.restore())}),[]),L=(0,o.useCallback)((t=>{var e,r=null===(e=b.current)||void 0===e?void 0:e.getContext("2d");r&&(r.save(),r.rotate(210/180*Math.PI),r.fillStyle=d.colors.gray50,r.font="72px Roboto",r.textAlign="center",r.fillText(t+"",0,120),r.restore())}),[d.colors.gray50]),J=(0,o.useCallback)((()=>{var t,e=null===(t=b.current)||void 0===t?void 0:t.getContext("2d");e&&(e.save(),e.clearRect(0,0,k,w),e.translate(k/2,w/2),e.rotate(150*Math.PI/180),R(x),z(x),_(x),B(x),G(),L(p.current),q(p.current,x),e.translate(-k/2,-w/2),e.restore())}),[w,k,G,B,_,q,R,L,x,z]),K=(0,o.useCallback)((()=>{x&&(p.current!==g?(g>p.current&&(p.current+=1),g<p.current&&(p.current-=1),J(),requestAnimationFrame(K)):J())}),[x,g,J]);return(0,o.useEffect)((()=>{K()}),[K]),o.createElement("div",{style:F,ref:P},o.createElement("canvas",{ref:b,height:w,width:k,style:{width:F.width,height:F.height}}))},h=()=>o.createElement(f,{style:{width:407,height:351},max:100,value:80})},11045:function(t,e,r){"use strict";r.d(e,{Z:function(){return i}});var o=r(42273),n=r(59496);function i(t){var e=n.useState(null),r=(0,o.Z)(e,2),i=r[0],a=r[1];return(0,n.useEffect)((()=>{var e=null===t||void 0===t?void 0:t.current;if(e){var r=new ResizeObserver((t=>{a(t[0].contentRect)}));return r.observe(e),()=>{r.disconnect()}}}),[t]),i||{}}},89469:function(t,e,r){"use strict";r.d(e,{Z:function(){return i}});var o=r(37764),n=r(59496);function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=(0,n.useMemo)((()=>(0,o.Z)({position:"relative",width:"100%",height:"100%"},t)),[t]);return{style:e}}},41454:function(t,e,r){"use strict";r.d(e,{Z:function(){return s}});var o=r(59496),n=r(59870),i={typography:{h0:{fontSize:48,lineHeight:55,fontWeight:"normal",fontStyle:"normal",fontFamily:"PangMenZhengDao-3"},h1:{fontSize:38,lineHeight:45,fontWeight:"bold",fontStyle:"normal",fontFamily:"Roboto"},h2:{fontSize:32,lineHeight:37,fontWeight:"normal",fontStyle:"normal",fontFamily:"PangMenZhengDao-3"},h3:{fontSize:24,lineHeight:27,fontWeight:"normal",fontStyle:"normal",fontFamily:"PangMenZhengDao-3"},h4:{fontSize:20,lineHeight:23,fontWeight:"bold",fontStyle:"normal",fontFamily:"Roboto"},h5:{fontSize:18,lineHeight:21,fontWeight:"bold",fontStyle:"normal",fontFamily:"Roboto"},p0:{fontSize:18,lineHeight:25,fontWeight:"normal",fontStyle:"normal",fontFamily:"Alibaba PuHuiTi"},p1:{fontSize:16,lineHeight:22,fontWeight:"normal",fontStyle:"normal",fontFamily:"Alibaba PuHuiTi"},p2:{fontSize:14,lineHeight:19,fontWeight:"normal",fontStyle:"normal",fontFamily:"Alibaba PuHuiTi"},p3:{fontSize:12,lineHeight:16,fontWeight:"normal",fontStyle:"normal",fontFamily:"Alibaba PuHuiTi"}},colors:{primary50:["#3FA4FF","#60F5FF"],primary100:["#413ED6","#728DED"],primary200:["#46E081","#0DFFB7"],primary300:["#FEB01E","#F2F756"],primary400:["#FF3657","#FF72A6"],primary500:["#A13ED6","#CF72ED"],func50:"#FF4D4D",gray50:"#ffffff",gray100:"#cccccc",gray200:"rgba(255,255,255,0.15)",assist50:(0,n.Z)(["#24689E","#1C3D62"]),assist100:"#CC9F08",assist200:"#85C5FF",assist300:(0,n.Z)(["rgba(13, 255, 187, 0)","rgba(70, 224, 129, 0.4)"]),assist400:(0,n.Z)(["rgba(63, 164, 255, 0)","rgba(96, 154, 255, 0.4)"]),assist500:"#1968FF",assist600:"#47FFC6",assist700:"#00ABFF",assist800:"#FDB522",assist900:(0,n.Z)(["#FEB01E","#ECD542"],!1),assist1000:"#50DFFF",assist1100:(0,n.Z)(["#3BFFBA","#0F2623"],!1)}},a=i,l=(0,o.createContext)(a);function s(){var t=(0,o.useContext)(l);return t}},59870:function(t,e,r){"use strict";r.d(e,{Z:function(){return n}});var o=r(72326);function n(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return t&&2===t.length?e?new o.Z(0,0,0,1,[{offset:0,color:t[1]},{offset:1,color:t[0]}]):new o.Z(0,0,1,0,[{offset:0,color:t[1]},{offset:1,color:t[0]}]):t}},56629:function(t,e,r){"use strict";r.d(e,{ZT:function(){return n}});var o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)};function n(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}Object.create;Object.create},48204:function(t,e){"use strict";var r=function(){function t(t){this.colorStops=t||[]}return t.prototype.addColorStop=function(t,e){this.colorStops.push({offset:t,color:e})},t}();e["Z"]=r},72326:function(t,e,r){"use strict";var o=r(56629),n=r(48204),i=function(t){function e(e,r,o,n,i,a){var l=t.call(this,i)||this;return l.x=null==e?0:e,l.y=null==r?0:r,l.x2=null==o?1:o,l.y2=null==n?0:n,l.type="linear",l.global=a||!1,l}return(0,o.ZT)(e,t),e}(n.Z);e["Z"]=i}}]);