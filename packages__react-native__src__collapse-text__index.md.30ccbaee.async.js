(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[111],{WpQk:function(e,t,l){},"dMo/":function(e,t,l){"use strict";var n=l("q1tI"),a=l.n(n),r=l("hKI/"),c=l.n(r);l("WpQk");function u(e,t){return E(e)||i(e,t)||d(e,t)||o()}function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){if(e){if("string"===typeof e)return m(e,t);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?m(e,t):void 0}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,n=new Array(t);l<t;l++)n[l]=e[l];return n}function i(e,t){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var n,a,r=[],c=!0,u=!1;try{for(l=l.call(e);!(c=(n=l.next()).done);c=!0)if(r.push(n.value),t&&r.length===t)break}catch(o){u=!0,a=o}finally{try{c||null==l["return"]||l["return"]()}finally{if(u)throw a}}return r}}function E(e){if(Array.isArray(e))return e}var s=function(e){var t=e.children,l=Object(n["useRef"])(),r=Object(n["useState"])(!1),o=u(r,2),d=o[0],m=o[1],i=Object(n["useState"])(!1),E=u(i,2),s=E[0],f=E[1];return Object(n["useEffect"])((function(){var e=l.current,t=c()((function(){m(e.scrollLeft>0),f(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),a.a.createElement("div",{className:"__dumi-default-table"},a.a.createElement("div",{className:"__dumi-default-table-content",ref:l,"data-left-folded":d||void 0,"data-right-folded":s||void 0},a.a.createElement("table",null,t)))};t["a"]=s},yfuO:function(e,t,l){"use strict";l.r(t);var n=l("q1tI"),a=l.n(n),r=l("dEAq"),c=l("H1Ra"),u=l("dMo/"),o=a.a.memo((e=>{e.demos;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("h1",{id:"collapsetext-\u6587\u672c\u6298\u53e0\u7ec4\u4ef6"},a.a.createElement(r["AnchorLink"],{to:"#collapsetext-\u6587\u672c\u6298\u53e0\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"CollapseText \u6587\u672c\u6298\u53e0\u7ec4\u4ef6"),a.a.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},a.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),a.a.createElement("h3",{id:"1-\u9ed8\u8ba4\u6548\u679c"},a.a.createElement(r["AnchorLink"],{to:"#1-\u9ed8\u8ba4\u6548\u679c","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"1. \u9ed8\u8ba4\u6548\u679c"),a.a.createElement(c["a"],{code:"const text = `\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9`;\n\n<CollapseText text={text} defaultNumberOfLines={3} lineHeight={px(20)} />;",lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"collapseText-ios1.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608113460423595271.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"2-\u81ea\u5b9a\u4e49\u6837\u5f0f"},a.a.createElement(r["AnchorLink"],{to:"#2-\u81ea\u5b9a\u4e49\u6837\u5f0f","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"2. \u81ea\u5b9a\u4e49\u6837\u5f0f"),a.a.createElement(c["a"],{code:"const text = `\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\n  \u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9\u6211\u662f\u5185\u5bb9`;\n\n<CollapseText\n  text={text}\n  defaultNumberOfLines={3}\n  lineHeight={px(20)}\n  textStyle={{ color: 'red', fontSize: px(16) }}\n  textContainerStyle={{ marginHorizontal: px(10) }}\n  expandStyle={{ color: 'gold', fontSize: px(16) }}\n/>;",lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"collapseText-ios2.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608115028918829687.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h2",{id:"api"},a.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"API"),a.a.createElement(u["a"],null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u5fc5\u586b"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"),a.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"text"),a.a.createElement("td",null,a.a.createElement("code",null,"true")),a.a.createElement("td",null,"\u6587\u672c"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"defaultNumberOfLines"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u9ed8\u8ba4\u5c55\u793a\u884c\u6570"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,a.a.createElement("code",null,"2"))),a.a.createElement("tr",null,a.a.createElement("td",null,"lineHeight"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u6bcf\u884c\u6587\u672c\u9ad8\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,a.a.createElement("code",null,"18"))),a.a.createElement("tr",null,a.a.createElement("td",null,"textStyle"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u6587\u672c\u6837\u5f0f"),a.a.createElement("td",null,a.a.createElement("code",null,"TextStyle")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"textContainerStyle"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u6587\u672c\u5bb9\u5668\u6837\u5f0f"),a.a.createElement("td",null,a.a.createElement("code",null,"ViewStyle")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"expandText"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5c55\u5f00\u65f6\u5019\u7684\u6587\u672c"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null,a.a.createElement("code",null,"\u5c55\u5f00"))),a.a.createElement("tr",null,a.a.createElement("td",null,"unExpandText"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u6536\u8d77\u65f6\u5019\u7684\u6587\u672c"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null,a.a.createElement("code",null,"\u6536\u8d77"))),a.a.createElement("tr",null,a.a.createElement("td",null,"expandStyle"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5c55\u5f00/\u6536\u8d77\u6587\u672c\u7684\u6837\u5f0f"),a.a.createElement("td",null,a.a.createElement("code",null,"TextStyle")),a.a.createElement("td",null))))))}));t["default"]=e=>{var t=a.a.useContext(r["context"]),l=t.demos;return a.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),a.a.createElement(o,{demos:l})}}}]);