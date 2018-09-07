
# uron fullstack template

### 修改配置文件
#### 如果需要使用数据库，则需要配置数据库 host 、用户名、密码等，步骤如下
修改项目根目录下的 `.env `文件中的 `db_host `为数据库地址，`db_database` 为要操作的数据库表，`db_user` 和 `db_password` 为数据库的用户名和密码

#### 如果需要使用 graph，用 `src/server/schema/fruit_back.sql` 初始化好数据库之后，通过`http://localhost:8000/graphiql`就可以查看 graphql 的例子。


#### 别名
本项目可以设置别名，默认的别名在 `package.json` 中 `_moduleAliases` 字段下。如需增加或修改别名，可在该文件中进行修改。但务必将 jsconfig.json 中对应别名的地址也进行修改，该文件是 vscode 的配置文件。根据该配置，vscode 可以对别名引用的模块进行智能提示。

### 运行项目
- 在根目录下运行`npm run dev`就可以将项目跑起来，默认端口为8002。也可以在 `uron.config.js` 中进行修改。
- 本项目配置了 vscode 的调试，在 vscode 的调试界面选择 `dev` ,按`开始调试`按钮就可以以对项目进行调试
