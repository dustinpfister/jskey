let path = require('path'),
fs = require('fs');

// make the target folder, and error will occur if the folder is there
let makeTargetFolder = (dir_target) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir_target, function (e) {
            if (e) {
                reject(e);
            } else {
                resolve();
            }
        });
    });
};

// define command
exports.command = 'init';
exports.aliases = ['i'];
exports.describe = 'init a new project folder';
exports.builder = {
    // target folder
    t: {
    default:
        'blog_posts'
    }
};
exports.handler = function (argv) {

    let dir_target = path.join(process.cwd(), argv.t);

    makeTargetFolder(dir_target).then(() => {

        console.log('target folder ' + argv.t + 'created at: ');
        console.log(dir_target);

    }).catch ((e) => {

        console.log(e.message);

    });

};
