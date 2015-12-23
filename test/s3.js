var should = require('chai').should();
var fs = require('fs');
var s3 = require('../lib/s3');
var lambdaConfig = require('./fixtures/lambda.json');
var parentDir = require('path').normalize(__dirname+'/../');

var TEST_DATA = {
    BUCKET: lambdaConfig.s3.bucket,
    ZIP_FILENAME: parentDir+lambdaConfig.app+'.zip',
    REGION: lambdaConfig.s3.region
}

describe('s3 tests', function(){
    it('should upload a file to a bucket', function(done){
        var opts = { verbose: true, s3: { region: TEST_DATA.REGION } };
        s3.upload(TEST_DATA.BUCKET, TEST_DATA.ZIP_FILENAME, opts, function(err){
            done(err);
        })
    });
});
