const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

//Require dotenv library in development environment.
if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Serving the client application
if(process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));

	/*
		Sending static file(s) for every url the user hits (endpoint).

		For any route that is not covered by the future routes we're going to write, it will hit to this endpoint and send the static file(s).
	*/

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}

//Routes
app.post('/payment', (req, res) => {
	const body = {
		source: req.body.token.id,
		amount: req.body.amount,
		currency: 'usd'
	};

	//Creating new Stripe charges
	stripe.charges.create(body, (stripeErr, stripeRes) => {
		if(stripeErr) {
			res.status(500).send({ error: stripeErr });
		} else {
			res.status(200).send({ success: stripeRes});
		}
	});
});


//Listening to given port or port 5000
app.listen(port, error => {
	if(error) throw error;
	console.log('App running on port ', port);
});