let crypto = require('crypto'),
path = require('path'),
stream = require('stream');

// Cipher Suites, key, and the iv
let a = 'aes-256-cbc',
password = 'spaceballs-0123456789-abcdefghi!',
random = '0123456789abcdef',
key = Buffer.concat([Buffer.from(password)], 32);
iv = Buffer.from(Array.prototype.map.call(Buffer.alloc(16), (e, i) => {
            return random.charCodeAt(i);
        }));

// make the cipher, and decipher with the current suite, key, and iv
let cipher = crypto.createCipheriv(a, key, iv),
decipher = crypto.createDecipheriv(a,key,iv);

let crypt = Buffer.concat([cipher.update('So can this be a fair amount fo data then I mean what is the liit of any?'), cipher.final()])

let deCrypt = Buffer.concat([decipher.update(crypt), decipher.final()]);


console.log( crypt.toString());
console.log( deCrypt.toString());


exports.crypt = (opt) => {




};
