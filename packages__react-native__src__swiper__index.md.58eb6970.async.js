(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[123],{WpQk:function(e,t,a){},"dMo/":function(e,t,a){"use strict";var l=a("q1tI"),n=a.n(l),r=a("hKI/"),c=a.n(r);a("WpQk");function i(e,t){return u(e)||o(e,t)||m(e,t)||d()}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,t){if(e){if("string"===typeof e)return s(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,l=new Array(t);a<t;a++)l[a]=e[a];return l}function o(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var l,n,r=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(l=a.next()).done);c=!0)if(r.push(l.value),t&&r.length===t)break}catch(d){i=!0,n=d}finally{try{c||null==a["return"]||a["return"]()}finally{if(i)throw n}}return r}}function u(e){if(Array.isArray(e))return e}var E=function(e){var t=e.children,a=Object(l["useRef"])(),r=Object(l["useState"])(!1),d=i(r,2),m=d[0],s=d[1],o=Object(l["useState"])(!1),u=i(o,2),E=u[0],p=u[1];return Object(l["useEffect"])((function(){var e=a.current,t=c()((function(){s(e.scrollLeft>0),p(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),n.a.createElement("div",{className:"__dumi-default-table"},n.a.createElement("div",{className:"__dumi-default-table-content",ref:a,"data-left-folded":m||void 0,"data-right-folded":E||void 0},n.a.createElement("table",null,t)))};t["a"]=E},wCQs:function(e,t,a){"use strict";a.r(t);var l=a("q1tI"),n=a.n(l),r=a("dEAq"),c=a("H1Ra"),i=a("dMo/"),d=n.a.memo((e=>{e.demos;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"markdown"},n.a.createElement("h1",{id:"swiper-\u8f6e\u64ad\u7ec4\u4ef6"},n.a.createElement(r["AnchorLink"],{to:"#swiper-\u8f6e\u64ad\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"Swiper \u8f6e\u64ad\u7ec4\u4ef6"),n.a.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},n.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),n.a.createElement("h3",{id:"1-\u9ed8\u8ba4\u914d\u7f6e"},n.a.createElement(r["AnchorLink"],{to:"#1-\u9ed8\u8ba4\u914d\u7f6e","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"1. \u9ed8\u8ba4\u914d\u7f6e"),n.a.createElement(c["a"],{code:"<Swiper>\n  <Image source={require('../../assets/images/img-01.jpg')} />\n  <Image source={require('../../assets/images/img-02.jpg')} />\n  <Image source={require('../../assets/images/img-03.jpeg')} />\n</Swiper>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:"750px"}},n.a.createElement("div",{style:{width:"375px"}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:"375px"}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"swiper-ios1.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607584871809874524.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"swiper-android1.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609224784649569708.gif",style:{width:"375px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"2-\u5bbd\u5ea6-200\u9ad8\u5ea6-100"},n.a.createElement(r["AnchorLink"],{to:"#2-\u5bbd\u5ea6-200\u9ad8\u5ea6-100","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"2. \u5bbd\u5ea6 200\uff0c\u9ad8\u5ea6 100"),n.a.createElement(c["a"],{code:"<Swiper width={px(200)} height={px(100)}>\n  <Image source={require('../../assets/images/img-01.jpg')} />\n  <Image source={require('../../assets/images/img-02.jpg')} />\n  <Image source={require('../../assets/images/img-03.jpeg')} />\n</Swiper>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:"750px"}},n.a.createElement("div",{style:{width:"375px"}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:"375px"}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"swiper-ios2.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585106049348222.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"swiper-android2.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227009933305440.gif",style:{width:"375px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"3-\u6307\u793a\u5668\u4f4d\u7f6e\u9760\u4e0a\u5c45\u5de6"},n.a.createElement(r["AnchorLink"],{to:"#3-\u6307\u793a\u5668\u4f4d\u7f6e\u9760\u4e0a\u5c45\u5de6","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"3. \u6307\u793a\u5668\u4f4d\u7f6e\u9760\u4e0a\uff0c\u5c45\u5de6"),n.a.createElement(c["a"],{code:"<Swiper width={px(200)} height={px(100)} direction=\"top\" align=\"left\">\n  <Image source={require('../../assets/images/img-01.jpg')} />\n  <Image source={require('../../assets/images/img-02.jpg')} />\n  <Image source={require('../../assets/images/img-03.jpeg')} />\n</Swiper>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:"750px"}},n.a.createElement("div",{style:{width:"375px"}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:"375px"}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"swiper-ios3.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585219854042589.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"swiper-android3.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227015241690060.gif",style:{width:"375px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"4-\u5faa\u73af\u6eda\u52a8\u4e3a-false"},n.a.createElement(r["AnchorLink"],{to:"#4-\u5faa\u73af\u6eda\u52a8\u4e3a-false","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"4. \u5faa\u73af\u6eda\u52a8\u4e3a false"),n.a.createElement(c["a"],{code:"<Swiper loop={false}>\n  <Image source={require('../../assets/images/img-01.jpg')} />\n  <Image source={require('../../assets/images/img-02.jpg')} />\n  <Image source={require('../../assets/images/img-03.jpeg')} />\n</Swiper>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:"750px"}},n.a.createElement("div",{style:{width:"375px"}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:"375px"}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"swiper-ios4.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585787622959805.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"swiper-android4.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227021507692685.gif",style:{width:"375px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"5-\u8f6e\u64ad\u65f6\u957f\u4e3a-1000-\u6beb\u79d2"},n.a.createElement(r["AnchorLink"],{to:"#5-\u8f6e\u64ad\u65f6\u957f\u4e3a-1000-\u6beb\u79d2","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"5. \u8f6e\u64ad\u65f6\u957f\u4e3a 1000 \u6beb\u79d2"),n.a.createElement(c["a"],{code:"<Swiper duration={1000}>\n  <Image source={require('../../assets/images/img-01.jpg')} />\n  <Image source={require('../../assets/images/img-02.jpg')} />\n  <Image source={require('../../assets/images/img-03.jpeg')} />\n</Swiper>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:"750px"}},n.a.createElement("div",{style:{width:"375px"}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:"375px"}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"swiper-ios5.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585607849541264.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"swiper-android5.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227012921787456.gif",style:{width:"375px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"6-\u5782\u76f4\u6eda\u52a8"},n.a.createElement(r["AnchorLink"],{to:"#6-\u5782\u76f4\u6eda\u52a8","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"6. \u5782\u76f4\u6eda\u52a8"),n.a.createElement(c["a"],{code:"<Swiper horizontal={false}>\n  <Image source={require('../../assets/images/img-01.jpg')} />\n  <Image source={require('../../assets/images/img-02.jpg')} />\n  <Image source={require('../../assets/images/img-03.jpeg')} />\n</Swiper>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:"750px"}},n.a.createElement("div",{style:{width:"375px"}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:"375px"}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"swiper-ios6.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585911161208451.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"swiper-android6.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227022456767840.gif",style:{width:"375px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"7-\u6307\u793a\u5668\u4f4d\u7f6e\u9760\u4e0b\u5c45\u5de6"},n.a.createElement(r["AnchorLink"],{to:"#7-\u6307\u793a\u5668\u4f4d\u7f6e\u9760\u4e0b\u5c45\u5de6","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"7. \u6307\u793a\u5668\u4f4d\u7f6e\u9760\u4e0b\uff0c\u5c45\u5de6"),n.a.createElement(c["a"],{code:"<Swiper horizontal={false} direction=\"left\" align=\"bottom\">\n  <Image source={require('../../assets/images/img-01.jpg')} />\n  <Image source={require('../../assets/images/img-02.jpg')} />\n  <Image source={require('../../assets/images/img-03.jpeg')} />\n</Swiper>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:"750px"}},n.a.createElement("div",{style:{width:"375px"}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:"375px"}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"swiper-ios7.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607586027795186876.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"swiper-android7.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227018370844355.gif",style:{width:"375px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"8-\u4fee\u6539\u6307\u793a\u5668\u989c\u8272"},n.a.createElement(r["AnchorLink"],{to:"#8-\u4fee\u6539\u6307\u793a\u5668\u989c\u8272","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"8. \u4fee\u6539\u6307\u793a\u5668\u989c\u8272"),n.a.createElement(c["a"],{code:"<Swiper dotColor=\"gold\">\n  <Image source={require('../../assets/images/img-01.jpg')} />\n  <Image source={require('../../assets/images/img-02.jpg')} />\n  <Image source={require('../../assets/images/img-03.jpeg')} />\n</Swiper>",lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:"750px"}},n.a.createElement("div",{style:{width:"375px"}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:"375px"}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"swiper-ios8.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607586190454474657.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"swiper-android8.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227019936969430.gif",style:{width:"375px",border:"1px solid #ddd"}}))),n.a.createElement("h2",{id:"api"},n.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"API"),n.a.createElement(i["a"],null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"auto"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u81ea\u52a8\u6eda\u52a8"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"loop"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u5faa\u73af\u6eda\u52a8"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"width"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u8f6e\u64ad\u56fe\u5bbd\u5ea6"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"deviceWidth"))),n.a.createElement("tr",null,n.a.createElement("td",null,"height"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u8f6e\u64ad\u56fe\u9ad8\u5ea6"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"320"))),n.a.createElement("tr",null,n.a.createElement("td",null,"duration"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u8f6e\u64ad\u65f6\u957f\uff08\u6beb\u79d2\uff09"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"3500"))),n.a.createElement("tr",null,n.a.createElement("td",null,"horizontal"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u6c34\u5e73\u6eda\u52a8"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"paginationEnabled"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u663e\u793a\u6eda\u52a8\u6307\u793a\u5668"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"true"))),n.a.createElement("tr",null,n.a.createElement("td",null,"dotSize"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u6307\u793a\u5668\u5927\u5c0f"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"10"))),n.a.createElement("tr",null,n.a.createElement("td",null,"dotColor"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u6307\u793a\u5668\u989c\u8272"),n.a.createElement("td",null,n.a.createElement("code",null,"string")),n.a.createElement("td",null,n.a.createElement("code",null,"#fff"))),n.a.createElement("tr",null,n.a.createElement("td",null,"direction"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u6307\u793a\u5668\u4f4d\u7f6e\u3002"),n.a.createElement("td",null,n.a.createElement("code",null,"top")," | ",n.a.createElement("code",null,"left")," | ",n.a.createElement("code",null,"right")," | ",n.a.createElement("code",null,"bottom")),n.a.createElement("td",null,n.a.createElement("code",null,"bottom"))),n.a.createElement("tr",null,n.a.createElement("td",null,"align"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u6307\u793a\u5668\u5e03\u5c40\u65b9\u5f0f\u3002"),n.a.createElement("td",null,n.a.createElement("code",null,"AlignType")),n.a.createElement("td",null,n.a.createElement("code",null,"center"))))),n.a.createElement("h2",{id:"\u4e3b\u9898\u76f8\u5173\u5c5e\u6027"},n.a.createElement(r["AnchorLink"],{to:"#\u4e3b\u9898\u76f8\u5173\u5c5e\u6027","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u4e3b\u9898\u76f8\u5173\u5c5e\u6027"),n.a.createElement(i["a"],null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u666e\u901a\u6a21\u5f0f"),n.a.createElement("th",null,"\u6697\u9ed1\u6a21\u5f0f")))),n.a.createElement("p",null,n.a.createElement("em",null,"palette \u548c darkPalette \u7684\u5b9a\u4e49\u8be6\u89c1",n.a.createElement(r["Link"],{to:"/react-native/theme"},"\u5185\u7f6e\u4e3b\u9898"))),n.a.createElement("p",null,n.a.createElement("strong",null,"\u5173\u4e8e",n.a.createElement("code",null,"direction"),"\u548c",n.a.createElement("code",null,"align"),"\u5c5e\u6027\u7684\u8bf4\u660e")),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,n.a.createElement("code",null,"direction"),":"),n.a.createElement("ul",null,n.a.createElement("li",null,"horizontal=true \u65f6\u53ef\u9009\u503c",n.a.createElement("code",null,"left")," | ",n.a.createElement("code",null,"right"),"\uff0c\u8868\u793a\u6307\u793a\u5668\u5728\u8f6e\u64ad\u56fe\u5de6\u4fa7\u6216\u8005\u53f3\u4fa7"),n.a.createElement("li",null,"horizontal=false \u65f6\u53ef\u9009\u503c",n.a.createElement("code",null,"top")," | ",n.a.createElement("code",null,"bottom"),"\uff0c\u8868\u793a\u6307\u793a\u5668\u5728\u8f6e\u64ad\u56fe\u9876\u90e8\u6216\u8005\u5e95\u90e8"))),n.a.createElement("li",null,n.a.createElement("p",null,n.a.createElement("code",null,"align"),":"),n.a.createElement("ul",null,n.a.createElement("li",null,"horizontal=true \u65f6\u53ef\u9009\u503c",n.a.createElement("code",null,"left")," | ",n.a.createElement("code",null,"center")," | ",n.a.createElement("code",null,"right"),"\uff0c\u8868\u793a\u6307\u793a\u5668\u9760\u5de6/\u5c45\u4e2d/\u9760\u53f3"),n.a.createElement("li",null,"horizontal=false \u65f6\u53ef\u9009\u503c",n.a.createElement("code",null,"top")," | ",n.a.createElement("code",null,"middle")," | ",n.a.createElement("code",null,"bottom"),"\uff0c\u8868\u793a\u6307\u793a\u5668\u9760\u4e0a/\u5c45\u4e2d/\u9760\u4e0b")))),n.a.createElement("p",null,n.a.createElement("code",null,"AlignType"),"\u7684\u7c7b\u578b\u5982\u4e0b\uff1a"),n.a.createElement(c["a"],{code:"type AlignType = 'left' | 'top' | 'center' | 'middle' | 'right' | 'bottom';",lang:"ts"})))}));t["default"]=e=>{var t=n.a.useContext(r["context"]),a=t.demos;return n.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),n.a.createElement(d,{demos:a})}}}]);