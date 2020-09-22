const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: process.env.DOMAIN});
const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});

module.exports = mg;