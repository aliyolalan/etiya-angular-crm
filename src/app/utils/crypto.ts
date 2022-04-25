import * as crypto from 'crypto-js';
import { environment } from "src/environments/environment";

export const encrypt = ( plaintText:string ) => {
  var ciphertext = crypto.AES.encrypt( plaintText , environment.privateKey ).toString();
  return ciphertext;
}

export const decrypt = ( ciphertext:string ) => {
  var bytes  = crypto.AES.decrypt(ciphertext, environment.privateKey );
  var plaintText = bytes.toString(crypto.enc.Utf8);
  return plaintText;
}
