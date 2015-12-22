var should = require('chai').should();
var fs = require('fs');
var s3 = require('../lib/s3');
var lambdaConfig = require('./fixtures/lambda.json');
var parentDir = require('path').normalize(__dirname+'/../');

var TEST_DATA = {
    BUCKET: lambdaConfig.s3bucket,
    ZIP_FILENAME: parentDir+lambdaConfig.app+'.zip'
}

describe('s3 tests', function(){
    // after(function(){
    //     if(fs.existsSync(TEST_DATA.ZIP_FILENAME)) fs.unlinkSync(TEST_DATA.ZIP_FILENAME);
    // });
    it('upload a file to a bucket', function(done){
        var opts = {verbose: true};
        s3.upload(TEST_DATA.BUCKET, TEST_DATA.ZIP_FILENAME, opts, function(err){
            done(err);
        })
        // fs.existsSync(TEST_DATA.ZIP_FILENAME).should.equal(false);
        // util.zip(TEST_DATA.CODE_DIR, TEST_DATA.ZIP_FILENAME, {ignore:'^[\.]'}, function(err){
        //     fs.existsSync(TEST_DATA.ZIP_FILENAME).should.equal(true);
        //     done(err);
        // });
    });
});
