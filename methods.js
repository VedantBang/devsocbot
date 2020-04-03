const Discord = require('discord.js');
const fetch = require('node-fetch');
const prefix = process.env.prefix;

// all methods of the bot

function info(msg,parameters){
	let embed = new Discord.MessageEmbed()
	.setColor(0x00a99d)
	.setTitle('DevSoc; Bot')
	.setURL('https://devsoc.club/')
	.setImage('https://i.ibb.co/XkMC3bR/logo.png')
	.addField('Created By', 'Developers\' Society BITS Goa');
	msg.channel.send(embed);
}


function help(msg,parameters){
	let embed = new Discord.MessageEmbed()
	.setColor(0x00a99d)
	.setTitle('Help Menu')
	.addField('Bot Prefix', prefix);
	for(let key in methods){
		embed.addField(key, methods[key].desc);
	}
	msg.channel.send(embed);
}


async function ping(msg,parametes){
	try{
		let m = await msg.channel.send("Pong!");
		let embed = new Discord.MessageEmbed()
		.setColor(0x00a99d)
		.addField("Bot Latency", `${m.createdTimestamp - msg.createdTimestamp}ms`, true)
		.addField("API Latency", `${m.client.ws.ping}ms`, true);
		msg.channel.send(embed);
	}
	catch(err){
		msg.channel.send("An error occured. Please try again.");
		console.log(err);
	}
}


async function shorten(msg,parameters){
	if(parameters[0].startsWith('http') || parameters[0].startsWith('https')){
		try{
			let body = {
				longUrl: parameters[0]
			}
			if(parameters[1]) body.customCode = parameters[1];
			let response = await fetch('https://bp-gc.in/api/url/shorten',{
				method: 'POST',
				headers: {
					'Content-Type':'application/json;charset=UTF-8'
				},
				body: JSON.stringify(body)
			});
			response = await response.json();
			let embed = new Discord.MessageEmbed()
			.setColor(0x00a99d)
			.setTitle('URL Shortener')
			.addField('Short URL', response.shortUrl);
			msg.channel.send(embed);
		}
		catch(err){
			msg.channel.send("An error occured. Please make sure that the URL starts with http or https, and is valid.");
			console.log(err);
		}
	} else {
		msg.channel.send("Please make sure that the URL starts with http or https.");
	}
}

async function auditlog(msg,parameters){
	let audit = await msg.guild.fetchAuditLogs();
	msg.channel.send("this command is under construction");
	console.log(audit.entries);
}

const methods = {
	info: {
		func: info,
		desc: 'Displays general information about the Bot'
	},
	help: {
		func: help,
		desc: 'Displays the Help Menu'
	},
	shorten: {
		func: shorten,
		desc: `Shorten any URL\nUsage: ${prefix}shorten <URL>\nCan also create custom shortened links: ${prefix}shorten <URL> <custom name>`
	},
	ping: {
		func: ping,
		desc: 'Displays the Bot Latency and Discord API Latency'
	},
	auditlog: {
		func: auditlog,
		desc: 'Display the Audit Log of the current server'
	}
}

module.exports = methods;