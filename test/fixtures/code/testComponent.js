var aws = require('aws-sdk');
// aws.config.update({
//     region: "us-east-1"
// });

module.exports = {
	lambdifyTestFunction: lambdifyTestFunction
}

function lambdifyTestFunction(event, context) {
	console.log('executing lambdifyTestFunction');	
    context.succeed('DONE');
}
