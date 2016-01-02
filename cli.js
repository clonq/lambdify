#!/usr/bin/env node

var pkg = require('./package.json');
var debug = require('debug')('lambdify');
var program = require('commander');
var colors = require('colors');
var util = require('./lib/util');
var s3 = require('./lib/s3');
var lambda = require('./lib/lambda');

program
    .version(pkg.version)
    .option('-c, --config <filename>', 'use config data from <filename>. defaults to ./lambda.json')
    
program
    .command('push')
    .description('deploys code to aws lambda')
    .action(function(){
        push({config: program.config});
    });

program.parse(process.argv);

function push(opts) {
    opts = util.getParams(opts);
    var srcDir = opts.src || '.';
    var appName = opts.app || 'noname';
    var s3Bucket = opts.s3.bucket || appName;
    var targetZipFilename = appName+'.zip';
    var moduleName = opts.lambda.moduleName;
    var functionName = opts.lambda.functionName;
    util.zip(srcDir, targetZipFilename, {ignore:'^[\.]'}, function(err){
        if(err) {
            console.log(err);
        } else {
            s3.upload(s3Bucket, targetZipFilename, opts, function(err){
                if(err) {
                    console.log(err);
                }
                lambda.create(moduleName, functionName, opts, function(err){
                    util.cleanup(targetZipFilename);
                    if(err) {
                        console.log(err);
                    }
                })
            });
        }
    });
}
