(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[58],{MZF8:function(e,t,a){"use strict";var n=a("ogwx");a.d(t,"a",(function(){return n["b"]}));a("VCU9")},Pg6R:function(e,t,a){},WtSh:function(e,t,a){"use strict";var n=a("kM82"),l=a.n(n),r=a("hKI/"),c=a.n(r);a("Pg6R");function m(e,t){return E(e)||i(e,t)||d(e,t)||o()}function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){if(e){if("string"===typeof e)return u(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function i(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,l,r=[],c=!0,m=!1;try{for(a=a.call(e);!(c=(n=a.next()).done);c=!0)if(r.push(n.value),t&&r.length===t)break}catch(o){m=!0,l=o}finally{try{c||null==a["return"]||a["return"]()}finally{if(m)throw l}}return r}}function E(e){if(Array.isArray(e))return e}var s=function(e){var t=e.children,a=Object(n["useRef"])(),r=Object(n["useState"])(!1),o=m(r,2),d=o[0],u=o[1],i=Object(n["useState"])(!1),E=m(i,2),s=E[0],b=E[1];return Object(n["useEffect"])((function(){var e=a.current,t=c()((function(){u(e.scrollLeft>0),b(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),l.a.createElement("div",{className:"__dumi-default-table"},l.a.createElement("div",{className:"__dumi-default-table-content",ref:a,"data-left-folded":d||void 0,"data-right-folded":s||void 0},l.a.createElement("table",null,t)))};t["a"]=s},Zvhb:function(e,t,a){"use strict";a.r(t);var n=a("kM82"),l=a.n(n),r=a("dEAq"),c=a("DSWR"),m=a("WtSh"),o=l.a.memo((e=>{var t=e.demos,a=t["cuboidbardemo-demo1"].component,n=t["cuboidbardemo-demo2"].component,o=t["cuboidbardemo-demo3"].component,d=t["cuboidbardemo-demo4"].component,u=t["cuboidbardemo-demo5"].component,i=t["cuboidbardemo-demo6"].component,E=t["cuboidbardemo-demo7"].component;return l.a.createElement(l.a.Fragment,null,l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"markdown"},l.a.createElement("h1",{id:"\u957f\u65b9\u4f53\u67f1\u72b6\u56fe"},l.a.createElement(r["AnchorLink"],{to:"#\u957f\u65b9\u4f53\u67f1\u72b6\u56fe","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u957f\u65b9\u4f53\u67f1\u72b6\u56fe"),l.a.createElement("h2",{id:"api"},l.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"API"),l.a.createElement(m["a"],null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"\u5c5e\u6027"),l.a.createElement("th",null,"\u5fc5\u586b"),l.a.createElement("th",null,"\u8bf4\u660e"),l.a.createElement("th",null,"\u7c7b\u578b"),l.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"xAxisData"),l.a.createElement("td",null,l.a.createElement("code",null,"true")),l.a.createElement("td",null,"x \u8f74\u6570\u636e"),l.a.createElement("td",null,l.a.createElement("code",null,"any[]")),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null,"unit"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u5355\u4f4d"),l.a.createElement("td",null,l.a.createElement("code",null,"string")),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null,"name"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u56fe\u4f8b\u540d\u79f0"),l.a.createElement("td",null,l.a.createElement("code",null,"string")),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null,"data"),l.a.createElement("td",null,l.a.createElement("code",null,"true")),l.a.createElement("td",null,"\u56fe\u8868\u6570\u636e"),l.a.createElement("td",null,l.a.createElement("code",null,"(number | string)[]")),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null,"style"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u6837\u5f0f"),l.a.createElement("td",null,l.a.createElement("code",null,"CSSProperties")),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null,"autoLoop"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u63a7\u5236\u662f\u5426\u81ea\u52a8\u8f6e\u64ad"),l.a.createElement("td",null,l.a.createElement("code",null,"boolean")),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null,"duration"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u81ea\u52a8\u8f6e\u64ad\u7684\u65f6\u957f"),l.a.createElement("td",null,l.a.createElement("code",null,"number")),l.a.createElement("td",null,l.a.createElement("code",null,"2000"))),l.a.createElement("tr",null,l.a.createElement("td",null,"config"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u81ea\u5b9a\u4e49 Echarts \u914d\u7f6e"),l.a.createElement("td",null,l.a.createElement("code",null,"ECOption")),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null,"inModal"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u662f\u5426\u5728\u5f39\u7a97\u5185\u663e\u793a"),l.a.createElement("td",null,l.a.createElement("code",null,"boolean")),l.a.createElement("td",null,l.a.createElement("code",null,"false"))),l.a.createElement("tr",null,l.a.createElement("td",null,"showYAxisLine"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u63a7\u5236\u662f\u5426\u663e\u793a y \u8f74\u7684\u7ebf"),l.a.createElement("td",null,l.a.createElement("code",null,"boolean")),l.a.createElement("td",null,l.a.createElement("code",null,"true"))),l.a.createElement("tr",null,l.a.createElement("td",null,"onEvents"),l.a.createElement("td",null,l.a.createElement("code",null,"false")),l.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u4e8b\u4ef6"),l.a.createElement("td",null,l.a.createElement("code",null,"Record<string, (params?: any) => void>")),l.a.createElement("td",null)))),l.a.createElement("h2",{id:"\u6548\u679c\u56fe-1"},l.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u56fe-1","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u56fe 1")),l.a.createElement(c["default"],t["cuboidbardemo-demo1"].previewerProps,l.a.createElement(a,null)),l.a.createElement("div",{className:"markdown"},l.a.createElement("h2",{id:"\u6548\u679c\u56fe-2"},l.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u56fe-2","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u56fe 2")),l.a.createElement(c["default"],t["cuboidbardemo-demo2"].previewerProps,l.a.createElement(n,null)),l.a.createElement("div",{className:"markdown"},l.a.createElement("h2",{id:"\u6548\u679c\u56fe-3"},l.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u56fe-3","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u56fe 3")),l.a.createElement(c["default"],t["cuboidbardemo-demo3"].previewerProps,l.a.createElement(o,null)),l.a.createElement("div",{className:"markdown"},l.a.createElement("h2",{id:"\u6548\u679c\u56fe-4-\u81ea\u52a8\u8f6e\u64ad"},l.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u56fe-4-\u81ea\u52a8\u8f6e\u64ad","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u56fe 4 \u81ea\u52a8\u8f6e\u64ad")),l.a.createElement(c["default"],t["cuboidbardemo-demo4"].previewerProps,l.a.createElement(d,null)),l.a.createElement("div",{className:"markdown"},l.a.createElement("h2",{id:"\u6548\u679c\u56fe-5-\u8f6e\u64ad\u4e24\u6b21\u540e\u505c\u6b62"},l.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u56fe-5-\u8f6e\u64ad\u4e24\u6b21\u540e\u505c\u6b62","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u56fe 5 (\u8f6e\u64ad\u4e24\u6b21\u540e\u505c\u6b62)")),l.a.createElement(c["default"],t["cuboidbardemo-demo5"].previewerProps,l.a.createElement(u,null)),l.a.createElement("div",{className:"markdown"},l.a.createElement("h2",{id:"\u6548\u679c\u56fe-6-\u5f39\u7a97"},l.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u56fe-6-\u5f39\u7a97","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u56fe 6 (\u5f39\u7a97)")),l.a.createElement(c["default"],t["cuboidbardemo-demo6"].previewerProps,l.a.createElement(i,null)),l.a.createElement("div",{className:"markdown"},l.a.createElement("h2",{id:"\u6548\u679c\u56fe-7-\u624b\u52a8\u63a7\u5236\u56fe\u8868\u8f6e\u64ad"},l.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u56fe-7-\u624b\u52a8\u63a7\u5236\u56fe\u8868\u8f6e\u64ad","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u56fe 7 (\u624b\u52a8\u63a7\u5236\u56fe\u8868\u8f6e\u64ad)")),l.a.createElement(c["default"],t["cuboidbardemo-demo7"].previewerProps,l.a.createElement(E,null))))}));t["default"]=e=>{var t=l.a.useContext(r["context"]),a=t.demos;return l.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),l.a.createElement(o,{demos:a})}}}]);