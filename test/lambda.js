var should = require('chai').should();
var lambda = require('../lib/lambda');
var lambdaConfig = require('./fixtures/lambda.json');
var test = require('./fixtures/testdata.json')

describe('lambda tests', function(){
	after(function(){
		//@todo remove test lambda function from aws
		//$ aws lambda delete-function --function-name test.data.functionName
	});
    it('should create a lambda function', function(done){
    	var opts = lambdaConfig;
    	opts.verbose = true;
    	opts.lambda.role = process.env.lambdify_aws_lambda_exec_role
        lambda.create(test.data.moduleName, test.data.functionName, opts, function(err){
            done(err);
        })
    });
});
