(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[147],{nHFt:function(e,t,l){},oEbc:function(e,t,l){"use strict";l.r(t);var n=l("1QO0"),a=l.n(n),r=l("Lav9"),c=l("3yXN"),o=l("oLWh"),u=a.a.memo((e=>{e.demos;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("h1",{id:"pressable-\u53ef\u70b9\u51fb\u7ec4\u4ef6"},a.a.createElement(r["AnchorLink"],{to:"#pressable-\u53ef\u70b9\u51fb\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"Pressable \u53ef\u70b9\u51fb\u7ec4\u4ef6"),a.a.createElement("p",null,"\u57fa\u4e8e",a.a.createElement(r["Link"],{to:"https://reactnative.dev/docs/pressable"},"React Native Pressable"),"\u5c01\u88c5\u3002"),a.a.createElement("p",null,a.a.createElement("strong",null,"\u6ce8\u610f\uff1aPressable \u662f react-native \u5728 0.63 \u7248\u672c\u5f15\u5165\u7684\u65b0\u529f\u80fd\uff0c\u4e5f\u610f\u5473\u7740\u5982\u679c\u4f60\u7684\u9879\u76ee\u662f\u4f4e\u4e8e 0.63 \u7248\u672c\u7684\u8bdd\uff0cPressable \u7ec4\u4ef6\u65e0\u6cd5\u4f7f\u7528")),a.a.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},a.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),a.a.createElement("h3",{id:"1-\u9ed8\u8ba4\u6548\u679c"},a.a.createElement(r["AnchorLink"],{to:"#1-\u9ed8\u8ba4\u6548\u679c","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"1. \u9ed8\u8ba4\u6548\u679c"),a.a.createElement(c["a"],{code:'<Pressable onPress={handlePress} onLongPress={handleLongPress}>\n  <Box width={90} height={90} backgroundColor="gray300" />\n</Pressable>',lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"\u9ed8\u8ba4\u6548\u679c ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643190132405185135.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"2-\u7981\u7528\u653e\u5927\u6548\u679c"},a.a.createElement(r["AnchorLink"],{to:"#2-\u7981\u7528\u653e\u5927\u6548\u679c","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"2. \u7981\u7528\u653e\u5927\u6548\u679c"),a.a.createElement(c["a"],{code:'<Pressable onPress={handlePress} onLongPress={handleLongPress} scalable={false}>\n  <Box width={90} height={90} backgroundColor="gray300" />\n</Pressable>',lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"\u7981\u7528\u653e\u5927\u6548\u679c ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643190173403789370.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h2",{id:"api"},a.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"API"),a.a.createElement(o["a"],null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u5fc5\u586b"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"),a.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"onPress"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u70b9\u51fb\u4e8b\u4ef6"),a.a.createElement("td",null,a.a.createElement("code",null,"(event: GestureResponderEvent) => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"onLongPress"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u957f\u6309\u4e8b\u4ef6"),a.a.createElement("td",null,a.a.createElement("code",null,"(event: GestureResponderEvent) => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"disabled"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u662f\u5426\u7981\u7528"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"delayLongPress"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u4ece\u70b9\u51fb\u72b6\u6001\u8fdb\u5165\u957f\u6309\u72b6\u6001\u7684\u5ef6\u8fdf\u65f6\u95f4"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,"1000")),a.a.createElement("tr",null,a.a.createElement("td",null,"activeOpacity"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u70b9\u51fb\u65f6\u7684\u900f\u660e\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,"0.5")),a.a.createElement("tr",null,a.a.createElement("td",null,"pressOffset"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u624b\u6307\u79fb\u51fa\u7ec4\u4ef6\u4f46\u6254\u6301\u6709\u70b9\u51fb\u72b6\u6001\u7684\u8ddd\u79bb"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,"25")),a.a.createElement("tr",null,a.a.createElement("td",null,"hitOffset"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u79bb\u7ec4\u4ef6\u89e6\u53d1 onPressIn \u7684\u8ddd\u79bb"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,"25")),a.a.createElement("tr",null,a.a.createElement("td",null,"style"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u6837\u5f0f"),a.a.createElement("td",null,a.a.createElement("code",null,"ViewStyle")),a.a.createElement("td",null))))))}));t["default"]=e=>{var t=a.a.useContext(r["context"]),l=t.demos;return a.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),a.a.createElement(u,{demos:l})}},oLWh:function(e,t,l){"use strict";var n=l("1QO0"),a=l.n(n),r=l("bIC1"),c=l.n(r);l("nHFt");function o(e,t){return i(e)||m(e,t)||d(e,t)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){if(e){if("string"===typeof e)return s(e,t);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,n=new Array(t);l<t;l++)n[l]=e[l];return n}function m(e,t){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var n,a,r=[],c=!0,o=!1;try{for(l=l.call(e);!(c=(n=l.next()).done);c=!0)if(r.push(n.value),t&&r.length===t)break}catch(u){o=!0,a=u}finally{try{c||null==l["return"]||l["return"]()}finally{if(o)throw a}}return r}}function i(e){if(Array.isArray(e))return e}var E=function(e){var t=e.children,l=Object(n["useRef"])(),r=Object(n["useState"])(!1),u=o(r,2),d=u[0],s=u[1],m=Object(n["useState"])(!1),i=o(m,2),E=i[0],h=i[1];return Object(n["useEffect"])((function(){var e=l.current,t=c()((function(){s(e.scrollLeft>0),h(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),a.a.createElement("div",{className:"__dumi-default-table"},a.a.createElement("div",{className:"__dumi-default-table-content",ref:l,"data-left-folded":d||void 0,"data-right-folded":E||void 0},a.a.createElement("table",null,t)))};t["a"]=E}}]);