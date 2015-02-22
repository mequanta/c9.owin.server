"use strict";

main.consumes = [
    "connect.static", "api"
];
main.provides = ["owin"];

module.exports = main;

function main(options, imports, register) {
    var statics = imports["connect.static"];
    statics.addStatics([{
        path: __dirname + "/static",
        mount: "/lib/owin"
    }]);

    var querystring = require("querystring");
    var api = imports.api;
    var owin = require("connect-owin");

    api.all("/signalr/*", function(req, res, next) {
        // A hack
        if (typeof req.body === 'object') {
            req.body = new Buffer(querystring.stringify(req.body));
        }
        owin(__dirname + '/bin/owin.server.dll')(req, res, next);
    });

    register(null, {
        "owin": owin
    });
}
