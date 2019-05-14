// just using crypto
let crypto = require('crypto');

// hard coded values
let hard = {
    a: 'aes-256-cbc',
    password: 'spaceballs-0123456789-abcdefghi!',
    random: '0123456789abcdef'
};

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

let decrypt = exports.decrypt = (text, opt) => {

    opt = opt || {};
    let a = opt.a || hard.a,
    key = Buffer.concat([Buffer.from(opt.password || hard.password)], 32),
    iv = Buffer.from(Array.prototype.map.call(Buffer.alloc(16), (e, i) => {
                return (opt.random || hard.random).charCodeAt(i);
            })),
    decipher = crypto.createDecipheriv(a, key, iv);
    return Buffer.concat([decipher.update(text), decipher.final()]);

};
