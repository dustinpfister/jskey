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
        // actions path
        let actions = [(req, res, next) => {
                req.body = req.body || {
                    action: 'bar'
                };
                next();
            }
        ];
        pluginObject.actionFiles.forEach((actionFile) => {
            //router.use('/' + pluginObject.pluginName + '/action', require(actionFile));
            actions.push(require(actionFile));
        });
        actions.push((req, res) => {
            res.json({
                mess: 'unkown action'
            });
        });
        router.use('/' + pluginObject.pluginName + '/action', actions);
        console.log(pluginObject.pluginName + ' actions loaded');
    });

};

module.exports = (opt) => {

    opt = opt || {};
    opt.dir_plugins = opt.dir_plugins || './plugins';
    opt.app_main = opt.app_main || express();

    getPluginObjectList(opt.dir_plugins)
    .then((pluginObjectList) => {

        // action paths for each plugin
        setPathsForActions(pluginObjectList, router);

        // root path
        router.use('/', (req, res) => {
            res.json({
                mess: 'plugin root path',
                pluginNames: pluginObjectList.map((plugin) => {
                    return plugin.pluginName;
                })
            });
        });

        opt.app_main.set('plugins', pluginObjectList);
        opt.app_main.set('plugins_current', pluginObjectList[0].pluginName);

        //console.log(pluginList);

    });

    return router;

};
