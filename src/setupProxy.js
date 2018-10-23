const proxy = require('http-proxy-middleware');
  
module.exports = function(app) {
    app.use(proxy('/asip-api', { 
        target: 'http://try.axxonsoft.com:8000/',
        auth: 'root:root'
    }));
};