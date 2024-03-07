function sampleText(textResponse, number) {
	const data = JSON.stringify({
		messaging_product: "whatsapp",
		recipient_type: "individual",
		to: number,
		text: {
			body: textResponse,
		},
		type: "text",
	});
	return data;
}

function sampleImage(number) {
	const data = JSON.stringify({
		messaging_product: "whatsapp",
		to: number,
		type: "image",
		image: {
			link: "https://celebrateurbanbirds.org/wp-content/uploads/2016/08/american-crow-768x768.png",
		},
	});
	return data;
}

function sampleLocation(number) {
	const data = JSON.stringify({
		messaging_product: "whatsapp",
		to: number,
		type: "location",
		location: {
			latitude: "-25.271481875621536",
			longitude: "-57.48356568861915",
			name: "Nonnita Mía",
			address: "Blas Garay, Luque 110929",
		},
	});
	return data;
}

module.exports = {
	sampleText,
	sampleImage,
	sampleLocation,
};
