var aesDecrypt = (text, password, bit, mode) => {
    try {
        var crypto = require('crypto');
        var decipher = crypto.createDecipheriv('aes-' + bit + '-' + mode, password, new Buffer(0));
        decipher.setAutoPadding(false);
        return Buffer.concat([
            decipher.update(text, 'base64'),
            decipher.final()
        ]).toString();
    } catch (e) {
        return "";
    }
}

Meteor.methods({
    'decryptToken': (encryptedToken, password) => {
        try {
            var token = aesDecrypt(encryptedToken, password, 128, 'ecb');
            return token;
        } catch (e) {
            console.log(e);
            return "";
        }
    }
});