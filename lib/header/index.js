let yaml = require('js-yaml'),
patt_matchHeader = exports.patt_matchHeader = /---[\s|\S]*?---/;

// get the header from markdown text
exports.get = function (text) {
    let head = text.match(patt_matchHeader);
    if (!head) {
        return {};
    }
    try {
        return yaml.safeLoad(head[0].replace(/---/g, ''));
    } catch (e) {
        console.log('ERROR loading yaml:');
        console.log(e.message);
        console.log('**********');
        console.log();
        console.log('**********');
        return {};
    }
};

// convert a header object to front mater that can be included
// in a markdown file
exports.toHeader = (obj, md) => {
    md = md || '';
    return '---\n' +
    yaml.safeDump(obj).replace(/: '/g, ': ').replace(/'\n/g, '\n') +
    '---\n' +
    md;
};

// remove a hader from makdown text
exports.remove = function (text) {
    return text.replace(patt_matchHeader, '');
};
