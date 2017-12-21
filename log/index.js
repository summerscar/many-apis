const log4js = require('log4js');
//log4js
log4js.configure({
    appenders: { 
      default: { 
        type: 'file', 
        filename: __dirname+'/default.log' ,
        maxLogSize: 20480,
        backups: 3
      }, 
      console: { 
        type: 'console' 
      }  
    },
    categories: { 
      default: { appenders: ['default', 'console'], level: 'all' },
      api: { appenders: ['default', 'console'], level: 'all' } 
    }
  });
  
  module.exports = log4js