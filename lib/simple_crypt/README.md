## simple_crypt

A simple string crypto lib

```js
let simpC = require('./index.js');
 
let opt = {
    password: 'thisisanewthing',
    random: 'project2501'
};
 
let c = simpC.crypt('foo',opt)
d = simpC.decrypt(c,opt);
 
console.log(c.toString());
console.log(d.toString());
```