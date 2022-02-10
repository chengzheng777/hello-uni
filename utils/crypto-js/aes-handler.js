/*
 * @Description: crypto-js - aes全局管理
 * @Author: LXG
 * @Date: 2022-02-09
 * @Editors: LXG
 * @LastEditTime: 2022-02-10
 */

const {
	AES,
	enc,
	mode,
	pad
} = require('crypto-js')
console.log(AES, enc, mode, pad)

/**
 * @description 解密
 * @param {Object} ciphetext 密文
 * @param {Object} key 密钥
 * @param {object} option 配置选项
 * @param {string} [option.mode='CBC'] option.mode 加密模式 -
 *     'CBC'
 *     'CFB'
 *     'CTR'
 *     'ECB'
 *     'OFB'
 * @param {string} [option.iv=key.substring(0, 16)] option.iv 密钥偏移量(字节长为16)
 * @param {string} [option.padding='ZeroPadding'] option.padding 字节填充方式 -
 *     'NoPadding': 不填充
 *     'Pkcs7': 缺几个字节就填几个缺的字节数
 *     'ZeroPadding': 全部填充0x00
 * @param {string} [option.format='Base64'] option.format 密文编码格式 -
 *     'Base64'
 *     'Hex': 十六进制
 * @returns {string} 明文
 */
function decrypt(ciphetext, key, option = {}) {
	if (!ciphetext) {
		console.warn(`encrypt: 'ciphetext' isn't defined.`)
		return;
	}

	if (!key) {
		console.warn(`encrypt: 'key' isn't defined.`)
		return;
	}

	const cipher_bytes = (enc[option.format || 'Base64'] || enc.Base64).parse(ciphetext)
	const cipher_base64 = enc.Base64.stringify(cipher_bytes)
	const key_bytes = enc.Utf8.parse(key)

	const aesConfig = {
		mode: mode[option.mode || 'CBC'] || mode.CBC,
		iv: '',
		padding: pad[option.padding || 'ZeroPadding'] || pad.ZeroPadding,
	}
	if (aesConfig.mode != mode.ECB) {
		aesConfig.iv = enc.Utf8.parse(option.iv || key.substring(0, 16))
		if (aesConfig.iv.sigBytes !== 16) {
			console.warn(`encrypt: invalid iv_bytes.`)
			return;
		}
	}

	let res = AES.decrypt(cipher_base64, key_bytes, aesConfig)
	try {
		return res.toString(enc.Utf8);
	} catch (error) {
		console.error(`decrypt: ${error}`)
		return;
	}
}

/**
 * @description 加密
 * @param {string} message 明文
 * @param {string} key 密钥(字节长为 16/24/32)
 * @param {object} option 配置选项
 * @param {string} [option.mode='CBC'] option.mode 加密模式 -
 *     'CBC'
 *     'CFB'
 *     'CTR'
 *     'ECB'
 *     'OFB'
 * @param {string} [option.iv=key.substring(0, 16)] option.iv 密钥偏移量(字节长为16)
 * @param {string} [option.padding='ZeroPadding'] option.padding 字节填充方式 -
 *     'NoPadding': 不填充
 *     'Pkcs7': 缺几个字节就填几个缺的字节数
 *     'ZeroPadding': 全部填充0x00
 * @param {string} [option.format='Base64'] option.format 密文编码格式 -
 *     'Base64'
 *     'Hex': 十六进制
 * @returns {string} 密文
 */
function encrypt(message, key, option = {}) {
	if (!message) {
		console.warn(`encrypt: 'message' isn't defined.`)
		return;
	}

	if (!key) {
		console.warn(`encrypt: 'key' isn't defined.`)
		return;
	}

	const message_bytes = enc.Utf8.parse(message)
	const key_bytes = enc.Utf8.parse(key)
	if ([16, 24, 32].every(l => l !== key_bytes.sigBytes)) {
		console.warn(`encrypt: invalid key_bytes.`)
		return;
	}

	const aesConfig = {
		mode: mode[option.mode || 'CBC'] || mode.CBC,
		iv: '',
		padding: pad[option.padding || 'ZeroPadding'] || pad.ZeroPadding,
	}
	if (aesConfig.mode != mode.ECB) {
		aesConfig.iv = enc.Utf8.parse(option.iv || key.substring(0, 16))
		if (aesConfig.iv.sigBytes !== 16) {
			console.warn(`encrypt: invalid iv_bytes.`)
			return;
		}
	}

	let cipherParams = AES.encrypt(message_bytes, key_bytes, aesConfig)
	return cipherParams.ciphertext.toString(enc[option.format || 'Base64'] || enc.Base64);
}

export {
	decrypt,
	encrypt,
}
