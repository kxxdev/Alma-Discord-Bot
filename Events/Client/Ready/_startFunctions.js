import voiceExp from '../../EventsFunctions/Exp/voiceExp.js';

const startFunctions = async (client) => {
  try {
    voiceExp(client);
  } catch (err) {
    console.log(err);
    table.addRow('voiceExp', 'error');
  }
};

export default startFunctions;
