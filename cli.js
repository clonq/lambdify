#!/usr/bin/env node

var pkg = require('./package.json');
var debug = require('debug')('lambdify');
var program = require('commander');
var colors = require('colors');

program
    .version(pkg.version)

program
    .command('push')
    .description('deploys code to aws lambda')
    .action(function(env, options){
        var targetDir = opts.destination || dir;
        var targetZipFilename = [targetDir, opts.appName].join('/') + '.zip';
        util.zip(srcDir, targetZipFilename);
    });

program.parse(process.argv);
