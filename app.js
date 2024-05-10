import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import tokens from './Config/tokens.json' assert { type: 'json' };
import config from './Config/config.json' assert { type: 'json' };

const {
  Guilds,
  GuildMembers,
  GuildMessages,
  DirectMessages,
  GuildMessageReactions,
  GuildIntegrations,
  GuildPresences,
  MessageContent,
  GuildVoiceStates,
} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

import { loadEvents } from './Handlers/eventHandler.js';
//
import { loadCommands } from './Handlers/commandsHanlder.js';

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    DirectMessages,
    GuildMessageReactions,
    GuildIntegrations,
    GuildPresences,
    MessageContent,
    GuildVoiceStates,
  ],
  partials: [User, Message, GuildMember, ThreadMember, Channel],
});

client.commands = new Collection();
client.config = config;
if (process.env.NODE_ENV === 'production') {
  client.tokens = tokens.PRODUCTION;
} else {
  client.tokens = tokens.DEVELOPMENT;
}

client.login(client.tokens.DISCORD_TOKEN).then(() => {
  loadEvents(client);
  loadCommands(client);
});

export { client };
