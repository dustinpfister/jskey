let simpC = require('./index.js');

let opt = {
    password: 'thisisanewthing',
    random: 'project2501'
};

let c = simpC.crypt('foo', opt);

console.log(c);
console.log(c.toString('hex'));
console.log(Buffer.from(c.toString('hex'), 'hex'));

d = simpC.decrypt(Buffer.from(c.toString('hex'), 'hex'), opt);

console.log(d.toString('ascii')); // 'foo'
console.log(simpC.fromHex(c.toString('hex'), opt).toString('ascii')); // 'foo'
console.log(simpC.fromHex(simpC.toHex('foo', opt), opt).toString('ascii')); // 'foo'
