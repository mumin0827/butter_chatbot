const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

require('dotenv').config();

const env = process.env

const commands = []
    .map(command => command.toJSON());

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(env.token);

rest.put(Routes.applicationGuildCommands(env.clientId, env.guildId), { body: commands })
    .then((data) => console.log(`명령어 ${data.length} 개가 등록되었습니다.`))
    .catch(console.error);