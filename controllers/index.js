const request = require('request-promise')
const log4js = require('../log')
const fs = require('fs');

let allApis

let getIndex = async (ctx, next) => {
    allApis = []
    addControllers(ctx)
    ctx.body = {allApis}
  }


function addMapping(mapping, ctx) {
    let control = {}
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            control.link = `GET ${path}`
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            control.link = `POST ${path}`
        } else if (url === 'example') {
            control.example = 'http://' + ctx.request.header.host + mapping.example
        }
        else {
            allApis.push(`invalid URL: ${url}`);
        }
    }
    allApis.push(control)
}

function addControllers(ctx) {
    var files = fs.readdirSync(__dirname + '/../controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/../controllers/' + f);
        addMapping(mapping, ctx);
    }
}

module.exports = {'GET /': getIndex, 'example': '/' }