const mailgun = require("mailgun-js");
var MAILGUN_APIKEY='df807190943d6484f446895d000330df-cb3791c4-49ce3ef9';
var DOMAIN = 'sandboxbe92ef464470402f8a33075243995715.mailgun.org';
const mg = mailgun({apiKey: MAILGUN_APIKEY, domain: DOMAIN});
const data = {
	from: 'Excited User <tomas.didimo1407@gmail.com>',
	to: 'tomas.didimo1407@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});

module.exports = mg;