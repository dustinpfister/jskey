require('yargs')
.command(require('./commands/default.js'))
.command(require('./commands/init.js'))
.command(require('./commands/edit.js'))
.argv;