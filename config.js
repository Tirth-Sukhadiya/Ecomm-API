let config = {};
let deployment_env = process.env.deployment_env ? process.env.deployment_env : "local";

if (deployment_env === "local") {
    config = {
        clientEndpoint: 'http://localhost:4200',
        dburl: 'mongodb+srv://sa:Test123@ecommerce.egfan.mongodb.net/ecomm',
        app: process.env.APP || 'development',
        port: process.env.PORT || '3000',
        storagePath: 'D:/Tirth/Samples/Proj/Ecomm-Web/ecomm-app/src/assets/imgs/'
    }
}
else if (deployment_env === "prod") {
    config = {
        clientEndpoint: 'http://localhost:4200',
        dburl: 'mongodb+srv://sa:Test123@ecommerce.egfan.mongodb.net/ecomm',
        app: process.env.APP || 'production',
        port: process.env.PORT || '3000',
        storagePath: 'D:/Tirth/Samples/Proj/Ecomm-Web/ecomm-app/src/assets/imgs/'
    }
}

const exportconfig = config;
module.exports = exportconfig;