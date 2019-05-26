let fs = require('fs');

let getPluginList = (dir_plugins) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir_plugins, (e, plugins) => {
            if (e) {
                reject(e)
            } else {
                resolve(plugins);
            }
        });
    });

};

module.exports = (opt) => {

    opt = opt || {};
    opt.dir_plugins = opt.dir_plugins || './plugins';

    getPluginList(opt.dir_plugins).then((plugins) => {

        console.log(plugins);

    });

    // create a stack of actions from
    let actions = [
        (req, res) => {
            res.json({
                foo: 'bar'
            })
        }
    ];

    return actions;

};
