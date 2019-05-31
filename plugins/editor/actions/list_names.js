module.exports = (req, res, next) => {
    if (req.body.action === 'foo') {
        res.json({
            action: 'list_names',
            names: 'foo'
        });
    } else {
        next();
    }
};
