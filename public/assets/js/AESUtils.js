//aes加密
function aesDoEncrypt(_key,str){
    var key = CryptoJS.enc.Utf8.parse(_key);
    var iv  = CryptoJS.enc.Utf8.parse('_aes_secret_iv__');
        var encrypted = CryptoJS.AES.encrypt(str,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
        encrypted = encrypted.toString();
    return encrypted;
    }
//aes解密
function aesDoDecrypt(_key,pwd){
    console.log("CryptoJS",CryptoJS)
    var key  = CryptoJS.enc.Utf8.parse(_key);
    var iv  = CryptoJS.enc.Utf8.parse('_aes_secret_iv__');
    var decrypted = CryptoJS.AES.decrypt(pwd,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return decrypted;
}
