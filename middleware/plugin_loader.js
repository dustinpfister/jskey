let fs = require('fs'),
path = require('path');

let getDirList = (dir) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (e, fileNames) => {
            if (e) {
                reject(e)
            } else {
                resolve(fileNames);
            }
        });
    });
};

// get list of objects for each plugin
let getPluginList = (dir_plugins) => {

    let mapPlugins = (plugins) => {

        return plugins.map((pluginName) => {

            let dir_actions = path.join(dir_plugins, pluginName, 'actions');

            return getDirList(dir_actions)
            .then((actions) => {
                return {
                    pluginName: pluginName,
                    actionFiles: actions.map((actionFile) => {
                        return path.join(dir_actions, actionFile);
                    })
                };
            });

        })
    };

    return getDirList(dir_plugins)
    .then((plugins) => {
        return Promise.all(mapPlugins(plugins));
    });
};

module.exports = (opt) => {

    opt = opt || {};
    opt.dir_plugins = opt.dir_plugins || './plugins';

    getPluginList(opt.dir_plugins)
    .then((actions) => {

        console.log(actions);

    });

    /*
    getActionsList(opt.dir_plugins)
    .then(actions) => {
    console.log(actions);
    });
     */
    /*
    getDirList(opt.dir_plugins).then((plugins) => {

    console.log(plugins);

    });
     */

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
