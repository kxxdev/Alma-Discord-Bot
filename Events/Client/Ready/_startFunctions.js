import voiceExp from '../../eventsFunctions/exp/voiceExp.js';

const startFunctions = async (client) => {
  try {
    voiceExp(client);
    table.addRow('voiceExp', 'start');
  } catch (err) {
    console.log(err);
    table.addRow('voiceExp', 'error');
  }
};

export default startFunctions;
