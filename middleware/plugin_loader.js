let fs = require('fs'),
path = require('path'),
express = require('express'),
router = express.Router();

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
let getPluginObjectList = (dir_plugins) => {
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

// set up paths for actions in the given pluginObjectList
// in the given router
let setPathsForActions = (pluginObjectList, router) => {

    pluginObjectList.forEach((pluginObject) => {

        //console.log(pluginObject);

        pluginObject.actionFiles.forEach((actionFile) => {

            router.use('/' + pluginObject.pluginName, require(actionFile));

            console.log(pluginObject.pluginName + ' loaded');

        });

    });

};

module.exports = (opt) => {

    opt = opt || {};
    opt.dir_plugins = opt.dir_plugins || './plugins';

    getPluginObjectList(opt.dir_plugins)
    .then((pluginObjectList) => {

        setPathsForActions(pluginObjectList, router);
        //console.log(pluginList);

    });

    return router;

};
