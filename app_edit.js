let express = require('express'),
path = require('path'),
app = express();

app.set('port', 8000);
app.set('key', '1234');

app.set('views', './views');
app.set('view engine', 'ejs');

// static assets
app.use('/js', express.static('./public/js'))

// load plugins
app.use('/plugin', require('./middleware/plugin_loader.js')({
        dir_plugins: path.resolve('./plugins'),
        app_main: app
    }));

// root path
app.get('/', (req, res) => {
    res.render('index', {
        key: app.get('key'),
        plugins: app.get('plugins')
    });
});

exports.listen = (opt) => {
    opt = opt || {};
    app.set('port', opt.port || app.get('port'));
    app.set('key', opt.key || app.get('key'));

    app.listen(app.get('port'), () => {
        console.log('editer is up on port: ' + app.get('port'));
    });

};
