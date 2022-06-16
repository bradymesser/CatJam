import { Play } from './play';
import { Skip } from './skip';
import { Stop } from './stop';
import { Pause } from './pause';
import { Resume } from './resume';
import { Help } from './help';
import { Leave } from './leave';
import { Join } from './join';
import { Restart } from './restart';
import { Command } from '../interfaces/command';
import { Bark } from './bark';
import { Sound } from './sound';

const BotCommands: Command[] = [
  Bark,
  Play,
  Skip,
  Stop,
  Pause,
  Resume,
  Help,
  Leave,
  Join,
  Restart,
  Sound
];
export default BotCommands

// Combine all module descriptions to be used in a help command
let temp = '';
for (const command of BotCommands) {
  temp = `${temp}\n${command.description}`;
}
global.commandHelp = temp;