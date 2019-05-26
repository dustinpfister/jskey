let express = require('express'),
app = express();

app.set('port', 8000);
app.set('key', '1234');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/js', express.static('./public/js'))

app.get('/', (req, res) => {
    res.render('index', {
        key: app.get('key')
    });
});

/*
app.get('/', (req, res) => {
let html =
'<h1>Editor:</h1>'+
'<p>key: ' + app.get('key') + '<\/p>';
res.send(html);
});
 */

exports.listen = (opt) => {
    opt = opt || {};
    app.set('port', opt.port || app.get('port'));
    app.set('key', opt.key || app.get('key'));

    app.listen(app.get('port'), () => {
        console.log('editer is up on port: ' + app.get('port'));
    });

};
