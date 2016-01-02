var should = require('chai').should();
var exec = require('child_process').exec;
var lambda = require('../lib/lambda');
var lambdaConfig = require('./fixtures/lambda.json');
var test = require('./fixtures/testdata.json')
var util = require('../lib/util');
var parentDir = require('path').normalize(__dirname+'/../');

var TEST_DATA = {
    BUCKET: lambdaConfig.s3.bucket,
    ZIP_FILENAME: parentDir+lambdaConfig.app+'.zip',
    REGION: lambdaConfig.s3.region
}

var testFunctionName = test.data.functionName+Date.now();

describe('lambda tests', function(){
    before(function(done){
        exec('zip -r '+TEST_DATA.ZIP_FILENAME+' test/fixtures/code', function (err, stdout, stderr) {
            if(stdout) console.log('stdout:', stdout);
            if(stderr) done(stderr);
            //@todo use s3 cmd line
            var opts = { verbose: true, s3: { region: TEST_DATA.REGION } };
            require('../lib/s3').upload(TEST_DATA.BUCKET, TEST_DATA.ZIP_FILENAME, opts, function(err){
                done(err);
            })
        });
    });
    after(function(){
        exec('aws lambda delete-function --function-name '+testFunctionName, function (err, stdout, stderr) {
            if(stdout) console.log('stdout:', stdout);
            if(stderr) done(stderr);
            //@todo s3 cleanup
            done(err);
        });
    });
    it('should create a lambda function', function(done){
        var opts = lambdaConfig;
        opts.verbose = true;
        opts.lambda.role = process.env.lambdify_aws_lambda_exec_role
        lambda.create(test.data.moduleName, testFunctionName, opts, function(err){
            done(err);
        })
    });
    it('should delete a lambda function', function(done){
        var opts = lambdaConfig;
        opts.verbose = true;
        opts.lambda.role = process.env.lambdify_aws_lambda_exec_role
        lambda.create(test.data.moduleName, test.data.functionName, opts, function(err){
            if(err) done(err);
            lambda.remove(test.data.functionName, function(err){
                done(err);
            });
        })
    });
});
