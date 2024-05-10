import mainQuest from './mainQuest.js';

const quests = (interaction, values) => {
  try {
    switch (values[1]) {
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
