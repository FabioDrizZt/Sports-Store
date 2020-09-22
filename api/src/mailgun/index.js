const mailgun = require("mailgun-js");
const MAILGUN_APIKEY='df807190943d6484f446895d000330df-cb3791c4-49ce3ef9',
const DOMAIN = 'sandboxbe92ef464470402f8a33075243995715.mailgun.org'

// Se deberian proteger el APIKEY e incluso el dominio en un archivo .env y luego requerirlos con la siguiente función:
// require('dotenv').config();

const mg = mailgun({apiKey: MAILGUN_APIKEY, domain: DOMAIN});

const send = async (email, name, direccion) => {
	const payload = {
	  from: 'Sport Store <notificaciones@sportstore.site>',
	  to: email,
	  subject: 'Notificación de compra exitosa',
	  text: `Hola ${name}, le informamos que su compra ha sido exitosa y sera enviada a la dirección indicada: ${direccion}. 
	  Apuntate a las notificaciones de el dev sin site.`,
	  html: `<p>Hola ${name}, le informamos que su compra ha sido exitosa y sera enviada a la dirección indicada: <strong>${direccion}.</strong></p>`,
	};
  
	let success = true;
	try {
	  success = await mg.messages().send(payload);
	} catch (e) {
	  success = false;
	}
  
	console.log(success);
  };

//  	Ejemplo de uso de la funcion:
//   send('emaildedestinoaqui@gmail.com', 'Fernando Palacios', 'Santa Fe 3610');

module.exports = send;