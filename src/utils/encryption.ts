import CryptoJS from 'crypto-js';

const SECRET = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'fallback-secret-key';

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET).toString();
}

export function decrypt(cipher: string): string {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}
