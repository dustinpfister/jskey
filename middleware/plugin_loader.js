module.exports = (opt) => {

    opt = opt || {};
    opt.dir_plugins = opt.dir_plugins || './plugins';

	console.log(opt.dir_plugins);
	
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
