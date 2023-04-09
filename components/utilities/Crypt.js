import CryptoJS from 'crypto-js';

//Encrypt given string

const MakeChips = (potato) => {
	return CryptoJS.AES.encrypt(potato, process.env.SALT_FOR_CHIPS).toString();
};

//Decrypt given hash

const EatChips = (chips) => {
	let pepper = CryptoJS.AES.decrypt(chips, process.env.SALT_FOR_CHIPS);
	return pepper.toString(CryptoJS.enc.Utf8);
};

export { EatChips, MakeChips };
