var should = require('chai').should();
var fs = require('fs');
var cli = require('../cli');
var exec = require('child_process').exec;
var lambdaConfig = require('./fixtures/lambda.json');
var parentDir = require('path').normalize(__dirname+'/../');

var TEST_DATA = {
    CONFIG_FILENAME: __dirname+'/fixtures/lambda.json',
    RUNTIME_LAMBDA_FILENAME: './test-lambda.json',
    APP_NAME: 'test'
}

describe('cli tests', function(){
    it('should push a component using lambda.json data', function(done){
        exec('node cli push -c '+TEST_DATA.CONFIG_FILENAME, function (err, stdout, stderr) {
            if(stdout) console.log('stdout:', stdout);
            fs.existsSync(parentDir+lambdaConfig.app+'.zip').should.equal(true);
            done(err||stderr);
        });
    });
});
