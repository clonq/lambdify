var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var async = require('async');
var AdmZip = require('adm-zip');

var DEFAULT_CONFIG_FILENAME = 'lambda.json';

module.exports = {
    zip: zipDir,
    getParams: getParams
}

function getParams(opts) {
    var ret = {};
    var configFilename = (opts.config || DEFAULT_CONFIG_FILENAME);
    if(fs.existsSync(configFilename)) {
        console.log('loading configuration from', configFilename);
        ret = require(configFilename);
    }
    return ret;
}

function zipDir(srcDir, outputFilename, opts, cb) {
    fs.readdir(srcDir, function(err, files){
        if(err) {
            cb(err);
        } else {
            var zip = new AdmZip();
            files = _.reject(files, function(filename){
                return filename.match((opts&&opts.ignore)||false);
            });
            async.reject(files, function(filename, cb){
                filename = [srcDir, filename].join(path.sep);
                fs.stat(filename, function(err, stats){
                    cb(stats.isDirectory());
                })
            }, function done(files){
                files = _.map(files, function(filename){
                    return [srcDir, filename].join(path.sep);
                });
                files.forEach(function(filename){
                    zip.addLocalFile(filename);
                });
                zip.writeZip(outputFilename);
                cb(err);
            });
        }
    });
}
