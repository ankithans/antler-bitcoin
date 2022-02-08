const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const db = admin.firestore();

exports.bitcoinPriceTrack = functions.pubsub
	.schedule("every 15 minutes")
	.onRun((context) => {
		var config = {
			method: "get",
			url: "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false",
			headers: {
				accept: "application/json",
			},
		};

		axios(config)
			.then(function (response) {
				db.doc(`bitcoin/${response.data.last_updated}`).create({
					inr: response.data.market_data.current_price.inr,
					usd: response.data.market_data.current_price.usd,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	});
