import Env from '@/config/envConfig';
import CryptoJS from 'crypto-js';

//Encrypt given string

const MakeChips = (potato) => {
	return CryptoJS.AES.encrypt(potato, Env.Encode.Salt).toString();
};

//Decrypt given hash

const EatChips = (chips) => {
	let pepper = CryptoJS.AES.decrypt(chips, Env.Encode.Salt);
	return pepper.toString(CryptoJS.enc.Utf8);
};

export { EatChips, MakeChips };
