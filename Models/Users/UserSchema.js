import { subDays } from 'date-fns';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const modelName = 'users';

const schema = new Schema({
  id: { type: String, required: true },
  notice: {
    twink: {
      status: { type: Boolean, default: false },
      notice: { type: String, default: 'Не указано' },
    },
  },
  levels: {
    level: { type: Number, default: 1, min: 1, max: 100 },
    exp: { type: Number, default: 0, min: 0 },
    dates: {
      text: { type: Date, default: new Date() },
      voice: { type: Date, default: new Date() },
    },
  },
  money: {
    eris: {
      value: { type: Number, default: 0 },
      dates: {
        text: { type: Date, default: new Date() },
        voice: { type: Date, default: new Date() },
      },
    },
  },
  signature: { type: String, default: 'Нет подписи' },
  birthday: {
    day: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    sendDate: { type: Date, default: subDays(new Date(), 1) },
  },
  work: {
    currently: { type: String, default: 'Безработный' },
    joinDate: { type: Date, default: new Date() },
    farmer: {
      levels: {
        level: { type: Number, default: 1 },
        exp: { type: Number, default: 0 },
      },
      products: {
        wheat: {
          status: { type: Boolean, default: false },
          date: { type: Date, default: new Date() },
        },

        hops: {
          status: { type: Boolean, default: false },
          date: { type: Date, default: new Date() },
        },

        grapes: {
          status: { type: Boolean, default: false },
          date: { type: Date, default: new Date() },
        },
      },
    },
    brewer: {
      levels: {
        level: { type: Number, default: 1 },
        exp: { type: Number, default: 0 },
      },
      products: {
        lemonade: {
          status: { type: Boolean, default: false },
          date: { type: Date, default: new Date() },
        },

        whiteBeer: {
          status: { type: Boolean, default: false },
          date: { type: Date, default: new Date() },
        },

        darkBeer: {
          status: { type: Boolean, default: false },
          date: { type: Date, default: new Date() },
        },
      },
    },
  },
  inventory: {
    shop: {
      profileCards: {
        active: { type: String, default: 'ProfileCard-Standart' },
        cards: [
          {
            name: { type: String, required: true },
          },
        ],
      },
      profileFrames: {
        active: { type: String, default: 'ProfileCard-Standart' },
        frames: [
          {
            name: { type: String, required: true },
          },
        ],
      },
      profileShadows: {
        active: { type: String, default: 'ProfileCard-Standart' },
        shadows: [
          {
            name: { type: String, required: true },
          },
        ],
      },
    },
  },
  quests: [
    {
      id: { type: String, required: true },
      stage: { type: String, default: 'start' },
      notice: [
        {
          id: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
  ],
  voiceStates: {
    minutesInVoice: { type: Number, default: 0 },
    tempStates: { type: Number, default: 0 },
  },
  textStates: {
    messages: { type: Number, default: 0 },
  },
});

const Model = mongoose.model(modelName, schema);

export default Model;
