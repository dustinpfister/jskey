module.exports = (req, res, next) => {
    if (req.body.action === 'list_names') {
        res.json({
            action: 'list_names',
            names: 'foo'
        });
    } else {
        next();
    }
};
