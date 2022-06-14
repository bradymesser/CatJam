import Play from './play.js';
import Skip from './skip.js';
import Stop from './stop.js';
import Pause from './pause.js';
import Resume from './resume.js';
import Help from './help.js';
import Leave from './leave.js';
import Join from './join.js';
import Restart from './restart.js';

const commands = {
  Play,
  Skip,
  Stop,
  Pause,
  Resume,
  Help,
  Leave,
  Join,
  Restart
};
export default commands

// Combine all module descriptions to be used in a help command
const keys = Object.keys(commands)
let temp = '';
for (const key of keys) {
  temp = `${temp}\n${commands[key].description}`;
}
global.commandHelp = temp;