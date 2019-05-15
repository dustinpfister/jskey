let header = require('./index');

let md = '---\n' +
    'title: foo title\n' +
    '---\n\n' +
    'So this is not really a blog post';

// get the header as an object
let h = header.get(md);
console.log(h.title); // 'foo title'

// removes header from markdown
console.log(header.remove(md));

console.log(header.toYAML({
        title: 'that is great',
        date: '2019-15-14 12:00:00',
        id: '0'
    }));

console.log('**********');
console.log(md);
console.log('**********');
console.log(header.toYAML( header.get(md), header.remove(md)))
console.log('**********');