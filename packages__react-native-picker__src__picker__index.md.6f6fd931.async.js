(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[97],{WpQk:function(e,t,l){},"dMo/":function(e,t,l){"use strict";var a=l("q1tI"),n=l.n(a),r=l("hKI/"),c=l.n(r);l("WpQk");function i(e,t){return s(e)||d(e,t)||m(e,t)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,t){if(e){if("string"===typeof e)return o(e,t);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,a=new Array(t);l<t;l++)a[l]=e[l];return a}function d(e,t){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var a,n,r=[],c=!0,i=!1;try{for(l=l.call(e);!(c=(a=l.next()).done);c=!0)if(r.push(a.value),t&&r.length===t)break}catch(u){i=!0,n=u}finally{try{c||null==l["return"]||l["return"]()}finally{if(i)throw n}}return r}}function s(e){if(Array.isArray(e))return e}var E=function(e){var t=e.children,l=Object(a["useRef"])(),r=Object(a["useState"])(!1),u=i(r,2),m=u[0],o=u[1],d=Object(a["useState"])(!1),s=i(d,2),E=s[0],p=s[1];return Object(a["useEffect"])((function(){var e=l.current,t=c()((function(){o(e.scrollLeft>0),p(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),n.a.createElement("div",{className:"__dumi-default-table"},n.a.createElement("div",{className:"__dumi-default-table-content",ref:l,"data-left-folded":m||void 0,"data-right-folded":E||void 0},n.a.createElement("table",null,t)))};t["a"]=E},l7Kb:function(e,t,l){"use strict";l.r(t);var a=l("q1tI"),n=l.n(a),r=l("dEAq"),c=l("H1Ra"),i=l("dMo/"),u=n.a.memo((e=>{e.demos;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"markdown"},n.a.createElement("h1",{id:"picker-\u9009\u62e9\u5668"},n.a.createElement(r["AnchorLink"],{to:"#picker-\u9009\u62e9\u5668","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"Picker \u9009\u62e9\u5668"),n.a.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},n.a.createElement(r["AnchorLink"],{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),n.a.createElement("h3",{id:"1-\u5355\u5217\u5f39\u7a97"},n.a.createElement(r["AnchorLink"],{to:"#1-\u5355\u5217\u5f39\u7a97","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"1. \u5355\u5217\u5f39\u7a97"),n.a.createElement(c["a"],{code:'<Picker\n  title="\u8bf7\u9009\u62e9\u6570\u5b57"\n  visible={visible}\n  cols={1}\n  onClose={() => setVisible(false)}\n  data={singleData}\n  value={value}\n  onChange={val => setValue(val)}\n/>',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"picker-ios1.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947429591938736.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"2-\u591a\u5217\u5f39\u7a97"},n.a.createElement(r["AnchorLink"],{to:"#2-\u591a\u5217\u5f39\u7a97","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"2. \u591a\u5217\u5f39\u7a97"),n.a.createElement(c["a"],{code:'<Picker\n  title="\u8bf7\u9009\u62e9\u6570\u5b57"\n  visible={visible}\n  cols={2}\n  onClose={() => setVisible(false)}\n  data={multipleData}\n  value={value}\n  onChange={val => setValue(val)}\n/>',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"picker-ios2.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947549012113947.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"3-\u7ea7\u8054\u5f39\u7a97"},n.a.createElement(r["AnchorLink"],{to:"#3-\u7ea7\u8054\u5f39\u7a97","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"3. \u7ea7\u8054\u5f39\u7a97"),n.a.createElement(c["a"],{code:'<Picker\n  title="\u8bf7\u9009\u62e9\u6570\u5b57"\n  visible={visible}\n  cols={3}\n  cascade\n  onClose={() => setVisible(false)}\n  data={cascadeData}\n  value={value}\n  onChange={val => setValue(val)}\n/>',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"picker-ios3.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947759285483619.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"4-\u9875\u9762\u5185\u5c55\u793a"},n.a.createElement(r["AnchorLink"],{to:"#4-\u9875\u9762\u5185\u5c55\u793a","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"4. \u9875\u9762\u5185\u5c55\u793a"),n.a.createElement(c["a"],{code:'const pickerRef = useRef<{ getValue: () => { value: ItemValue[] } }>(null);\n<Button title="getValue" onPress={() => {\n  const data = pickerRef.current?.getValue();\n  setValue(data.value.join(\'\'));\n}} />\n<Text>{value}</Text>\n<Picker\n  title="\u8bf7\u9009\u62e9\u6570\u5b57"\n  visible={visible}\n  cols={2}\n  ref={pickerRef}\n  value={value}\n  displayType="view"\n  data={multipleData}\n/>',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"picker-ios4.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607948474785655481.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.a.createElement("h2",{id:"api"},n.a.createElement(r["AnchorLink"],{to:"#api","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"API"),n.a.createElement("h3",{id:"picker-\u5c5e\u6027"},n.a.createElement(r["AnchorLink"],{to:"#picker-\u5c5e\u6027","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"Picker \u5c5e\u6027"),n.a.createElement(i["a"],null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"data"),n.a.createElement("td",null,n.a.createElement("code",null,"true")),n.a.createElement("td",null,"\u9009\u62e9\u9879\u6570\u636e"),n.a.createElement("td",null,n.a.createElement("code",null,"CascadePickerItemProps[]")," | ",n.a.createElement("code",null,"Array<CascadePickerItemProps[]>")),n.a.createElement("td",null,n.a.createElement("code",null,"[]"))),n.a.createElement("tr",null,n.a.createElement("td",null,"cascade"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u662f\u5426\u7ea7\u8054\u9009\u62e9"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"false"))),n.a.createElement("tr",null,n.a.createElement("td",null,"cols"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u9009\u62e9\u5217\u6570\u91cf"),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"3"))),n.a.createElement("tr",null,n.a.createElement("td",null,"value"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u9009\u4e2d\u7684\u503c"),n.a.createElement("td",null,n.a.createElement("code",null,"ItemValue[]")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"onChange"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u9009\u62e9\u56de\u8c03"),n.a.createElement("td",null,n.a.createElement("code",null,"(value?: ItemValue[]) => void")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"style"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u81ea\u5b9a\u4e49\u6837\u5f0f"),n.a.createElement("td",null,n.a.createElement("code",null,"ViewStyle")),n.a.createElement("td",null)))),n.a.createElement("h3",{id:"modalpicker-\u5c5e\u6027"},n.a.createElement(r["AnchorLink"],{to:"#modalpicker-\u5c5e\u6027","aria-hidden":"true",tabIndex:-1},n.a.createElement("span",{className:"icon icon-link"})),"ModalPicker \u5c5e\u6027"),n.a.createElement(i["a"],null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"title"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u9009\u62e9\u5668\u6807\u9898"),n.a.createElement("td",null,n.a.createElement("code",null,"string")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"displayType"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u9009\u62e9\u5668\u663e\u793a\u7c7b\u578b\u3002view \u8868\u793a\u5728\u9875\u9762\u663e\u793a\uff1bmodal \u8868\u793a\u5728\u5f39\u7a97\u4e2d\u663e\u793a"),n.a.createElement("td",null,n.a.createElement("code",null,"view")," | ",n.a.createElement("code",null,"modal")),n.a.createElement("td",null,n.a.createElement("code",null,"modal"))),n.a.createElement("tr",null,n.a.createElement("td",null,"visible"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u63a7\u5236\u5f39\u7a97\u663e\u793a"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"onClose"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u5f39\u7a97\u5173\u95ed\u4e8b\u4ef6"),n.a.createElement("td",null,n.a.createElement("code",null,"() => void")),n.a.createElement("td",null)))),n.a.createElement("p",null,n.a.createElement("em",null,n.a.createElement("code",null,"CascadePickerItemProps"),"\u7ee7\u627f\u81ea",n.a.createElement("code",null,"@react-native-picker/picker"),"\u7684",n.a.createElement("code",null,"PickerItemProps"),"\u5c5e\u6027")),n.a.createElement(c["a"],{code:"export interface CascadePickerItemProps extends PickerItemProps {\n  children?: CascadePickerItemProps[];\n}\n\nexport interface PickerItemProps {\n  label?: string;\n  value: ItemValue;\n  color?: string;\n  testID?: string;\n}\n\nexport type ItemValue = number | string;",lang:"ts"})))}));t["default"]=e=>{var t=n.a.useContext(r["context"]),l=t.demos;return n.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),n.a.createElement(u,{demos:l})}}}]);