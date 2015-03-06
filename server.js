"use strict";

main.consumes = [
    "connect.static", "api"
];
main.provides = [];

module.exports = main;

function main(options, imports, register) {
    var querystring = require("querystring");
    var fs = require("fs");
    var api = imports.api;
    var owin = require("connect-owin");
    if (fs.existsSync(options.testPage)) {
        api.get("/_signalr/test.html", function(req, res, next) { 
           var data = fs.readFileSync(options.testPage);
           res.end(data);
        });
    }

    api.all("/signalr/*", function(req, res, next) {
        // A hack
        if (typeof req.body === 'object') {
            req.body = new Buffer(querystring.stringify(req.body));
        }
        owin(options.dllPath)(req, res, next);
    });
    register(null, {});
}
