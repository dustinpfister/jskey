
exports.command = '*';
exports.describe = 'default command';
exports.handler = function (argv) {
  console.log('> JSKEY: usage:');
  console.log('> ');
  console.log('> $ jskey init -t fooblog');
  console.log('> creates a new project folder called fooblog in the current working dir');
  console.log('> ');
  console.log('> $ jskey edit -t fooblog -p 8080');
  console.log('> starts editor for fooblog on port 8080');
}