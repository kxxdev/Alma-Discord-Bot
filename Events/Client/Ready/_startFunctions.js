import voiceExp from '../../EventsFunctions/Exp/voiceExp.js';
import regeneration from '../../EventsFunctions/Regeneration/regeneration.js';

const startFunctions = async (client) => {
  try {
    voiceExp(client);
    regeneration(client);
  } catch (err) {
    console.log(err);
    table.addRow('voiceExp', 'error');
  }
};

export default startFunctions;
