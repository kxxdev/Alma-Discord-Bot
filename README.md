# Installation Instructions

To set up the bot, you need to add a `tokens.json` file to the **Config folder**. This file contains sensitive information that allows your bot to connect to **Discord and MongoDB**. The structure of this file is as follows:

```
{
  "PRODUCTION": {
    "GUILD_ID": "YOUR_GUILD_ID",
    "DISCORD_TOKEN": "YOUR_BOT_TOKEN",
    "MONGODB_TOKEN": "mongodb+srv://CLUSTER_NAME:PASSWORD@cluster0.re9fg.mongodb.net/DATABASE_NAME"
  },

  "DEVELOPMENT": {
    "GUILD_ID": "YOUR_TESTGUILD_ID",
    "DISCORD_TOKEN": "YOUR_TEST_BOT_TOKEN",
    "MONGODB_TOKEN": "mongodb+srv://CLUSTER_NAME:PASSWORD@cluster0.re9fg.mongodb.net/DATABASETEST_NAME"
  }
}
```

Replace the placeholders with the appropriate values for your environment. You will need separate files for production and development environments.

## Running the Bot

To launch the bot in production mode, use the command:

```
npm run start
```

For development mode, use the following command:

```
npm run dev
```

_Remember to update the `tokens.json` file accordingly before running the bot in each environment._

_Attention! The bot operates only for the guild specified in `GUILD_ID` in the `tokens.json` file! It will not work in other guilds!_
