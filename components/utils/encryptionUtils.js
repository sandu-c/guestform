import crypto from 'crypto';

const psk = "8charmax"; // Example PSK
// const algorithm = "aes-128-cbc";
const algorithm = "aes-256-cbc";

export const encrypt = (text, psk) => {
  // Generate IV from PSK using a hash function
  const iv = crypto.createHash("sha256").update(psk).digest('hex').slice(0, 16);  // Extract 16 bytes for IV
  // const key = crypto.createHash('sha256').update(psk).digest(); // Use PSK to derive key
  // const iv = crypto.randomBytes(16); // Generate a random IV
  
  const cipher = crypto.createCipheriv(algorithm, psk, iv); // IV should be generated randomly in production
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (encryptedText, psk) => {
  const iv = crypto.createHash("sha256").update(psk).digest('hex').slice(0, 16); // Extract 16 bytes for IV
  // const key = crypto.createHash('sha256').update(psk).digest(); // Use PSK to derive key
  // const iv = crypto.randomBytes(16); // Generate a random IV
 
  const decipher = crypto.createDecipheriv(algorithm, psk, iv); // IV should match the one used for encryption
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
