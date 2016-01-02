var should = require('chai').should();
var fs = require('fs');
var cli = require('../cli');
var exec = require('child_process').exec;
var lambdaConfig = require('./fixtures/lambda.json');
var parentDir = require('path').normalize(__dirname+'/../');
var test = require('./fixtures/testdata.json')

var TEST_DATA = {
    CONFIG_FILENAME: __dirname+'/fixtures/lambda.json',
    RUNTIME_LAMBDA_FILENAME: './test-lambda.json',
    APP_NAME: 'test'
}

var zipFilename = parentDir+lambdaConfig.app+'.zip';
var testFunctionName = test.data.functionName;

//@todo pass lambdify_aws_lambda_exec_role via an env var
describe.skip('cli tests', function(){
    it('should push a component using lambda.json data', function(done){
        exec('node cli push -c '+TEST_DATA.CONFIG_FILENAME, function (err, stdout, stderr) {
            if(stdout) console.log('stdout:', stdout);
            if(err||stderr) done(err||stderr);
            fs.existsSync(zipFilename).should.equal(false);
            done(err);
        });
    });
});
