const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const  path = require('path');
const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
	] 
});

client.commands = new Collection();

commandHandler(client);
eventHandler(client);


client.login(token);