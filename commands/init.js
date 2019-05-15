let path = require('path'),
yaml = require('js-yaml'),
fs = require('fs'),
simpleC = require('../lib/simple_crypt');

// make the target folder, and error will occur if the folder is there
let makeFolder = (dir_project) => {
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

// make first post
let makeFirstPost = function (dir, opt_crypt) {
    return new Promise((resolve, reject) => {
        fs.readFile('../README.md', 'utf8', (e, text) => {
            if (e) {
                text = 'first post file not found';
            }
            fs.writeFile(path.join(dir, '0.md'), simpleC.toHex(text, opt_crypt), (e) => {
                if (e) {
                    reject(e);
                } else {
                    resolve();
                }
            });
        })
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

    let dir_target = path.join(process.cwd(), argv.t),
    dir_posts_crypt = path.join(dir_target, '_posts_crypt');

    makeFolder(dir_target).then(() => {
        console.log('target folder ' + argv.t + 'created at: ');
        console.log(dir_target);
        return makeKeyFile(dir_target, argv.k);
    }).then(() => {
        return makeFolder(dir_posts_crypt);
    }).then(() => {
        return makeFirstPost(dir_posts_crypt, {
            password: argv.k
        });
    }).then(() => {

        console.log('setup compleate!');
        //console.log('key.yaml cretaed');

        //let c = simpleC.crypt('foo'),
        //d = simpleC.decrypt(c);

        //console.log(c);
        //console.log(d.toString());

    }).catch ((e) => {

        console.log(e.message);

    });

};
