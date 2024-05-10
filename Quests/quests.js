import mainQuest from './mainQuest.js';

const quests = (interaction, info) => {
  try {
    switch (info.id) {
      case 'Main':
        mainQuest(interaction, values);
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

export default quests;
