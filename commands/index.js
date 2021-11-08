module.exports = {
  Play: require('./play'),
  Skip: require('./skip'),
  Stop: require('./stop'),
  Pause: require('./pause'),
  Resume: require('./resume'),
  Help: require('./help'),
  Leave: require('./leave'),
  Join: require('./join')
};

// Combine all module descriptions to be used in a help command
const keys = Object.keys(module.exports)
let temp = '';
for (const key of keys) {
  temp = `${temp}\n${module.exports[key].description}`;
}
global.commandHelp = temp;