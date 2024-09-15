import { useState } from 'react';

export default function Home() {
	const [phoneNumbers, setPhoneNumbers] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch('/api/send-sms', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ phoneNumbers }),
			});

			const data = await res.json();
			setMessage(data.message || data.error);
		} catch (err) {
			setMessage('Ocurrió un error al enviar SMS.');
		}

		setLoading(false);
	};

	return (
		<div className='container'>
			<h1>Enviar SMS por Lotes</h1>
			<form onSubmit={handleSubmit}>
				<textarea
					value={phoneNumbers}
					onChange={(e) => setPhoneNumbers(e.target.value)}
					placeholder='Ingresa un número por línea'
				></textarea>
				<br />
				<button
					type='submit'
					disabled={loading}
				>
					{loading ? 'Enviando...' : 'Enviar SMS'}
				</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
