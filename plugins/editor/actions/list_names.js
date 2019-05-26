module.exports = (req, res, next) => {
    if (req.body.action === 'list_names') {
        res.json({
            names: 'foo'
        });
    } else {
        next();
    }
};
