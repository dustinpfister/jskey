let express = require('express'),
app = express();

app.set('port', 8000);
app.set('key', '1234');

app.get('/', (req, res) => {
    let html =
        '<h1>Editor:</h1>'+
        '<p>key: ' + app.get('key') + '<\/p>';
    res.send(html);
});

exports.listen = (opt) => {
    opt = opt || {};
    app.set('port', opt.port || app.get('port'));
    app.set('key', opt.key || app.get('key'));

    app.listen(app.get('port'), () => {
        console.log('editer is up on port: ' + app.get('port'));
    });

};
