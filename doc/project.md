# Back end build



## [connect ETIMEDOUT at PoolConnection.Connection._handleConnectTimeout](https://www.cnblogs.com/LiQingXin/p/14392206.html)

```
运行 node .\app.js时报错，显示数据库连接超时

此时再运行一次node .\app.js即可
```

[connect ETIMEDOUT at PoolConnection.Connection._handleConnectTimeout](https://www.cnblogs.com/LiQingXin/p/14392206.html)

0.run the back end first

1.1 download the project

1.2 enable the mysql 

1.3 run the mysql script generate the data in the database

1.4 change the database name and mysql password in the backend folder

1.5 npm i run the project

1.6 post man test the api



## mysql报错:Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested

```
// 进入mysql环境
mysql -u root -p
// 执行命令
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';


```

[mysql报错:Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested](https://blog.csdn.net/weixin_34403976/article/details/110221061)

## Password verified

[node-php-password](https://www.npmjs.com/package/node-php-password)