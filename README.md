# Installation Instructions

To set up the bot, you need to add a `tokens.json` file to the Config folder. This file contains sensitive information that allows your bot to connect to **Discord and MongoDB**. The structure of this file is as follows:
```
{
  "PRODUCTION": {
    "GUILD_ID": "YOUR_GUILD_ID",
    "DISCORD_TOKEN": "YOUR_BOT_TOKEN",
    "MONGODB_TOKEN": "YOUR_MONGODB_TOKEN"
  },

  "DEVELOPMENT": {
    "GUILD_ID": "YOUR_TESTGUILD_ID",
    "DISCORD_TOKEN": "YOUR_TEST_BOT_ID",
    "MONGODB_TOKEN": "YOUR_TESTMONGODB_TOKEN"
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

*Remember to update the `tokens.json` file accordingly before running the bot in each environment.*
