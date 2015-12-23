var AWS = require('aws-sdk');

module.exports = {
    create: create
}

//@todo add jsdoc
function create(moduleName, functionName, opts, cb){
    AWS.config.update({region: opts.aws.region});
    var params = {
        Code: {
            S3Bucket: opts.s3.bucket,
            S3Key: opts.s3.key
        },
        //@todo add optional S3ObjectVersion key
        FunctionName: functionName,
        Handler: moduleName+'.'+functionName,
        Role: opts.lambda.role,
        Runtime: 'nodejs'
        //@todo add optional Description, MemorySize, Publish and Timeout keys
    };
    var lambda = new AWS.Lambda();
    lambda.createFunction(params, cb);
}
