(self["webpackChunkthundersdata_frontend"]=self["webpackChunkthundersdata_frontend"]||[]).push([[3064],{99500:function(){},86371:function(e,t,n){"use strict";n.r(t);var l=n(59496),a=n(3646),r=n(22811),c=n(16414),u=l.memo((e=>{e.demos;return l.createElement(l.Fragment,null,l.createElement("div",{className:"markdown"},l.createElement("h1",{id:"pagination-\u5206\u9875\u5668\u7ec4\u4ef6"},l.createElement(a.AnchorLink,{to:"#pagination-\u5206\u9875\u5668\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"Pagination \u5206\u9875\u5668\u7ec4\u4ef6"),l.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},l.createElement(a.AnchorLink,{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),l.createElement("h3",{id:"1-\u5e38\u89c4\u7684\u5206\u9875\u5668"},l.createElement(a.AnchorLink,{to:"#1-\u5e38\u89c4\u7684\u5206\u9875\u5668","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"1. \u5e38\u89c4\u7684\u5206\u9875\u5668"),l.createElement(r.Z,{code:"<Pagination\n  total={66}\n  onChange={e => {\n    Alert.alert(e + '');\n  }}\n/>",lang:"tsx"}),l.createElement("center",null,l.createElement("figure",null,l.createElement("img",{alt:"\u5e38\u89c4\u7684\u5206\u9875\u5668 ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609321630003460726.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),l.createElement("h3",{id:"2-\u624b\u52a8\u8bbe\u7f6e-page"},l.createElement(a.AnchorLink,{to:"#2-\u624b\u52a8\u8bbe\u7f6e-page","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"2. \u624b\u52a8\u8bbe\u7f6e page"),l.createElement(r.Z,{code:"<Pagination\n  page={3}\n  total={66}\n  onChange={e => {\n    Alert.alert(e + '');\n  }}\n/>",lang:"tsx"}),l.createElement("center",null,l.createElement("figure",null,l.createElement("img",{alt:"\u624b\u52a8\u8bbe\u7f6e page ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609321630007353263.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),l.createElement("h3",{id:"3-\u81ea\u5b9a\u4e49\u6309\u94ae"},l.createElement(a.AnchorLink,{to:"#3-\u81ea\u5b9a\u4e49\u6309\u94ae","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"3. \u81ea\u5b9a\u4e49\u6309\u94ae"),l.createElement(r.Z,{code:"<Pagination\n  total={66}\n  onChange={e => {\n    Alert.alert(e + '');\n  }}\n  prevButtonRender={isFirstPage => {\n    return isFirstPage ? <Text>isFirstPage</Text> : <Text>notFirstPage</Text>;\n  }}\n  nextButtonRender={isLastPage => {\n    return isLastPage ? <Text>LastPage</Text> : <Text>notLastPage</Text>;\n  }}\n  counterRender={(currentindex, totalPages) => {\n    return <Text>{currentindex + '/' + totalPages}</Text>;\n  }}\n/>",lang:"tsx"}),l.createElement("center",null,l.createElement("figure",null,l.createElement("img",{alt:"\u81ea\u5b9a\u4e49\u6309\u94ae ios",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609321630007184387.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),l.createElement("h2",{id:"api"},l.createElement(a.AnchorLink,{to:"#api","aria-hidden":"true",tabIndex:-1},l.createElement("span",{className:"icon icon-link"})),"API"),l.createElement(c.Z,null,l.createElement("thead",null,l.createElement("tr",null,l.createElement("th",null,"\u5c5e\u6027"),l.createElement("th",null,"\u5fc5\u586b"),l.createElement("th",null,"\u8bf4\u660e"),l.createElement("th",null,"\u7c7b\u578b"),l.createElement("th",null,"\u9ed8\u8ba4\u503c"))),l.createElement("tbody",null,l.createElement("tr",null,l.createElement("td",null,"page"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u5f53\u524d\u9875\u6570"),l.createElement("td",null,l.createElement("code",null,"number")),l.createElement("td",null,l.createElement("code",null,"1"))),l.createElement("tr",null,l.createElement("td",null,"total"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u603b\u6570\u91cf"),l.createElement("td",null,l.createElement("code",null,"number")),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"pageSize"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u4e00\u9875\u7684\u6570\u91cf"),l.createElement("td",null,l.createElement("code",null,"number")),l.createElement("td",null,l.createElement("code",null,"10"))),l.createElement("tr",null,l.createElement("td",null,"onChange"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u9875\u9762\u6539\u53d8\u7684\u4e8b\u4ef6"),l.createElement("td",null,l.createElement("code",null,"(page: number) => void")),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"prevButtonText"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u4e0a\u4e00\u9875\u6309\u94ae\u6587\u5b57"),l.createElement("td",null,l.createElement("code",null,"string")),l.createElement("td",null,l.createElement("code",null,"\u4e0a\u4e00\u9875"))),l.createElement("tr",null,l.createElement("td",null,"nextButtonText"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u4e0b\u4e00\u9875\u6309\u94ae\u6587\u5b57"),l.createElement("td",null,l.createElement("code",null,"string")),l.createElement("td",null,l.createElement("code",null,"\u4e0b\u4e00\u9875"))),l.createElement("tr",null,l.createElement("td",null,"prevButtonRender"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u81ea\u5b9a\u4e49\u4e0a\u4e00\u9875\u6309\u94ae"),l.createElement("td",null,l.createElement("code",null,"(isFirstPage: boolean) => ReactElement")),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"nextButtonRender"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u81ea\u5b9a\u4e49\u4e0b\u4e00\u9875\u6309\u94ae"),l.createElement("td",null,l.createElement("code",null,"(isLastPage: boolean) => ReactElement")),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"counterRender"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u81ea\u5b9a\u4e49\u8ba1\u6570\u5668"),l.createElement("td",null,l.createElement("code",null,"(current: number, totalpages: number) => ReactElement")),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"activeOpacity"),l.createElement("td",null,l.createElement("code",null,"false")),l.createElement("td",null,"\u4e0a\u4e00\u9875/\u4e0b\u4e00\u9875\u6309\u4e0b\u65f6\u7684\u4e0d\u900f\u660e\u5ea6"),l.createElement("td",null,l.createElement("code",null,"number")),l.createElement("td",null,l.createElement("code",null,"0.6")))))))}));t["default"]=e=>{var t=l.useContext(a.context),n=t.demos;return l.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&a.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),l.createElement(u,{demos:n})}},16414:function(e,t,n){"use strict";var l=n(59496),a=n(48440),r=n.n(a);n(99500);function c(e,t){return i(e)||m(e,t)||o(e,t)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){if(e){if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,l=new Array(t);n<t;n++)l[n]=e[n];return l}function m(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var l,a,r=[],c=!0,u=!1;try{for(n=n.call(e);!(c=(l=n.next()).done);c=!0)if(r.push(l.value),t&&r.length===t)break}catch(o){u=!0,a=o}finally{try{c||null==n["return"]||n["return"]()}finally{if(u)throw a}}return r}}function i(e){if(Array.isArray(e))return e}var E=function(e){var t=e.children,n=(0,l.useRef)(),a=(0,l.useState)(!1),u=c(a,2),o=u[0],d=u[1],m=(0,l.useState)(!1),i=c(m,2),E=i[0],s=i[1];return(0,l.useEffect)((function(){var e=n.current,t=r()((function(){d(e.scrollLeft>0),s(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),l.createElement("div",{className:"__dumi-default-table"},l.createElement("div",{className:"__dumi-default-table-content",ref:n,"data-left-folded":o||void 0,"data-right-folded":E||void 0},l.createElement("table",null,t)))};t["Z"]=E}}]);