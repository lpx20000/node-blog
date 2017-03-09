/**
 * Created by home on 2016/12/31.
 */
//mongodb连接配置信息
module.exports = {
    mongoose: {
        cookieSecret: 'myBlog',
        database: 'myBlog',
        development: {
            connectionString: 'mongodb://192.168.109.132/myBlog'
        },
        production: {
            connectionString: 'mongodb://192.168.109.132/myBlog'
        }
    }
};