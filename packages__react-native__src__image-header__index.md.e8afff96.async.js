(self["webpackChunkthundersdata_frontend"]=self["webpackChunkthundersdata_frontend"]||[]).push([[9232],{25365:function(){},82414:function(e,t,l){"use strict";l.r(t);var n=l(59496),r=l(19111),a=l(73376),c=l(99987),d=n.memo((e=>{e.demos;return n.createElement(n.Fragment,null,n.createElement("div",{className:"markdown"},n.createElement("h1",{id:"imageheader-\u56fe\u7247\u5934\u90e8\u7ec4\u4ef6"},n.createElement(r.AnchorLink,{to:"#imageheader-\u56fe\u7247\u5934\u90e8\u7ec4\u4ef6","aria-hidden":"true",tabIndex:-1},n.createElement("span",{className:"icon icon-link"})),"ImageHeader \u56fe\u7247\u5934\u90e8\u7ec4\u4ef6"),n.createElement("h2",{id:"\u6548\u679c\u6f14\u793a"},n.createElement(r.AnchorLink,{to:"#\u6548\u679c\u6f14\u793a","aria-hidden":"true",tabIndex:-1},n.createElement("span",{className:"icon icon-link"})),"\u6548\u679c\u6f14\u793a"),n.createElement("h3",{id:"1-\u666e\u901a-imageheader"},n.createElement(r.AnchorLink,{to:"#1-\u666e\u901a-imageheader","aria-hidden":"true",tabIndex:-1},n.createElement("span",{className:"icon icon-link"})),"1. \u666e\u901a ImageHeader"),n.createElement(a.Z,{code:'<ImageHeader headerBackgroundImg={require(\'../../assets/images/bg_rank.png\')} headerHeight={px(161)} {...props}>\n  <Flex justifyContent="center" backgroundColor="white" height={100}>\n    <Text>111</Text>\n  </Flex>\n</ImageHeader>',lang:"tsx"}),n.createElement("center",null,n.createElement("figure",null,n.createElement("img",{alt:"header-ios1.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609999430064140139.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.createElement("h3",{id:"2-imageheader-\u914d\u7f6e-leftright-\u548c-headerleftcolor"},n.createElement(r.AnchorLink,{to:"#2-imageheader-\u914d\u7f6e-leftright-\u548c-headerleftcolor","aria-hidden":"true",tabIndex:-1},n.createElement("span",{className:"icon icon-link"})),"2. ImageHeader \u914d\u7f6e left\u3001right \u548c headerLeftColor"),n.createElement(a.Z,{code:'<ImageHeader\n  headerBackgroundImg={require(\'../../assets/images/bg_rank.png\')}\n  headerHeight={px(161)}\n  headerLeftColor={theme.colors.white}\n  headerLeft="\u8fd4\u56de"\n  headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}\n  {...props}\n>\n  <Flex justifyContent="center" backgroundColor="white" height={100}>\n    <Text>111</Text>\n  </Flex>\n</ImageHeader>',lang:"tsx"}),n.createElement("center",null,n.createElement("figure",null,n.createElement("img",{alt:"header-ios2.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609999550703021067.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.createElement("h3",{id:"3-imageheader-\u914d\u7f6e-headerbackgroundcolor"},n.createElement(r.AnchorLink,{to:"#3-imageheader-\u914d\u7f6e-headerbackgroundcolor","aria-hidden":"true",tabIndex:-1},n.createElement("span",{className:"icon icon-link"})),"3. ImageHeader \u914d\u7f6e headerBackgroundColor"),n.createElement(a.Z,{code:'<ImageHeader\n  headerBackgroundImg={require(\'../../assets/images/bg_rank.png\')}\n  headerHeight={px(161)}\n  headerBackgroundColor={theme.colors.white}\n  headerLeft="\u8fd4\u56de"\n  headerRight={<Icon name="delete" size={px(20)} color={theme.colors.white} />}\n  {...props}\n>\n  <Flex justifyContent="center" height={100}>\n    <Text>111</Text>\n  </Flex>\n</ImageHeader>',lang:"tsx"}),n.createElement("center",null,n.createElement("figure",null,n.createElement("img",{alt:"header-ios3.png",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610000705310241428.png",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.createElement("h3",{id:"4-animatedheader"},n.createElement(r.AnchorLink,{to:"#4-animatedheader","aria-hidden":"true",tabIndex:-1},n.createElement("span",{className:"icon icon-link"})),"4. AnimatedHeader"),n.createElement(a.Z,{code:'import { useScrollHandler } from \'react-native-redash\';\nimport Animated from \'react-native-reanimated\';\n\nexport default () => {\n  const { scrollHandler, y } = useScrollHandler();\n\n  return (\n    <AnimateHeader\n        scrollY={y}\n        scrollHeight={200}\n        headerTitle="\u6d4b\u8bd5\u554a\u554a\u554a\u554a\u554a"\n        headerLeft="\u8fd4\u56de"\n        headerBackgroundColor={theme.colors.white}\n        {...props}\n        headerRight={\n          <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.goBack()}>\n            <Icon name="delete" size={px(20)} color={theme.colors.primaryColor} />\n          </TouchableOpacity>\n        }\n      />\n      <Animated.ScrollView {...scrollHandler}>\n        <ImageHeader\n          headerBackgroundImg={require(\'../../assets/images/bg_rank.png\')}\n          headerHeight={px(161)}\n          headerLeftColor={theme.colors.white}\n          headerRight={\n            <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.goBack()}>\n              <Icon name="delete" size={px(20)} color={theme.colors.primaryColor} />\n            </TouchableOpacity>\n          }\n          {...props}\n        >\n          <Flex justifyContent="center" height={100}>\n            <Text>111</Text>\n          </Flex>\n        </ImageHeader>\n        <Box width={200} height={900} />\n      </Animated.ScrollView>\n  )\n}',lang:"tsx"}),n.createElement("center",null,n.createElement("figure",null,n.createElement("img",{alt:"header-ios4.gif",src:"https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608877076955547998.gif",style:{width:"375px",marginRight:"10px",border:"1px solid #ddd"}}))),n.createElement("h2",{id:"imageheader-\u7ec4\u4ef6-api"},n.createElement(r.AnchorLink,{to:"#imageheader-\u7ec4\u4ef6-api","aria-hidden":"true",tabIndex:-1},n.createElement("span",{className:"icon icon-link"})),"ImageHeader \u7ec4\u4ef6 API"),n.createElement(c.Z,null,n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null,"\u5c5e\u6027"),n.createElement("th",null,"\u5fc5\u586b"),n.createElement("th",null,"\u8bf4\u660e"),n.createElement("th",null,"\u7c7b\u578b"),n.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,"headerTitle"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u6587\u5b57"),n.createElement("td",null,n.createElement("code",null,"ReactNode")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"headerRight"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u53f3\u4fa7\u5185\u5bb9"),n.createElement("td",null,n.createElement("code",null,"ReactNode")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"headerLeft"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u5de6\u4fa7\u5185\u5bb9"),n.createElement("td",null,n.createElement("code",null,"ReactNode")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"headerLeftColor"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5de6\u4fa7\u8fd4\u56de\u952e\u548c\u5b57\u4f53\u989c\u8272"),n.createElement("td",null,n.createElement("code",null,"string")),n.createElement("td",null,n.createElement("code",null,"theme.colors.primaryColor"))),n.createElement("tr",null,n.createElement("td",null,"headerBackgroundColor"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u80cc\u666f\u989c\u8272"),n.createElement("td",null,n.createElement("code",null,"string")),n.createElement("td",null,n.createElement("code",null,"transparent"))),n.createElement("tr",null,n.createElement("td",null,"headerBackgroundImg"),n.createElement("td",null,n.createElement("code",null,"true")),n.createElement("td",null,"\u5934\u90e8\u80cc\u666f\u56fe\u7247"),n.createElement("td",null,n.createElement("code",null,"ImageSourcePropType")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"headerHeight"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u9ad8\u5ea6"),n.createElement("td",null,n.createElement("code",null,"number")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"onPress"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5de6\u8fb9\u56fe\u6807\u70b9\u51fb\u4e8b\u4ef6"),n.createElement("td",null,n.createElement("code",null,"() => void")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"showLeft"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u662f\u5426\u663e\u793a\u5de6\u8fb9\u56fe\u6807"),n.createElement("td",null,n.createElement("code",null,"boolean")),n.createElement("td",null,n.createElement("code",null,"true"))))),n.createElement("h2",{id:"animateheader-\u7ec4\u4ef6-api"},n.createElement(r.AnchorLink,{to:"#animateheader-\u7ec4\u4ef6-api","aria-hidden":"true",tabIndex:-1},n.createElement("span",{className:"icon icon-link"})),"AnimateHeader \u7ec4\u4ef6 API"),n.createElement(c.Z,null,n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null,"\u5c5e\u6027"),n.createElement("th",null,"\u5fc5\u586b"),n.createElement("th",null,"\u8bf4\u660e"),n.createElement("th",null,"\u7c7b\u578b"),n.createElement("th",null,"\u9ed8\u8ba4\u503c"))),n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null,"headerTitle"),n.createElement("td",null,n.createElement("code",null,"true")),n.createElement("td",null,"\u5934\u90e8\u6587\u5b57"),n.createElement("td",null,n.createElement("code",null,"string")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"headerTitleStyle"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u6587\u5b57\u6837\u5f0f"),n.createElement("td",null,n.createElement("code",null,"TextStyle")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"scrollY"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u6eda\u52a8\u8ddd\u79bb"),n.createElement("td",null,n.createElement("code",null,"Animated.SharedValue<number>")),n.createElement("td",null,n.createElement("code",null,"0"))),n.createElement("tr",null,n.createElement("td",null,"scrollHeight"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u7eb5\u5411\u6eda\u52a8\u5230\u54ea\u4e2a\u503c\u65f6\u663e\u793a ",n.createElement("code",null,"ImageHeader")),n.createElement("td",null,n.createElement("code",null,"number")),n.createElement("td",null,n.createElement("code",null,"300"))),n.createElement("tr",null,n.createElement("td",null,"headerHeight"),n.createElement("td",null,n.createElement("code",null,"true")),n.createElement("td",null,"\u5934\u90e8\u9ad8\u5ea6"),n.createElement("td",null,n.createElement("code",null,"number")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"headerRight"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u53f3\u4fa7\u5185\u5bb9"),n.createElement("td",null,n.createElement("code",null,"ReactNode")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"headerLeft"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u5de6\u4fa7\u5185\u5bb9"),n.createElement("td",null,n.createElement("code",null,"ReactNode")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"headerLeftColor"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5de6\u4fa7\u8fd4\u56de\u952e\u548c\u5b57\u4f53\u989c\u8272"),n.createElement("td",null,n.createElement("code",null,"string")),n.createElement("td",null,n.createElement("code",null,"theme.colors.primaryColor"))),n.createElement("tr",null,n.createElement("td",null,"headerBackgroundColor"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5934\u90e8\u80cc\u666f\u989c\u8272"),n.createElement("td",null,n.createElement("code",null,"string")),n.createElement("td",null,n.createElement("code",null,"transparent"))),n.createElement("tr",null,n.createElement("td",null,"onPress"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u5de6\u8fb9\u6309\u94ae\u70b9\u51fb\u4e8b\u4ef6"),n.createElement("td",null,n.createElement("code",null,"() => void")),n.createElement("td",null)),n.createElement("tr",null,n.createElement("td",null,"showLeft"),n.createElement("td",null,n.createElement("code",null,"false")),n.createElement("td",null,"\u662f\u5426\u663e\u793a\u5de6\u8fb9\u56fe\u6807"),n.createElement("td",null,n.createElement("code",null,"boolean")),n.createElement("td",null,n.createElement("code",null,"true")))))))}));t["default"]=e=>{var t=n.useContext(r.context),l=t.demos;return n.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&r.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),n.createElement(d,{demos:l})}},99987:function(e,t,l){"use strict";var n=l(59496),r=l(35975),a=l.n(r);l(25365);function c(e,t){return i(e)||u(e,t)||m(e,t)||d()}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(e,t){if(e){if("string"===typeof e)return o(e,t);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var l=0,n=new Array(t);l<t;l++)n[l]=e[l];return n}function u(e,t){var l=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var n,r,a=[],c=!0,d=!1;try{for(l=l.call(e);!(c=(n=l.next()).done);c=!0)if(a.push(n.value),t&&a.length===t)break}catch(m){d=!0,r=m}finally{try{c||null==l["return"]||l["return"]()}finally{if(d)throw r}}return a}}function i(e){if(Array.isArray(e))return e}var E=function(e){var t=e.children,l=(0,n.useRef)(),r=(0,n.useState)(!1),d=c(r,2),m=d[0],o=d[1],u=(0,n.useState)(!1),i=c(u,2),E=i[0],s=i[1];return(0,n.useEffect)((function(){var e=l.current,t=a()((function(){o(e.scrollLeft>0),s(e.scrollLeft<e.scrollWidth-e.offsetWidth)}),100);return t(),e.addEventListener("scroll",t),window.addEventListener("resize",t),function(){e.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}),[]),n.createElement("div",{className:"__dumi-default-table"},n.createElement("div",{className:"__dumi-default-table-content",ref:l,"data-left-folded":m||void 0,"data-right-folded":E||void 0},n.createElement("table",null,t)))};t["Z"]=E}}]);