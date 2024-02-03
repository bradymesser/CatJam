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
import { Say } from './say';
import { Laugh } from './laugh';
import { Ask } from './ask';

const BotCommands: Command[] = [
  Bark,
  Help,
  Join,
  Laugh,
  Leave,
  Pause,
  Play,
  Restart,
  Resume,
  Say,
  Skip,
  Sound,
  Stop,
  Ask
];
export default BotCommands

// Combine all module descriptions to be used in a help command
let temp = '';
for (const command of BotCommands.sort()) {
  temp = `${temp}\n${command.description}`;
}
global.commandHelp = temp;