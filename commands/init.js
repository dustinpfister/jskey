let path = require('path'),
yaml = require('js-yaml'),
fs = require('fs');

// make the target folder, and error will occur if the folder is there
let makeProjectFolder = (dir_project) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir_project, function (e) {
            if (e) {
                reject(e);
            } else {
                resolve();
            }
        });
    });
};

// make key.yaml
let makeKeyFile = (dir_project, key) => {

    return new Promise((resolve, reject) => {

        let data = yaml.safeDump({
                key: key
            });

        fs.writeFile(path.join(dir_project, 'key.yaml'), data, (e) => {

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
    },
    // key
    k: {
    default:
        'spaceballs'
    }
};
exports.handler = function (argv) {

    let dir_target = path.join(process.cwd(), argv.t);

    makeProjectFolder(dir_target).then(() => {

        console.log('target folder ' + argv.t + 'created at: ');
        console.log(dir_target);
        return makeKeyFile(dir_target, argv.k);

    }).then(() => {
        console.log('key.yaml cretaed');
    }).catch ((e) => {

        console.log(e.message);

    });

};
