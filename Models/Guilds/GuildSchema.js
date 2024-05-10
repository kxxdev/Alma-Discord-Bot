import mongoose from'mongoose';
const { Schema } = mongoose;
import uniqid from 'uniqid';

const modelName = 'guilds';

const schema = new Schema({
  id: { type: String, required: true },
  channels: {
    levelUp: { id: { type: String, default: '0' } },
    spam: { id: { type: String, default: '0' } },
    news: { id: { type: String, default: '0' } },
    memes: { id: { type: String, default: '0' } },
    screenshots: { id: { type: String, default: '0' } },
    reports: { id: { type: String, default: '0' } },
    happyBirthday: { id: { type: String, default: '0' } },
    feedback: { id: { type: String, deafult: '0' } },
    logs: { id: { type: String, deafult: '0' } },
  },
  roles: {
    // Уровни.
    levels: [
      {
        level: { type: Number, required: true },
        role: { id: { type: String } },
      },
    ],
    // Расы.
    human: { id: { type: String } },
    forestelf: { id: { type: String } },
    darkelf: { id: { type: String } },
    ork: { id: { type: String } },
    undead: { id: { type: String } },
    gnome: { id: { type: String } },
    // Прочее.
    newsCreator: { id: { type: String, default: '-' } },
  },
  messages: [
    {
      userId: { type: String, required: true },
      channelId: { type: String, required: true },
      date: { type: String, required: true },
      channelSendId: { type: String, required: true },
      urlCheck: { type: Boolean, required: true },
      link: {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
      messageContent: { type: String },
      embed: {
        id: { type: String, default: uniqid() },
        title: { type: String, required: false },
        description: { type: String, required: false },
        color: { type: Number, required: false },
        imageUrl: { type: String, required: false },
      },
    },
  ],
});

export default mongoose.model(modelName, schema);
