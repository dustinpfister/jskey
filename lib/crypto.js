let crypto = require('crypto'),
path = require('path'),
stream = require('stream');

let hard = {
    a: 'aes-256-cbc',
    password: 'spaceballs-0123456789-abcdefghi!',
    random: '0123456789abcdef'
};

// Cipher Suites, key, and the iv
let a = 'aes-256-cbc',
//password = 'spaceballs-0123456789-abcdefghi!',
//random = '0123456789abcdef',
password = 'IlikeYuio',
random = '000',
key = Buffer.concat([Buffer.from(password)], 32);
iv = Buffer.from(Array.prototype.map.call(Buffer.alloc(16), (e, i) => {
            return random.charCodeAt(i);
        }));

// make the cipher, and decipher with the current suite, key, and iv
let cipher = crypto.createCipheriv(a, key, iv),
decipher = crypto.createDecipheriv(a, key, iv);

// encrypt the given text
let crypt = exports.crypt = (text, opt) => {
    opt = opt || {};
    let a = opt.a || hard.a,
    key = Buffer.concat([Buffer.from(opt.password || hard.password)], 32),
    iv = Buffer.from(Array.prototype.map.call(Buffer.alloc(16), (e, i) => {
                return (opt.random || hard.random).charCodeAt(i);
            })),
    cipher = crypto.createCipheriv(a, key, iv);
    return Buffer.concat([cipher.update(text), cipher.final()]);
};

let decrypt = exports.crypt = (text, opt) => {
    return Buffer.concat([decipher.update(text), decipher.final()]);
};

let c = crypt('foo',{password:'IlikeYuio',random:'000'}),
d = decrypt(c);

console.log(c.toString(), d.toString());
