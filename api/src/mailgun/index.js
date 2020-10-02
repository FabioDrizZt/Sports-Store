const mailgun = require("mailgun-js");
const MAILGUN_APIKEY='df807190943d6484f446895d000330df-cb3791c4-49ce3ef9'
const DOMAIN = 'sandboxbe92ef464470402f8a33075243995715.mailgun.org'

// Se deberian proteger el APIKEY e incluso el dominio en un archivo .env y luego requerirlos con la siguiente función:
// require('dotenv').config();

const mg = mailgun({apiKey: MAILGUN_APIKEY, domain: DOMAIN});

const sendEmail = async (email, name, addres) => {
	const payload = {
	  from: 'Sport Store <notificaciones@sportstore.site>',
	  to: email,
	  subject: 'Notificación de compra exitosa',
	  html: `<h1>Hola ${name} ! Tu compra ha sido exitosa.</strong></h1>
	  		<p>Hola ${name}, le informamos que su compra ha sido exitosa y sera enviada a la dirección indicada: <strong>${addres}.</p>`,
	};
	let success = true;
	try {
	  success = await mg.messages().send(payload);
	} catch (e) {
	  success = false;
	}
	console.log(success);
  };

//      Ejemplo de uso de la funcion:
//   send('tomas.didimo1407@gmail.com', 'Jose Padron', 'El Junquito 472');

const passwordReset = async (id, email) => {
    const payload = {
      from: 'Sport Store <notificaciones@sportstore.site>',
      to: email,
      subject: 'Solicitud de restauración de contraseña',
      html: `<p><strong>Estimado Usuario</strong>, hemos recibido su solicitud para restablecer la contraseña de su cuenta
                en <strong> Sport Store </strong>.</p>
            <p>Para proceder con la restauración, vaya al siguiente enlace:</p><a href="http://localhost:3000/reset?xyz=${id}">Reestablecer contraseña</a>
            <p>Si no ha realizado una solicitud para restauración de su contraseña o si tiene alguna pregunta, por favor
                contacte con nosotros directamente enviando un email a <a href="mailto:soporte@sportstore.site">soporte@sportstore.site</a>`,
    };
    let success = true;
    try {
      success = await mg.messages().send(payload);
    } catch (e) {
      success = false;
    }
    console.log(success);
  };

module.exports = {sendEmail, passwordReset};