const hangoutsBot = require("hangouts-bot");
const bot = new hangoutsBot("codedamn.com@gmail.com", "<PASSWORD_HERE>");
const fetch = require('node-fetch')

bot.on('online', function() {
	console.log('online');
});

bot.on('message', async function(sender, message) {
	//console.log(sender + ">>" + message);
	const message2Send = encodeURIComponent(message);
	const data = await fetch(`https://console.dialogflow.com/api-client/demo/embedded/2aecd351-a884-4d96-97c2-ba585a1ec515/demoQuery?q=${message2Send}&sessionId=3b32c35a-64db-3e5a-29cd-23533f29060b`)
	const res = await data.json();
	try {
		bot.sendMessage(sender, res.result.fulfillment.speech);	
	} catch(e) {
		bot.sendMessage(sender, 'Unknown speech');
	}
});