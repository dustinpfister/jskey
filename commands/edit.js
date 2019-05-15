let fs = require('fs'),
path = require('path'),
yaml = require('js-yaml');

// open key.yaml file of the given target folder
// and resolve with the key object
let openKeys = (dir_target) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(process.cwd(), dir_target, 'key.yaml'), (e, data) => {
            if (e) {
                reject(e);
            } else {
                try {
                    let key = yaml.safeLoad(data);
                    resolve(key);
                } catch (e) {
                    reject(e);
                }
            }
        });
    });
};

// define command
exports.command = 'edit';
exports.aliases = ['e'];
exports.describe = 'edit a project folder';
exports.builder = {
    // target folder
    t: {
    default:
        'blog_posts'
    },
    p: {
    default:
        8080
    }
};
exports.handler = function (argv) {

    console.log('editing project: ' + argv.t);

    // open keys
    openKeys(argv.t).then((key) => {
        console.log(key);

        require('../app_edit.js').listen({
            key: key.key,
            port: argv.p
        });

    }).catch ((e) => {
        console.log(e.message);
    });

};
