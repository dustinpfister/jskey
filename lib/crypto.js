let crypto = require('crypto'),
path = require('path');

// Cipher Suites, key, and the iv
let a = 'aes-256-cbc',
password = 'spaceballs-0123456789-abcdefghi!',
random = '0123456789abcdef',
key = Buffer.concat([Buffer.from(password)], 32);
iv = Buffer.from(Array.prototype.map.call(Buffer.alloc(16), (e, i) => {
    return random.charCodeAt(i);
}));

// make the cipher with the current suite, key, and iv
let cipher = crypto.createCipheriv(a, key, iv);

console.log(key + '\n', iv);
