### pont配置
1. 在pont-config.json文件中配置origins，一个swagger地址对应一个name和originUrl，name的命名没有约束，但是会在接口调用的时候用到，例如authorization（权限中心），originUrl就是api-docs的地址，例如'http://xxxx/v2/api-docs'，可以支持配置多个swagger地址，但是注意：除了origins之外的配置项不要改动
2. server.config.js文件是用于从pont-config.json文件中读取后端接口地址的，不需要进行改动（如果随意的更改可能会引起调用接口的时候nameSpace对应不上）
3. pontTemplate.ts文件是定义生成代码的模板文件，不需要进行改动
4. 在项目的入口文件，即src目录下的global.ts文件中加入一句'import '@/services';'，把API引入进来

### pont使用
1. 在 vscode 中安装 vscode 插件 pont，使用方法参考'https://github.com/nefe/vscode-pont'
2. 当vscode-pont检测到项目中含有合法的pont-config.json之后，插件会马上启动生成services文件夹
3. 如果后端接口发生了更新，那么需要手动的点击VS code左下方的sync按钮，这样才会去比较线上和线下的差异实现和服务端同步变更，但是这个变更是存在于内存中的，all/mod/bo都是把对应内容更新到api.lock中，generate是根据lock生成最后的代码
4. 当重新打开项目时，会自动调用一次sync，获取和服务端的差异
5. 目前API已经配置为全局变量，当需要调用接口时，我们不需要再进行import操作，只需要API.[nameSpace].[mod].[方法的文件名].fetch()，nameSpace即在pont-config.json文件中配置的origins的name，mod即是module，例如：API.authorization.role.resourceSave.fetch()
6. 更多细节：'https://github.com/alibaba/pont'