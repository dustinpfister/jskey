let simpC = require('./index.js');

let opt = {
    password: 'thisisanewthing',
    random: 'project2501'
};

let c = simpC.crypt('foo',opt);

console.log(c);
console.log(c.toString('hex'));
console.log(Buffer.from(c.toString('hex'),'hex'));


d = simpC.decrypt(Buffer.from(c.toString('hex'),'hex'),opt);

console.log(d.toString('ascii')); // 'foo'