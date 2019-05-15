let fs = require('fs'),
path = require('path'),
yaml = require('js-yaml');

// open key.yaml file of the given target folder
let openKeys = (dir_target) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(process.cwd(), dir_target, 'key.yaml'), (e, data) => {
            if (e) {
                reject(e);
            } else {
                try {
                    let keys = yaml.safeLoad(data);
                    resolve(keys);
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
    }
};
exports.handler = function (argv) {
    console.log('editing project: ' + argv.t);

	openKeys(argv.t).then((keys)=>{
		
		console.log(keys);
		
	}).catch((e)=>{
		
		console.log(e.message);
		
	})
	
};
