const request = require('request-promise')
const log4js = require('../log')
const fs = require('fs');

const logger = log4js.getLogger('api');
logger.level = 'all';
let allApis 

let getIndex = async (ctx, next) => {
    allApis = []
    addControllers()
    logger.info(`GET /getIndex 被调用 origin: ${ctx.request.header.origin || '直接访问'}`)
    ctx.body = {allApis}
  }


function addMapping(mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            allApis.push(`register URL mapping: GET ${path}`)
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
           allApis.push(`register URL mapping: POST ${path}`);
        } else {
            allApis.push(`invalid URL: ${url}`);
        }
    }
}

function addControllers() {
    var files = fs.readdirSync(__dirname + '/../controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/../controllers/' + f);
        addMapping(mapping);
    }
}

module.exports = {'GET /': getIndex }