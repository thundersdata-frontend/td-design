(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[130],{Pg6R:function(e,t,l){},WtSh:function(e,t,l){"use strict";var n=l("kM82"),a=l.n(n),r=l("hKI/"),c=l.n(r);l("Pg6R");function u(e,t){return o(e)||E(e,t)||d(e,t)||m()}function m(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){if(e){if("string"===typeof e)return i(e,t);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,n=new Array(t);l<t;l++)n[l]=e[l];return n}function E(e,t){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var n,a,r=[],c=!0,u=!1;try{for(l=l.call(e);!(c=(n=l.next()).done);c=!0)if(r.push(n.value),t&&r.length===t)break}catch(m){u=!0,a=m}finally{try{c||null==l["return"]||l["return"]()}finally{if(u)throw a}}return r}}function o(e){if(Array.isArray(e))return e}var s=function(e){var t=e.children,l=Object(n["useRef"])(),r=Object(n["useState"])(!1),m=u(r,2),d=m[0],i=m[1],E=Object(n["useState"])(!1),o=u(E,2),s=o[0],h=o[1];return Object(n["useEffect"])((function(){var e=l.current,t=c()((function(){i(e.scrollLeft>0),h(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),a.a.createElement("div",{className:"__dumi-default-table"},a.a.createElement("div",{className:"__dumi-default-table-content",ref:l,"data-left-folded":d||void 0,"data-right-folded":s||void 0},a.a.createElement("table",null,t)))};t["a"]=s},"dx+c":function(e,t,l){"use strict";l.r(t);var n=l("kM82"),a=l.n(n),r=l("dEAq"),c=l("6T1g"),u=l("WtSh"),m=a.a.memo((e=>{e.demos;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("h1",{id:"menu-\u83dc\u5355\u7ec4\u4ef6"},a.a.createElement(r["AnchorLink"],{to:"#menu-\u83dc\u5355\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"Menu \u83dc\u5355\u7ec4\u4ef6"),a.a.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},a.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),a.a.createElement("h3",{id:"1-menuitem"},a.a.createElement(r["AnchorLink"],{to:"#1-menuitem","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"1. MenuItem"),a.a.createElement(c["a"],{code:'<Menu>\n  <MenuItem title="UI Kitten" />\n  <MenuItem title="Kitten Tricks" />\n  <MenuItem title="Nebular" />\n</Menu>',lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182636025692280.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"2-menugroup"},a.a.createElement(r["AnchorLink"],{to:"#2-menugroup","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"2. MenuGroup"),a.a.createElement(c["a"],{code:'<Menu {...{ selectedIndex }}>\n  <MenuGroup id="1" title="Akveo React Native">\n    <MenuItem id="1-1" title="UI Kitten" />\n    <MenuItem id="1-2" title="Kitten Tricks" />\n  </MenuGroup>\n  <MenuGroup id="2" title="Akveo Angular">\n    <MenuItem id="2-1" title="Nebular" />\n    <MenuItem id="2-2" title="ngx-admin" />\n    <MenuItem id="2-3" title="UI Bakery" />\n  </MenuGroup>\n  <MenuGroup id="3" title="Akveo Design">\n    <MenuItem id="3-1" title="Eva Design System" />\n    <MenuItem id="3-2" title="Eva Icons" />\n  </MenuGroup>\n  <MenuItem id="4-1" title="Eva Design System" />\n  <MenuItem id="4-2" title="Eva Icons" />\n</Menu>',lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182742563505265.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"3-\u9ed8\u8ba4\u9009\u4e2d"},a.a.createElement(r["AnchorLink"],{to:"#3-\u9ed8\u8ba4\u9009\u4e2d","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"3. \u9ed8\u8ba4\u9009\u4e2d"),a.a.createElement(c["a"],{code:'const [selectedIndex, setSelectedIndex] = useState<IndexPath>({ row: \'3-2\', section: \'3\' });\n\n<Menu selectedIndex={selectedIndex} onSelect={setSelectedIndex}>\n  <MenuGroup id="1" title="Akveo React Native">\n    <MenuItem id="1-1" title="UI Kitten" />\n    <MenuItem id="1-2" title="Kitten Tricks" />\n  </MenuGroup>\n  <MenuGroup id="2" title="Akveo Angular">\n    <MenuItem id="2-1" title="Nebular" />\n    <MenuItem id="2-2" title="ngx-admin" />\n    <MenuItem id="2-3" title="UI Bakery" />\n  </MenuGroup>\n  <MenuGroup id="3" title="Akveo Design">\n    <MenuItem id="3-1" title="Eva Design System" />\n    <MenuItem id="3-2" title="Eva Icons" />\n  </MenuGroup>\n</Menu>;',lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182794298569975.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"4-\u6807\u9898\u5de6\u4fa7\u56fe\u6807"},a.a.createElement(r["AnchorLink"],{to:"#4-\u6807\u9898\u5de6\u4fa7\u56fe\u6807","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"4. \u6807\u9898\u5de6\u4fa7\u56fe\u6807"),a.a.createElement(c["a"],{code:'<Menu>\n  <MenuGroup id="1" title="Akveo React Native" left={<IconCreate />}>\n    <MenuItem id="1-1" title="UI Kitten" />\n    <MenuItem id="1-2" title="Kitten Tricks" />\n  </MenuGroup>\n  <MenuGroup id="2" title="Akveo Angular" left={<IconNotification />}>\n    <MenuItem id="2-1" title="Nebular" />\n    <MenuItem id="2-2" title="ngx-admin" />\n    <MenuItem id="2-3" title="UI Bakery" />\n  </MenuGroup>\n  <MenuGroup id="3" title="Akveo Design" left={<IconHome />}>\n    <MenuItem id="3-1" title="Eva Design System" />\n    <MenuItem id="3-2" title="Eva Icons" />\n  </MenuGroup>\n</Menu>',lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182918993710418.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"5-menuitem-\u53f3\u4fa7\u56fe\u6807"},a.a.createElement(r["AnchorLink"],{to:"#5-menuitem-\u53f3\u4fa7\u56fe\u6807","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"5. MenuItem \u53f3\u4fa7\u56fe\u6807"),a.a.createElement(c["a"],{code:'<Menu>\n  <MenuGroup id="1" title="Akveo React Native">\n    <MenuItem id="1-1" title="UI Kitten" right={<IconCreate />} />\n    <MenuItem id="1-2" title="Kitten Tricks" />\n  </MenuGroup>\n  <MenuGroup id="2" title="Akveo Angular">\n    <MenuItem id="2-1" title="Nebular" right={<IconNotification />} />\n    <MenuItem id="2-2" title="ngx-admin" />\n    <MenuItem id="2-3" title="UI Bakery" />\n  </MenuGroup>\n  <MenuGroup id="3" title="Akveo Design">\n    <MenuItem id="3-1" title="Eva Design System" right={<IconHome />} />\n    <MenuItem id="3-2" title="Eva Icons" />\n  </MenuGroup>\n</Menu>',lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182990373408617.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h3",{id:"6-\u8bbe\u7f6e\u5bbd\u5ea6\u548c\u884c\u9ad8"},a.a.createElement(r["AnchorLink"],{to:"#6-\u8bbe\u7f6e\u5bbd\u5ea6\u548c\u884c\u9ad8","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"6. \u8bbe\u7f6e\u5bbd\u5ea6\u548c\u884c\u9ad8"),a.a.createElement(c["a"],{code:'<Menu width={300} itemHeight={60}>\n  <MenuGroup id="1" title="Akveo React Native">\n    <MenuItem id="1-1" title="UI Kitten" />\n    <MenuItem id="1-2" title="Kitten Tricks" />\n  </MenuGroup>\n  <MenuGroup id="2" title="Akveo Angular">\n    <MenuItem id="2-1" title="Nebular" />\n    <MenuItem id="2-2" title="ngx-admin" />\n    <MenuItem id="2-3" title="UI Bakery" />\n  </MenuGroup>\n  <MenuGroup id="3" title="Akveo Design">\n    <MenuItem id="3-1" title="Eva Design System" />\n    <MenuItem id="3-2" title="Eva Icons" />\n  </MenuGroup>\n</Menu>',lang:"tsx"}),a.a.createElement("center",null,a.a.createElement("figure",null,a.a.createElement("img",{alt:"",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643183036261732843.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),a.a.createElement("h2",{id:"api"},a.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"API"),a.a.createElement("h3",{id:"menu"},a.a.createElement(r["AnchorLink"],{to:"#menu","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"Menu"),a.a.createElement(u["a"],null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u5fc5\u586b"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"),a.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"selectedIndex"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5f53\u524d\u9009\u4e2d\u7684 MenuItem"),a.a.createElement("td",null,a.a.createElement("code",null,"IndexPath")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"onSelect"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u9009\u4e2d MenuItem \u65f6\u89e6\u53d1\u7684\u4e8b\u4ef6"),a.a.createElement("td",null,a.a.createElement("code",null,"(item: IndexPath) => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"width"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5bbd\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,a.a.createElement("code",null,"deviceWidth"))),a.a.createElement("tr",null,a.a.createElement("td",null,"itemHeight"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"MenuItem \u7684\u884c\u9ad8"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null,a.a.createElement("code",null,"40"))),a.a.createElement("tr",null,a.a.createElement("td",null,"activeBgColor"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"MenuItem \u9009\u4e2d\u65f6\u80cc\u666f\u8272"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"activeTextColor"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"MenuItem \u9009\u4e2d\u65f6\u6587\u5b57\u989c\u8272"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"inactiveBgColor"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"MenuItem \u672a\u9009\u4e2d\u65f6\u80cc\u666f\u8272"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"inactiveTextColor"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"MenuItem \u672a\u9009\u4e2d\u65f6\u6587\u5b57\u989c\u8272"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"style"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u6837\u5f0f"),a.a.createElement("td",null,a.a.createElement("code",null,"ViewStyle")),a.a.createElement("td",null)))),a.a.createElement("h3",{id:"menugroup"},a.a.createElement(r["AnchorLink"],{to:"#menugroup","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"MenuGroup"),a.a.createElement(u["a"],null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u5fc5\u586b"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"),a.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"id"),a.a.createElement("td",null,a.a.createElement("code",null,"true")),a.a.createElement("td",null,"\u552f\u4e00\u6807\u8bc6"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"title"),a.a.createElement("td",null,a.a.createElement("code",null,"true")),a.a.createElement("td",null,"\u6807\u9898"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"left"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5de6\u4fa7\u81ea\u5b9a\u4e49\u5185\u5bb9\uff0c\u5982\u56fe\u6807"),a.a.createElement("td",null,a.a.createElement("code",null,"ReactNode")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"disabled"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u662f\u5426\u7981\u7528 group"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null,a.a.createElement("code",null,"false"))),a.a.createElement("tr",null,a.a.createElement("td",null,"width"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5bbd\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"height"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u9ad8\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"onSelect"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u900f\u4f20\u70b9\u51fb\u65f6\u89e6\u53d1\u7684\u4e8b\u4ef6\u5230 MenuItem"),a.a.createElement("td",null,a.a.createElement("code",null,"(selectedIndex: IndexPath) => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"selectedIndex"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5f53\u524d\u9009\u4e2d\u7684 MenuItem \u7684 id"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"section"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5f53\u524d\u5c55\u5f00\u7684 MenuGroup \u7684 id"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null,a.a.createElement("code",null,"false"))),a.a.createElement("tr",null,a.a.createElement("td",null,"style"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u6837\u5f0f"),a.a.createElement("td",null,a.a.createElement("code",null,"ViewStyle")),a.a.createElement("td",null)))),a.a.createElement("h3",{id:"menuitem"},a.a.createElement(r["AnchorLink"],{to:"#menuitem","aria-hidden":"true",tabIndex:-1},a.a.createElement("span",{className:"icon icon-link"})),"MenuItem"),a.a.createElement(u["a"],null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"\u5c5e\u6027"),a.a.createElement("th",null,"\u5fc5\u586b"),a.a.createElement("th",null,"\u8bf4\u660e"),a.a.createElement("th",null,"\u7c7b\u578b"),a.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"id"),a.a.createElement("td",null,a.a.createElement("code",null,"true")),a.a.createElement("td",null,"\u552f\u4e00\u6807\u8bc6"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"title"),a.a.createElement("td",null,a.a.createElement("code",null,"true")),a.a.createElement("td",null,"\u6807\u9898"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"left"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5de6\u4fa7\u81ea\u5b9a\u4e49\u5185\u5bb9\uff0c\u5982\u56fe\u6807"),a.a.createElement("td",null,a.a.createElement("code",null,"ReactNode")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"right"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u53f3\u4fa7\u81ea\u5b9a\u4e49\u5185\u5bb9\uff0c\u5982\u56fe\u6807"),a.a.createElement("td",null,a.a.createElement("code",null,"ReactNode")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"disabled"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u662f\u5426\u7981\u7528 MenuItem"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null,a.a.createElement("code",null,"false"))),a.a.createElement("tr",null,a.a.createElement("td",null,"width"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5bbd\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"height"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u9ad8\u5ea6"),a.a.createElement("td",null,a.a.createElement("code",null,"number")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"onSelect"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u900f\u4f20\u70b9\u51fb\u65f6\u89e6\u53d1\u7684\u4e8b\u4ef6\u5230 MenuItem"),a.a.createElement("td",null,a.a.createElement("code",null,"(selectedIndex: IndexPath) => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"onPress"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u70b9\u51fb\u4e00\u4e2a MenuItem \u65f6\u89e6\u53d1\u7684\u4e8b\u4ef6"),a.a.createElement("td",null,a.a.createElement("code",null,"() => void")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"inGroup"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u662f\u5426\u662f\u5728 MenuGroup \u4e0b"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null,a.a.createElement("code",null,"false"))),a.a.createElement("tr",null,a.a.createElement("td",null,"selectedIndex"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u5f53\u524d\u9009\u4e2d\u7684 MenuItem \u7684 id"),a.a.createElement("td",null,a.a.createElement("code",null,"boolean")),a.a.createElement("td",null,a.a.createElement("code",null,"false"))),a.a.createElement("tr",null,a.a.createElement("td",null,"section"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u6240\u5728\u7684 MenuGroup \u7684 id"),a.a.createElement("td",null,a.a.createElement("code",null,"string")),a.a.createElement("td",null)),a.a.createElement("tr",null,a.a.createElement("td",null,"style"),a.a.createElement("td",null,a.a.createElement("code",null,"false")),a.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u6837\u5f0f"),a.a.createElement("td",null,a.a.createElement("code",null,"ViewStyle")),a.a.createElement("td",null)))),a.a.createElement(c["a"],{code:"interface IndexPath {\n  /** MenuItem \u7684 id */\n  row?: string;\n  /** MenuGroup \u7684 id */\n  section?: string;\n}",lang:"ts"})))}));t["default"]=e=>{var t=a.a.useContext(r["context"]),l=t.demos;return a.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),a.a.createElement(m,{demos:l})}}}]);