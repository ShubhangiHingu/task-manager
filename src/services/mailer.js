const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'shubhangihingu@gmail.com',
		pass: 'Shubhangi@1998'
	}
});

let mailDetails = {
	from: 'shubhangihingu@gmail.com',
	to: 'shubhangih.mobio@gmail.com',
	subject: 'Test mail',
	text: 'Node.js mail '
};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		console.log('Error Occurs');
	} else {
		console.log('Email sent successfully');
	}
});