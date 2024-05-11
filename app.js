import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import tokens from './Config/tokens.json' assert { type: 'json' };
import rolesConfig from './Config/roles-config.json' assert { type: 'json' };
import shopConfig from './Config/shop-config.json' assert { type: 'json' };
import channelsConfig from './Config/channels-config.json' assert { type: 'json' };
import designConfig from './Config/design-config.json' assert { type: 'json' };

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
  client.tokens = tokens.PRODUCTION;
  client.designConfig = designConfig.PRODUCTION;
  client.rolesConfig = rolesConfig.PRODUCTION;
  client.shopConfig = shopConfig.PRODUCTION;
  client.channelsConfig = channelsConfig.PRODUCTION;
} else {
  client.tokens = tokens.DEVELOPMENT;
  client.designConfig = designConfig.DEVELOPMENT;
  client.rolesConfig = rolesConfig.DEVELOPMENT;
  client.shopConfig = shopConfig.DEVELOPMENT;
  client.channelsConfig = channelsConfig.DEVELOPMENT;
}

client.login(client.tokens.DISCORD_TOKEN).then(() => {
  loadEvents(client);
  loadCommands(client);
});

export { client };
