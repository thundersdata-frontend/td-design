(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[122],{WpQk:function(e,t,a){},"dMo/":function(e,t,a){"use strict";var l=a("q1tI"),n=a.n(l),r=a("hKI/"),c=a.n(r);a("WpQk");function i(e,t){return E(e)||u(e,t)||m(e,t)||d()}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,t){if(e){if("string"===typeof e)return o(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,l=new Array(t);a<t;a++)l[a]=e[a];return l}function u(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var l,n,r=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(l=a.next()).done);c=!0)if(r.push(l.value),t&&r.length===t)break}catch(d){i=!0,n=d}finally{try{c||null==a["return"]||a["return"]()}finally{if(i)throw n}}return r}}function E(e){if(Array.isArray(e))return e}var s=function(e){var t=e.children,a=Object(l["useRef"])(),r=Object(l["useState"])(!1),d=i(r,2),m=d[0],o=d[1],u=Object(l["useState"])(!1),E=i(u,2),s=E[0],h=E[1];return Object(l["useEffect"])((function(){var e=a.current,t=c()((function(){o(e.scrollLeft>0),h(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),n.a.createElement("div",{className:"__dumi-default-table"},n.a.createElement("div",{className:"__dumi-default-table-content",ref:a,"data-left-folded":m||void 0,"data-right-folded":s||void 0},n.a.createElement("table",null,t)))};t["a"]=s},ulLE:function(e,t,a){"use strict";a.r(t);var l=a("q1tI"),n=a.n(l),r=a("dEAq"),c=a("H1Ra"),i=a("dMo/"),d=n.a.memo((e=>{e.demos;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"markdown"},n.a.createElement("h1",{id:"indicator-\u6307\u793a\u5668\u7ec4\u4ef6"},n.a.createElement(r["AnchorLink"],{to:"#indicator-\u6307\u793a\u5668\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"Indicator \u6307\u793a\u5668\u7ec4\u4ef6"),n.a.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},n.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),n.a.createElement("h3",{id:"1-ballindicator"},n.a.createElement(r["AnchorLink"],{to:"#1-ballindicator","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"1. BallIndicator"),n.a.createElement(c["a"],{code:"<SafeAreaView style={{ flex: 1 }}>\n  <BallIndicator />\n</SafeAreaView>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"indicator-ios1.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624173464148013948.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"2-uiactivityindicator"},n.a.createElement(r["AnchorLink"],{to:"#2-uiactivityindicator","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"2. UIActivityIndicator"),n.a.createElement(c["a"],{code:"<SafeAreaView style={{ flex: 1 }}>\n  <UIActivityIndicator />\n</SafeAreaView>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"indicator-ios1.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624173490303265458.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"3-materialindicator"},n.a.createElement(r["AnchorLink"],{to:"#3-materialindicator","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"3. MaterialIndicator"),n.a.createElement(c["a"],{code:"<SafeAreaView style={{ flex: 1 }}>\n  <MaterialIndicator />\n</SafeAreaView>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"indicator-ios1.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643177632601010878.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"4-\u4fee\u6539\u5927\u5c0f\u548c\u989c\u8272"},n.a.createElement(r["AnchorLink"],{to:"#4-\u4fee\u6539\u5927\u5c0f\u548c\u989c\u8272","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"4. \u4fee\u6539\u5927\u5c0f\u548c\u989c\u8272"),n.a.createElement(c["a"],{code:'<SafeAreaView style={{ flex: 1 }}>\n  <UIActivityIndicator color="#ff0000" size={50} />\n</SafeAreaView>',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"indicator-ios1.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643177688024869837.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.a.createElement("h2",{id:"api"},n.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"API"),n.a.createElement("h3",{id:"\u516c\u5171\u5c5e\u6027"},n.a.createElement(r["AnchorLink"],{to:"#\u516c\u5171\u5c5e\u6027","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u516c\u5171\u5c5e\u6027"),n.a.createElement(i["a"],null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"animationEasing"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u52a8\u753b Easing \u6548\u679c"),n.a.createElement("td",null,n.a.createElement("code",null,"EasingFunction")),n.a.createElement("td",null,n.a.createElement("code",null,"Easing.linear"))),n.a.createElement("tr",null,n.a.createElement("td",null,"animationDuration"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u52a8\u753b\u6267\u884c\u65f6\u957f"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"1200"))),n.a.createElement("tr",null,n.a.createElement("td",null,"animating"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u52a8\u753b\u662f\u5426\u6b63\u5728\u6267\u884c"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"interaction"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u53ef\u4ee5\u4ea4\u4e92"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"style"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u6837\u5f0f"),n.a.createElement("td",null,n.a.createElement("code",null,"ViewStyle")),n.a.createElement("td",null,"``")),n.a.createElement("tr",null,n.a.createElement("td",null,"hidesWhenStopped"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u52a8\u753b\u505c\u6b62\u65f6\u9690\u85cf"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))))),n.a.createElement("h3",{id:"ballindicator--uiactivityindicator-\u5c5e\u6027"},n.a.createElement(r["AnchorLink"],{to:"#ballindicator--uiactivityindicator-\u5c5e\u6027","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"BallIndicator / UIActivityIndicator \u5c5e\u6027"),n.a.createElement(i["a"],null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"color"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u989c\u8272"),n.a.createElement("td",null,n.a.createElement("code",null,"string")),n.a.createElement("td",null,n.a.createElement("code",null,"rgb(0,0,0)"))),n.a.createElement("tr",null,n.a.createElement("td",null,"count"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u5143\u7d20\u6570\u91cf"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"12"))),n.a.createElement("tr",null,n.a.createElement("td",null,"size"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u5927\u5c0f"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"36"))))),n.a.createElement("h3",{id:"materialindicator-\u5c5e\u6027"},n.a.createElement(r["AnchorLink"],{to:"#materialindicator-\u5c5e\u6027","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"MaterialIndicator \u5c5e\u6027"),n.a.createElement(i["a"],null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"color"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u989c\u8272"),n.a.createElement("td",null,n.a.createElement("code",null,"string")),n.a.createElement("td",null,n.a.createElement("code",null,"rgb(0,0,0)"))),n.a.createElement("tr",null,n.a.createElement("td",null,"size"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u5927\u5c0f"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"36")))))))}));t["default"]=e=>{var t=n.a.useContext(r["context"]),a=t.demos;return n.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),n.a.createElement(d,{demos:a})}}}]);