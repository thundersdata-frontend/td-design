(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[100],{"PQ+i":function(e,t,l){"use strict";l.r(t);var n=l("1QO0"),a=l.n(n),r=l("Lav9"),c=l("3yXN"),o=l("oLWh"),d=a.a.memo((e=>{e.demos;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("h1",{id:"password-\u5bc6\u7801\u6846\u7ec4\u4ef6"},a.a.createElement(r["AnchorLink"],{to:"#password-\u5bc6\u7801\u6846\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"Password \u5bc6\u7801\u6846\u7ec4\u4ef6"),a.a.createElement("p",null,"\u4f7f\u7528\u672c\u7ec4\u4ef6\u9700\u8981\u5355\u72ec\u5b89\u88c5\uff1a",a.a.createElement("strong",null,"yarn add @td-design/react-native-password")),a.a.createElement("p",null,"\u63a8\u8350\u4f7f\u7528",a.a.createElement(r["Link"],{to:"feedback/passcode"},"Passcode"),"\u7ec4\u4ef6\u4ee3\u66ff"),a.a.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},a.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),a.a.createElement("h3",{id:"1-\u57fa\u672c"},a.a.createElement(r["AnchorLink"],{to:"#1-\u57fa\u672c","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"1. \u57fa\u672c"),a.a.createElement(c["a"],{code:"<Text>\u57fa\u672c:</Text>\n  <WhiteSpace />\n  <Password onDone={onDone} />",lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"\u5bc6\u7801\u6846\u7ec4\u4ef6 ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546617636014.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"2-\u663e\u793a\u5149\u6807"},a.a.createElement(r["AnchorLink"],{to:"#2-\u663e\u793a\u5149\u6807","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"2. \u663e\u793a\u5149\u6807"),a.a.createElement(c["a"],{code:"<Text>\u663e\u793a\u5149\u6807:</Text>\n  <WhiteSpace />\n  <Password onDone={onDone} showCursor />",lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"\u663e\u793a\u5149\u6807 ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546603881375.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"3-\u57fa\u672c\u5f39\u7a97"},a.a.createElement(r["AnchorLink"],{to:"#3-\u57fa\u672c\u5f39\u7a97","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"3. \u57fa\u672c\u5f39\u7a97"),a.a.createElement(c["a"],{code:"<Text>\u5f39\u7a97:</Text>\n  <WhiteSpace />\n  <Button\n    title=\"modal\"\n    onPress={() => {\n      Password.modal({ title: '\u4eff\u652f\u4ed8\u5b9d\u652f\u4ed8', onDone: onDone });\n    }}\n  />",lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"\u57fa\u672c\u5f39\u7a97 ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963546615332497.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"4-\u5f39\u7a97\u663e\u793a\u5149\u6807"},a.a.createElement(r["AnchorLink"],{to:"#4-\u5f39\u7a97\u663e\u793a\u5149\u6807","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"4. \u5f39\u7a97\u663e\u793a\u5149\u6807"),a.a.createElement(c["a"],{code:"<Text>\u5f39\u7a97\u663e\u793a\u5149\u6807:</Text>\n  <WhiteSpace />\n  <Button\n    title=\"modal\"\n    onPress={() => {\n      Password.modal({ title: '\u4eff\u652f\u4ed8\u5b9d\u652f\u4ed8', onDone: onDone, showCursor: true });\n    }}\n  />",lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"\u5f39\u7a97\u663e\u793a\u5149\u6807 ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608963548250977751.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h2",{id:"api"},a.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"API"),a.a.createElement("h3",{id:"password-\u7ec4\u4ef6"},a.a.createElement(r["AnchorLink"],{to:"#password-\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"password \u7ec4\u4ef6"),a.a.createElement(o["a"],null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u5fc5\u586b"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"),a.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"length"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5bc6\u7801\u6846\u957f\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,a.a.createElement("code",null,"6"))),a.a.createElement("tr",null,a.a.createElement("td",null,"onDone"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u6309\u952e\u5b8c\u6210\u4e8b\u4ef6\u56de\u8c03\u4e8b\u4ef6"),a.a.createElement("td",null,a.a.createElement("code",null,"(password: string) => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"clean"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u662f\u5426\u6e05\u9664"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null,a.a.createElement("code",null,"true"))),a.a.createElement("tr",null,a.a.createElement("td",null,"onChange"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5bc6\u7801\u6539\u53d8\u4e8b\u4ef6\u56de\u8c03\u4e8b\u4ef6"),a.a.createElement("td",null,a.a.createElement("code",null,"(password: string) => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"showCursor"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u662f\u5426\u663e\u793a\u5149\u6807"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null,a.a.createElement("code",null,"false"))),a.a.createElement("tr",null,a.a.createElement("td",null,"ref"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u83b7\u53d6 input \u7684 ref"),a.a.createElement("td",null,a.a.createElement("code",null,"PasswordInputRef")),a.a.createElement("td",null,a.a.createElement("code",null,"false"))))),a.a.createElement("h3",{id:"passwordinputref"},a.a.createElement(r["AnchorLink"],{to:"#passwordinputref","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"PasswordInputRef"),a.a.createElement(o["a"],null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"show"),a.a.createElement("td",null,"\u663e\u793a\u952e\u76d8"),a.a.createElement("td",null,a.a.createElement("code",null,"() => void"))),a.a.createElement("tr",null,a.a.createElement("td",null,"hide"),a.a.createElement("td",null,"\u9690\u85cf\u952e\u76d8"),a.a.createElement("td",null,a.a.createElement("code",null,"() => void"))),a.a.createElement("tr",null,a.a.createElement("td",null,"clean"),a.a.createElement("td",null,"\u6e05\u9664 imput \u7684\u8f93\u5165"),a.a.createElement("td",null,a.a.createElement("code",null,"() => void"))))),a.a.createElement("h3",{id:"passwordmodal-\u7ec4\u4ef6"},a.a.createElement(r["AnchorLink"],{to:"#passwordmodal-\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"passwordModal \u7ec4\u4ef6"),a.a.createElement(o["a"],null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u5fc5\u586b"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"),a.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"title"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5bc6\u7801\u6846\u6807\u9898"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"length"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5bc6\u7801\u6846\u957f\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,a.a.createElement("code",null,"6"))),a.a.createElement("tr",null,a.a.createElement("td",null,"onChange"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5bc6\u7801\u6539\u53d8\u4e8b\u4ef6\u56de\u8c03\u4e8b\u4ef6"),a.a.createElement("td",null,a.a.createElement("code",null,"(password: string) => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"showCursor"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u662f\u5426\u663e\u793a\u5149\u6807"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null,a.a.createElement("code",null,"false")))))))}));t["default"]=e=>{var t=a.a.useContext(r["context"]),l=t.demos;return a.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),a.a.createElement(d,{demos:l})}},nHFt:function(e,t,l){},oLWh:function(e,t,l){"use strict";var n=l("1QO0"),a=l.n(n),r=l("bIC1"),c=l.n(r);l("nHFt");function o(e,t){return s(e)||i(e,t)||m(e,t)||d()}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,t){if(e){if("string"===typeof e)return u(e,t);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,n=new Array(t);l<t;l++)n[l]=e[l];return n}function i(e,t){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var n,a,r=[],c=!0,o=!1;try{for(l=l.call(e);!(c=(n=l.next()).done);c=!0)if(r.push(n.value),t&&r.length===t)break}catch(d){o=!0,a=d}finally{try{c||null==l["return"]||l["return"]()}finally{if(o)throw a}}return r}}function s(e){if(Array.isArray(e))return e}var E=function(e){var t=e.children,l=Object(n["useRef"])(),r=Object(n["useState"])(!1),d=o(r,2),m=d[0],u=d[1],i=Object(n["useState"])(!1),s=o(i,2),E=s[0],h=s[1];return Object(n["useEffect"])((function(){var e=l.current,t=c()((function(){u(e.scrollLeft>0),h(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),a.a.createElement("div",{className:"__dumi-default-table"},a.a.createElement("div",{className:"__dumi-default-table-content",ref:l,"data-left-folded":m||void 0,"data-right-folded":E||void 0},a.a.createElement("table",null,t)))};t["a"]=E}}]);