require('dotenv').config();


module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mysql: {
        host: process.env.HOST_DB || '',
        user: process.env.USER_DB || '',
        password: process.env.PASSWORD_DB || '',
        database: process.env.DATABASE || '',
    },
    mysqlService : {
        port: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_SRV_HOST || 'localhost'
    }
}