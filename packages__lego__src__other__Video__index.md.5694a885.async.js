(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[82],{MZF8:function(e,t,l){"use strict";var a=l("ogwx");l.d(t,"a",(function(){return a["b"]}));l("VCU9")},Pg6R:function(e,t,l){},WtSh:function(e,t,l){"use strict";var a=l("kM82"),n=l.n(a),r=l("hKI/"),c=l.n(r);l("Pg6R");function m(e,t){return E(e)||i(e,t)||o(e,t)||d()}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){if(e){if("string"===typeof e)return u(e,t);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,a=new Array(t);l<t;l++)a[l]=e[l];return a}function i(e,t){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var a,n,r=[],c=!0,m=!1;try{for(l=l.call(e);!(c=(a=l.next()).done);c=!0)if(r.push(a.value),t&&r.length===t)break}catch(d){m=!0,n=d}finally{try{c||null==l["return"]||l["return"]()}finally{if(m)throw n}}return r}}function E(e){if(Array.isArray(e))return e}var s=function(e){var t=e.children,l=Object(a["useRef"])(),r=Object(a["useState"])(!1),d=m(r,2),o=d[0],u=d[1],i=Object(a["useState"])(!1),E=m(i,2),s=E[0],v=E[1];return Object(a["useEffect"])((function(){var e=l.current,t=c()((function(){u(e.scrollLeft>0),v(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),n.a.createElement("div",{className:"__dumi-default-table"},n.a.createElement("div",{className:"__dumi-default-table-content",ref:l,"data-left-folded":o||void 0,"data-right-folded":s||void 0},n.a.createElement("table",null,t)))};t["a"]=s},"y4n+":function(e,t,l){"use strict";l.r(t);var a=l("kM82"),n=l.n(a),r=l("dEAq"),c=l("DSWR"),m=l("WtSh"),d=n.a.memo((e=>{var t=e.demos,l=t["videodemo-demo1"].component,a=t["videodemo-demo2"].component,d=t["videodemo-demo3"].component,o=t["videodemo-demo4"].component,u=t["videodemo-demo5"].component,i=t["videodemo-demo6"].component,E=t["videodemo-demo7"].component,s=t["videodemo-demo8"].component,v=t["videodemo-demo9"].component;return n.a.createElement(n.a.Fragment,null,n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"markdown"},n.a.createElement("h1",{id:"\u89c6\u9891"},n.a.createElement(r["AnchorLink"],{to:"#\u89c6\u9891","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u89c6\u9891"),n.a.createElement("h2",{id:"api-\u7ee7\u627f\u81ea-xgplayer"},n.a.createElement(r["AnchorLink"],{to:"#api-\u7ee7\u627f\u81ea-xgplayer","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"API (\u7ee7\u627f\u81ea xgplayer)"),n.a.createElement(m["a"],null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"id"),n.a.createElement("td",null,n.a.createElement("code",null,"true")),n.a.createElement("td",null,"\u552f\u4e00 id \u503c"),n.a.createElement("td",null,n.a.createElement("code",null,"string")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"videoUrls"),n.a.createElement("td",null,n.a.createElement("code",null,"true")),n.a.createElement("td",null,"\u89c6\u9891\u8def\u5f84\u6570\u7ec4"),n.a.createElement("td",null,n.a.createElement("code",null,"string[]")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"definitionList"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u6e05\u6670\u5ea6\u89c6\u9891\u6570\u7ec4,\u987a\u5e8f\u5e94\u4e0e videoUrls \u4fdd\u6301\u4e00\u81f4"),n.a.createElement("td",null,n.a.createElement("code",null,"{","name: string; url: string","}","[][]")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"isLoop"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u5faa\u73af\u64ad\u653e"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"visible"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u53ef\u89c1"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"muted"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u9759\u97f3\u64ad\u653e"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"false"))),n.a.createElement("tr",null,n.a.createElement("td",null,"videoInit"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u521d\u59cb\u5316\u663e\u793a\u9996\u5e27"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"enableMemory"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u5141\u8bb8\u8bb0\u5fc6\u64ad\u653e"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"false"))),n.a.createElement("tr",null,n.a.createElement("td",null,"lastPlayTimeHideDelay"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u8bb0\u5fc6\u63d0\u793a\u6587\u5b57\u5c55\u793a\u65f6\u957f(s)"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"5"))),n.a.createElement("tr",null,n.a.createElement("td",null,"currentIndex"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u624b\u52a8\u63a7\u5236\u5f53\u524d\u64ad\u653e\u96c6\u6570"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"setCurrentIndex"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u63a7\u5236\u5f53\u524d\u64ad\u653e\u89c6\u9891"),n.a.createElement("td",null,n.a.createElement("code",null,"(currentIndex: number) => void")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"style"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u6837\u5f0f"),n.a.createElement("td",null,n.a.createElement("code",null,"CSSProperties")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"className"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u7c7b\u540d"),n.a.createElement("td",null,n.a.createElement("code",null,"string")),n.a.createElement("td",null)))),n.a.createElement("h2",{id:"\u57fa\u672c\u4f7f\u7528"},n.a.createElement(r["AnchorLink"],{to:"#\u57fa\u672c\u4f7f\u7528","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u57fa\u672c\u4f7f\u7528"),n.a.createElement("p",null,"\u9ed8\u8ba4\u5faa\u73af\u64ad\u653e\u3002"),n.a.createElement("p",null,n.a.createElement("strong",null,"\u6ce8\uff1a\u56e0\u4e3a\u6d4f\u89c8\u5668\u7684\u9650\u5236\uff0c\u7528\u6237\u5fc5\u987b\u624b\u52a8\u70b9\u51fb\u64ad\u653e\u4ee5\u540e\u624d\u80fd\u5141\u8bb8\u81ea\u52a8\u64ad\u653e\u89c6\u9891\uff0c\u6216\u8005\u8bbe\u7f6e\u89c6\u9891\u4e3a\u9759\u97f3(muted)"))),n.a.createElement(c["default"],t["videodemo-demo1"].previewerProps,n.a.createElement(l,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"\u81ea\u5b9a\u4e49\u8bbe\u7f6e\u5bbd\u9ad8"},n.a.createElement(r["AnchorLink"],{to:"#\u81ea\u5b9a\u4e49\u8bbe\u7f6e\u5bbd\u9ad8","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u81ea\u5b9a\u4e49\u8bbe\u7f6e\u5bbd\u9ad8")),n.a.createElement(c["default"],t["videodemo-demo2"].previewerProps,n.a.createElement(a,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"\u542f\u7528\u8bb0\u5fc6\u64ad\u653e"},n.a.createElement(r["AnchorLink"],{to:"#\u542f\u7528\u8bb0\u5fc6\u64ad\u653e","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u542f\u7528\u8bb0\u5fc6\u64ad\u653e"),n.a.createElement("p",null,"\u4e0b\u6b21\u5f00\u59cb\u64ad\u653e\u65f6\u53ef\u4ee5\u81ea\u52a8\u8df3\u8f6c\u5230\u5bf9\u5e94\u96c6\u6570\u548c\u8fdb\u5ea6\u3002")),n.a.createElement(c["default"],t["videodemo-demo3"].previewerProps,n.a.createElement(d,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"\u81ea\u52a8\u64ad\u653e\u9759\u97f3"},n.a.createElement(r["AnchorLink"],{to:"#\u81ea\u52a8\u64ad\u653e\u9759\u97f3","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u81ea\u52a8\u64ad\u653e\uff08\u9759\u97f3\uff09")),n.a.createElement(c["default"],t["videodemo-demo4"].previewerProps,n.a.createElement(o,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"\u7981\u7528\u5faa\u73af\u64ad\u653e"},n.a.createElement(r["AnchorLink"],{to:"#\u7981\u7528\u5faa\u73af\u64ad\u653e","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u7981\u7528\u5faa\u73af\u64ad\u653e")),n.a.createElement(c["default"],t["videodemo-demo5"].previewerProps,n.a.createElement(u,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"\u6309\u94ae\u63a7\u5236\u64ad\u653e\u7b2c\u51e0\u96c6"},n.a.createElement(r["AnchorLink"],{to:"#\u6309\u94ae\u63a7\u5236\u64ad\u653e\u7b2c\u51e0\u96c6","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u6309\u94ae\u63a7\u5236\u64ad\u653e\u7b2c\u51e0\u96c6")),n.a.createElement(c["default"],t["videodemo-demo6"].previewerProps,n.a.createElement(i,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"\u6309\u94ae\u70b9\u51fb\u51fa\u73b0\u89c6\u9891\u5f39\u7a97"},n.a.createElement(r["AnchorLink"],{to:"#\u6309\u94ae\u70b9\u51fb\u51fa\u73b0\u89c6\u9891\u5f39\u7a97","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u6309\u94ae\u70b9\u51fb\u51fa\u73b0\u89c6\u9891\u5f39\u7a97")),n.a.createElement(c["default"],t["videodemo-demo7"].previewerProps,n.a.createElement(E,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"\u914d\u7f6e\u6e05\u6670\u5ea6"},n.a.createElement(r["AnchorLink"],{to:"#\u914d\u7f6e\u6e05\u6670\u5ea6","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u914d\u7f6e\u6e05\u6670\u5ea6"),n.a.createElement("p",null,"\u4f20\u5165\u6e05\u6670\u5ea6\u89c6\u9891\u6570\u7ec4 definitionList,\u987a\u5e8f\u5e94\u4e0e videoUrls \u4fdd\u6301\u4e00\u81f4,\u5f53\u53ea\u6709\u4e00\u4e2a\u6e05\u6670\u5ea6\u6e90\u7684\u65f6\u5019\u6e05\u6670\u5ea6\u914d\u7f6e\u4f1a\u9ed8\u8ba4\u9690\u85cf\u3002")),n.a.createElement(c["default"],t["videodemo-demo8"].previewerProps,n.a.createElement(s,null)),n.a.createElement("div",{className:"markdown"},n.a.createElement("h2",{id:"\u89c6\u9891\u6570\u7ec4\u4e3a\u7a7a"},n.a.createElement(r["AnchorLink"],{to:"#\u89c6\u9891\u6570\u7ec4\u4e3a\u7a7a","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u89c6\u9891\u6570\u7ec4\u4e3a\u7a7a")),n.a.createElement(c["default"],t["videodemo-demo9"].previewerProps,n.a.createElement(v,null))))}));t["default"]=e=>{var t=n.a.useContext(r["context"]),l=t.demos;return n.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),n.a.createElement(d,{demos:l})}}}]);