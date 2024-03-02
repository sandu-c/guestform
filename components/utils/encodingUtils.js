import crypto from 'crypto';

const EncodingUtils = {


  _arrayBufferToBase64: async (buffer) => {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  },

  _base64ToArrayBuffer: (base64) => {
    var binaryString = atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  },



// Function to generate a cryptographically secure secret alphanumeric code
_generateSecretCode: (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secretCode = '';
    const bytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
        const index = bytes[i] % characters.length;
        secretCode += characters.charAt(index);
    }
    return secretCode;
}


};

export default EncodingUtils;
