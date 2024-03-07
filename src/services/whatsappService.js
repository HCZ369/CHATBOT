const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");

function sendMessageWhatsapp(data) {
	const options = {
		host: "graph.facebook.com",
		path: "/v18.0/188934350980542/messages",
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Bearer EAAzhz3gp6XYBO63alqGSfICC71s31Gwioll8Vnh1VhgbUTuNiRThMwZCWPDHHRoncloCJvm6qZAOLDfIVnmFNdRunzZAe12N4KqKBHaOZCunvftvr47QGsM1iN6Y0XGl8LEpoKVkKMvoNyi6XYuaMi0oEOclvYPV7taUJESk7rkvZA4lRtfhSCJdq0bl9W7WO9yi6uJAyozYFlOP6laz4cPjtZAbkU5KkZAZBMP1f2kZD",
		},
	};
	const req = https.request(options, (res) => {
		res.on("data", (d) => {
			process.stdout.write(d);
		});
	});

	req.on("error", (error) => {
		console.error(error);
	});

	req.write(data);
	req.end();
}

module.exports = {
	sendMessageWhatsapp,
};
