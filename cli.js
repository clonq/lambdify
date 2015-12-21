#!/usr/bin/env node

var pkg = require('./package.json');
var debug = require('debug')('lambdify');
var program = require('commander');
var colors = require('colors');
var util = require('./lib/util');

program
    .version(pkg.version)
    
program
    .command('push')
    .description('deploys code to aws lambda')
    .action(function(opts){
        push(opts);
    });

program.parse(process.argv);

function push(opts) {
    opts = util.getParams(opts);
    var srcDir = opts.src || '.';
    var appName = opts.app || 'noname';
    var targetZipFilename = appName+'.zip';
    util.zip(srcDir, targetZipFilename, {ignore:'^[\.]'}, function(err){
        if(err) {
            console.log(err);
        }
    });
}
