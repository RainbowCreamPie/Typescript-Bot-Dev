import 'dotenv/config';
import { IntentOptions } from './indentOptions';
import { CommandKit } from 'commandkit';
import path from 'path';
import { Client } from 'discord.js';

const client = new Client({
    intents: IntentOptions,
});

new CommandKit({
    client,
    eventsPath: path.join(__dirname, 'events'),
    commandsPath: path.join(__dirname, 'commands')
});

client.login(process.env.TOKEN);