import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import tokens from './Config/tokens.json' assert { type: 'json' };
import rolesConfig from './Config/roles-config.json' assert { type: 'json' };
import shopConfig from './Config/shop-config.json' assert { type: 'json' };
import channelsConfig from './Config/channels-config.json' assert { type: 'json' };
import {
  DESIGN_PRODUCTION,
  DESIGN_DEVELOPMENT,
  SetDesignConfigMode,
} from './Config/design-config.js';
import config from './Config/config.json' assert { type: 'json' };
import gunsConfig from './Config/guns-config.js';
import attributesConfig from './Config/attributes-config.js';

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
if (process.env.NODE_ENV === 'production') {
  SetDesignConfigMode('PRODUCTION');

  client.config = config.PRODUCTION;
  client.tokens = tokens.PRODUCTION;
  client.DesignConfig = DESIGN_PRODUCTION;
  client.rolesConfig = rolesConfig.PRODUCTION;
  client.shopConfig = shopConfig.PRODUCTION;
  client.channelsConfig = channelsConfig.PRODUCTION;
  client.gunsConfig = gunsConfig;
  client.attributesConfig = attributesConfig;
} else {
  SetDesignConfigMode('DEVELOPMENT');

  client.config = config.DEVELOPMENT;
  client.tokens = tokens.DEVELOPMENT;
  client.DesignConfig = DESIGN_DEVELOPMENT;
  client.rolesConfig = rolesConfig.DEVELOPMENT;
  client.shopConfig = shopConfig.DEVELOPMENT;
  client.channelsConfig = channelsConfig.DEVELOPMENT;
  client.gunsConfig = gunsConfig;
  client.attributesConfig = attributesConfig;
}

console.log(' ');
console.log(' ');
console.log('Client is connecting..');

// Запускаем ивенты
console.log(' ');
console.log('Load events..');
await loadEvents(client);
console.log(' ');

// Подключаем клиента.
await client.login(client.tokens.DISCORD_TOKEN).then(async () => {
  // Загружаем команды.
  console.log('Load commands..');
  await loadCommands(client);
  console.log(' ');
});

export { client };
