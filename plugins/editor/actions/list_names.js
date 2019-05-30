module.exports = (req, res, next) => {
    res.json({
        action: 'list_names',
        names: 'foo'
    });
};
