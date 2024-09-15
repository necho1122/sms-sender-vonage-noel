import { Vonage } from '@vonage/server-sdk';

const vonage = new Vonage({
	apiKey: process.env.VONAGE_API_KEY,
	apiSecret: process.env.VONAGE_API_SECRET,
});

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const phoneNumbers = req.body.phoneNumbers
			.split('\n')
			.map((line) => line.trim())
			.filter((number) => number.length > 0);

		const from = 'Vonage APIs';
		const text = 'A text message sent using the Vonage SMS API';

		for (const to of phoneNumbers) {
			try {
				const response = await vonage.sms.send({ to, from, text });
				console.log(`Mensaje enviado con éxito a ${to}`);
				console.log(response);
			} catch (err) {
				console.error(`Error al enviar el mensaje a ${to}`, err);
				return res
					.status(500)
					.json({ error: `Error al enviar el mensaje a ${to}` });
			}
		}

		res.status(200).json({ message: 'SMS enviados correctamente' });
	} else {
		res.status(405).json({ error: 'Método no permitido' });
	}
}
