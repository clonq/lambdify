var fs = require('fs');
var AWS = require('aws-sdk');

module.exports = {
    upload: upload
}

//@todo add jsdoc
function upload(bucket, filename, opts, cb){
    AWS.config.update({region: opts.s3.region});
    fs.readFile(filename, function (err, data) {
        if (err) cb(err);
        var s3bucket = new AWS.S3({params: {Bucket: bucket}});
        s3bucket.createBucket(function () {
            var params = {
                Key: require('path').basename(filename),
                Body: data
            };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                    cb(err);
                } else {
                    cb(null);
                }
            });
        });
    });
}
