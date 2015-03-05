"use strict";

main.consumes = [
    "connect.static", "api"
];
main.provides = [];

module.exports = main;

function main(options, imports, register) {
    var querystring = require("querystring");
    var api = imports.api;
    var owin = require("connect-owin");

    api.all("/signalr/*", function(req, res, next) {
        // A hack
        if (typeof req.body === 'object') {
            req.body = new Buffer(querystring.stringify(req.body));
        }
        owin(options.dllPath)(req, res, next);
    });
    register(null, {});
}
