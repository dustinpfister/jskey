
exports.command = 'init';
exports.aliases = ['i'];
exports.describe = 'init a new project folder';
exports.builder = {
    t: {
        default:process.cwd()
    }
};
exports.handler = function (argv) {
    console.log('init:');
    console.log(argv.t);
    //console.log(typeof argv.t === 'string');
}
