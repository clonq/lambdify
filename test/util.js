var should = require('chai').should();
var fs = require('fs');
var util = require('../lib/util');

var TEST_DATA = {
    CODE_DIR: 'test/fixtures/code',
    ZIP_FILENAME: 'test/test.zip',
    CONFIG_FILENAME: __dirname+'/fixtures/lambda.json'
}

describe('util tests', function(){
    after(function(){
        if(fs.existsSync(TEST_DATA.ZIP_FILENAME)) fs.unlinkSync(TEST_DATA.ZIP_FILENAME);
    });
    it('should zip a directory', function(done){
        fs.existsSync(TEST_DATA.ZIP_FILENAME).should.equal(false);
        util.zip(TEST_DATA.CODE_DIR, TEST_DATA.ZIP_FILENAME, {ignore:'^[\.]'}, function(err){
            fs.existsSync(TEST_DATA.ZIP_FILENAME).should.equal(true);
            done(err);
        });
    });
    it('should load config data from lambda.json', function(done){
        var config = util.getParams({config: TEST_DATA.CONFIG_FILENAME});
        should.exist(config);
        config.should.have.property('s3bucket');
        done();
    });
});
