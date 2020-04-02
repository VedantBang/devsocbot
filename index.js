const Discord = require('discord.js');
const Bot = new Discord.Client();
const methods = require('./methods.js');


Bot.on('ready',()=>{
	console.log(`Logged in as ${Bot.user.tag}.`);
	Bot.user.setActivity("https://devsoc.club", {type: "WATCHING"});
});


Bot.on('message', msg => {
	if(msg.content.startsWith(process.env.prefix) && !(msg.author.bot)){
		let parameters = msg.content.split(" ");
		let command = parameters.shift().substr(process.env.prefix.length);

		if(methods.hasOwnProperty(command)) methods[command].func(msg,parameters);
		
	}
});


Bot.on('guildCreate', guild => {
	// todo
});


Bot.login(process.env.token);