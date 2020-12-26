(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[36],{Z2D2:function(e,t,l){"use strict";l.r(t);var a=l("q1tI"),n=l.n(a),c=(l("B2uJ"),l("+su7"),l("qOys")),r=l.n(c);l("5Yjd");t["default"]=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"markdown"},n.a.createElement("h1",{id:"picker-\u9009\u62e9\u5668\u7ec4\u4ef6"},n.a.createElement("a",{"aria-hidden":"true",href:"#picker-\u9009\u62e9\u5668\u7ec4\u4ef6"},n.a.createElement("span",{className:"icon icon-link"})),"Picker \u9009\u62e9\u5668\u7ec4\u4ef6"),n.a.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},n.a.createElement("a",{"aria-hidden":"true",href:"#\u6548\u679c\u6f14\u793a"},n.a.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),n.a.createElement("h3",{id:"1-\u5355\u5217\u5f39\u7a97"},n.a.createElement("a",{"aria-hidden":"true",href:"#1-\u5355\u5217\u5f39\u7a97"},n.a.createElement("span",{className:"icon icon-link"})),"1. \u5355\u5217\u5f39\u7a97"),n.a.createElement(r.a,{code:'<Picker\n  title="\u8bf7\u9009\u62e9\u6570\u5b57"\n  visible={visible}\n  cols={1}\n  onClose={() => setVisible(false)}\n  data={singleData}\n  value={value}\n  onChange={val => setValue(val)}\n/>\n',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:750}},n.a.createElement("div",{style:{width:375}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:375}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"picker-ios1.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947429591938736.png",style:{width:375,marginRight:10,border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"picker-android1.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608272854650896701.png",style:{width:375,border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"2-\u591a\u5217\u5f39\u7a97"},n.a.createElement("a",{"aria-hidden":"true",href:"#2-\u591a\u5217\u5f39\u7a97"},n.a.createElement("span",{className:"icon icon-link"})),"2. \u591a\u5217\u5f39\u7a97"),n.a.createElement(r.a,{code:'<Picker\n  title="\u8bf7\u9009\u62e9\u6570\u5b57"\n  visible={visible}\n  cols={2}\n  onClose={() => setVisible(false)}\n  data={multipleData}\n  value={value}\n  onChange={val => setValue(val)}\n/>\n',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:750}},n.a.createElement("div",{style:{width:375}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:375}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"picker-ios2.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947549012113947.png",style:{width:375,marginRight:10,border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"picker-android2.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608272856757420536.png",style:{width:375,border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"3-\u7ea7\u8054\u5f39\u7a97"},n.a.createElement("a",{"aria-hidden":"true",href:"#3-\u7ea7\u8054\u5f39\u7a97"},n.a.createElement("span",{className:"icon icon-link"})),"3. \u7ea7\u8054\u5f39\u7a97"),n.a.createElement(r.a,{code:'<Picker\n  title="\u8bf7\u9009\u62e9\u6570\u5b57"\n  visible={visible}\n  cols={3}\n  cascade\n  onClose={() => setVisible(false)}\n  data={cascadeData}\n  value={value}\n  onChange={val => setValue(val)}\n/>\n',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:750}},n.a.createElement("div",{style:{width:375}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:375}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"picker-ios3.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607947759285483619.gif",style:{width:375,marginRight:10,border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"picker-android3.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608272932677944730.gif",style:{width:375,border:"1px solid #ddd"}}))),n.a.createElement("h3",{id:"4-\u9875\u9762\u5185\u5c55\u793a"},n.a.createElement("a",{"aria-hidden":"true",href:"#4-\u9875\u9762\u5185\u5c55\u793a"},n.a.createElement("span",{className:"icon icon-link"})),"4. \u9875\u9762\u5185\u5c55\u793a"),n.a.createElement(r.a,{code:'const pickerRef = useRef<{ getValue: () => { value: ItemValue[] } }>(null);\n<Picker ref={pickerRef} title="\u8bf7\u9009\u62e9\u6570\u5b57" displayType="view" cols={2} data={multipleData} />;\n',lang:"tsx"}),n.a.createElement("center",null,n.a.createElement("div",{style:{display:"flex",width:750}},n.a.createElement("div",{style:{width:375}},"IOS\u6548\u679c\u56fe"),n.a.createElement("div",{style:{width:375}},"Android\u6548\u679c\u56fe"))),n.a.createElement("center",null,n.a.createElement("figure",null,n.a.createElement("img",{alt:"picker-ios4.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607948474785655481.gif",style:{width:375,marginRight:10,border:"1px solid #ddd"}}),n.a.createElement("img",{alt:"picker-android4.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608272936990451141.gif",style:{width:375,border:"1px solid #ddd"}}))),n.a.createElement("h2",{id:"api"},n.a.createElement("a",{"aria-hidden":"true",href:"#api"},n.a.createElement("span",{className:"icon icon-link"})),"API"),n.a.createElement("h3",{id:"picker-\u5c5e\u6027"},n.a.createElement("a",{"aria-hidden":"true",href:"#picker-\u5c5e\u6027"},n.a.createElement("span",{className:"icon icon-link"})),"Picker \u5c5e\u6027"),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"data"),n.a.createElement("td",null,n.a.createElement("code",null,"true")),n.a.createElement("td",null),n.a.createElement("td",null,n.a.createElement("code",null,"CascadePickerItemProps[]")," | ",n.a.createElement("code",null,"Array<CascadePickerItemProps[]>")),n.a.createElement("td",null,n.a.createElement("code",null,"[]"))),n.a.createElement("tr",null,n.a.createElement("td",null,"cascade"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null,n.a.createElement("code",null,"false"))),n.a.createElement("tr",null,n.a.createElement("td",null,"cols"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null),n.a.createElement("td",null,n.a.createElement("code",null,"number")),n.a.createElement("td",null,n.a.createElement("code",null,"3"))),n.a.createElement("tr",null,n.a.createElement("td",null,"value"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null),n.a.createElement("td",null,n.a.createElement("code",null,"ItemValue[]")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"onChange"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null),n.a.createElement("td",null,n.a.createElement("code",null,"(value?: ItemValue[]) => void")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"style"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null),n.a.createElement("td",null,n.a.createElement("code",null,"ViewStyle")),n.a.createElement("td",null)))),n.a.createElement("h3",{id:"modalpicker-\u5c5e\u6027"},n.a.createElement("a",{"aria-hidden":"true",href:"#modalpicker-\u5c5e\u6027"},n.a.createElement("span",{className:"icon icon-link"})),"ModalPicker \u5c5e\u6027"),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"\u5c5e\u6027"),n.a.createElement("th",null,"\u5fc5\u586b"),n.a.createElement("th",null,"\u8bf4\u660e"),n.a.createElement("th",null,"\u7c7b\u578b"),n.a.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"title"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u9009\u62e9\u5668\u6807\u9898"),n.a.createElement("td",null,n.a.createElement("code",null,"string")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"displayType"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u9009\u62e9\u5668\u663e\u793a\u7c7b\u578b\u3002view \u8868\u793a\u5728\u9875\u9762\u663e\u793a\uff1bmodal \u8868\u793a\u5728\u5f39\u7a97\u4e2d\u663e\u793a"),n.a.createElement("td",null,n.a.createElement("code",null,"view")," | ",n.a.createElement("code",null,"modal")),n.a.createElement("td",null,n.a.createElement("code",null,"modal"))),n.a.createElement("tr",null,n.a.createElement("td",null,"visible"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u63a7\u5236\u5f39\u7a97\u663e\u793a"),n.a.createElement("td",null,n.a.createElement("code",null,"boolean")),n.a.createElement("td",null)),n.a.createElement("tr",null,n.a.createElement("td",null,"onClose"),n.a.createElement("td",null,n.a.createElement("code",null,"false")),n.a.createElement("td",null,"\u5f39\u7a97\u5173\u95ed\u4e8b\u4ef6"),n.a.createElement("td",null,n.a.createElement("code",null,"() => void")),n.a.createElement("td",null)))),n.a.createElement("p",null,n.a.createElement("em",null,n.a.createElement("code",null,"CascadePickerItemProps"),"\u7ee7\u627f\u81ea",n.a.createElement("code",null,"@react-native-community/picker"),"\u7684",n.a.createElement("code",null,"PickerItemProps"),"\u5c5e\u6027")),n.a.createElement(r.a,{code:"export interface CascadePickerItemProps extends PickerItemProps {\n  children?: CascadePickerItemProps[];\n}\n\nexport interface PickerItemProps {\n  label?: string;\n  value: ItemValue;\n  color?: string;\n  testID?: string;\n}\n\nexport type ItemValue = number | string;\n",lang:"ts"})))}}}]);