const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const whatsappService = require("../services/whatsappService");
const samples = require("../shared/sampleModels");

const verifyToken = (req, res) => {
	try {
		var accesToken = "KJASNAKSJFNF65A4S54WA6D48DA65S";
		var token = req.query["hub.verify_token"];
		var challenge = req.query["hub.challenge"];

		if (challenge != null && token != null && token == accesToken) {
			res.send(challenge);
		} else {
			res.status(400).send();
		}
	} catch (error) {
		res.status(400).send();
	}
};

const receivedMessage = (req, res) => {
	try {
		var entry = req.body["entry"][0];
		var changes = entry["changes"][0];
		var value = changes["value"];
		var messageObject = value["messages"];

		if (typeof messageObject != "undefinded") {
			var messages = messageObject[0];
			var number = messages["from"];
			var text = getTextUser(messages);

			if (text == "text") {
				var data = samples.sampleText("hola usuario", number);
				whatsappService.sendMessageWhatsapp(data);
			} else if (text == "location") {
				var data = samples.sampleLocation(number);
				whatsappService.sendMessageWhatsapp(data);
			} else if (text == "image") {
				var data = samples.sampleImage(number);
				whatsappService.sendMessageWhatsapp(data);
			} else {
				var data = samples.sampleText("No entiendo NADA", number);
				whatsappService.sendMessageWhatsapp(data);
			}
		}

		res.send("EVENT_RECEIVED");
	} catch (error) {
		myConsole.log(error);
		res.send("EVENT_RECEIVED");
	}
};

function getTextUser(messages) {
	var text = "";
	var typeMessage = messages["type"];

	if (typeMessage == "text") {
		text = messages["text"]["body"];
	} else if (typeMessage == "interactive") {
		var interactiveObject = messages["interactive"];
		var typeInteractive = interactiveObject["type"];
		myConsole.log(interactiveObject);

		if (typeInteractive == "button_reply") {
			text = interactiveObject["button_reply"]["title"];
		} else if (typeInteractive == "list_reply") {
			text = interactiveObject["list_reply"]["title"];
		} else {
			myConsole.log("sin mensaje");
		}
	} else {
		myConsole.log("sin mensaje");
	}
	return text;
}

module.exports = {
	verifyToken,
	receivedMessage,
};
