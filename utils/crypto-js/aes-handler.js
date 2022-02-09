/*
 * @Description: crypto-js - aes全局管理
 * @Author: LXG
 * @Date: 2022-02-09
 * @Editors: LXG
 * @LastEditTime: 2022-02-09
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
 * @returns {string} 明文
 */
function decrypt(ciphetext, key, option = {}) { }

/**
 * @description 加密
 * @param {string} plaintext 明文
 * @param {string} key 密钥
 * @param {object} option 配置选项
 * @param {string} [option.mode='ECB'] option.mode 加密模式 -
 *     'CBC'
 *     'CFB'
 *     'CTR'
 *     'ECB'
 *     'OFB'
 * @param {string} [option.iv=''] option.iv 明文偏移量
 * @param {string} [option.padding='Pkcs7'] option.padding 字节填充方式 -
 *     'NoPadding': 不填充
 *     'Pkcs7': 缺几个字节就填几个缺的字节数
 *     'ZeroPadding': 全部填充0x00
 * @returns {string} 密文
 */
function encrypt(plaintext, key, option = {}) {
	if (!plaintext) {
		console.warn(`encrypt: 'plaintext' isn't defined.`)
		return;
	}
	if (!key) {
		console.warn(`encrypt: 'key' isn't defined.`)
		return;
	}

	const PLAINTEXT_BYTES = enc.Utf8.parse(plaintext)
	const KEY_BYTES = enc.Utf8.parse(key)
	const AES_IV = enc.Utf8.parse(option.iv || '')
	const AES_MODE = mode[option.mode || 'ECB'] || mode.ECB
	const AES_PADDING = pad[option.padding || 'Pkcs7'] || pad.Pkcs7
	let ciphe = AES.encrypt(PLAINTEXT_BYTES, KEY_BYTES, {
		iv: AES_IV,
		mode: AES_MODE,
		padding: AES_PADDING,
	})
	return ciphe.toString();
}

export {
	decrypt,
	encrypt,
}
