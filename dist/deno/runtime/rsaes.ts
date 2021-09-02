import type { RsaEsDecryptFunction, RsaEsEncryptFunction } from './interfaces.d.ts'
import subtleAlgorithm from './subtle_rsaes.ts'
import bogusWebCrypto from './bogus.ts'
import crypto, { isCryptoKey } from './webcrypto.ts'
import checkKeyLength from './check_key_length.ts'
import invalidKeyInput from './invalid_key_input.ts'

export const encrypt: RsaEsEncryptFunction = async (alg: string, key: unknown, cek: Uint8Array) => {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalidKeyInput(key, 'CryptoKey'))
  }
  checkKeyLength(alg, key)

  if (key.usages.includes('encrypt')) {
    // @ts-ignore
    return new Uint8Array(await crypto.subtle.encrypt(subtleAlgorithm(alg), key, cek))
  }

  if (key.usages.includes('wrapKey')) {
    // we're importing the cek to end up with CryptoKey instance that can be wrapped, the algorithm used is irrelevant
    const cryptoKeyCek = await crypto.subtle.importKey('raw', cek, ...bogusWebCrypto)
    return new Uint8Array(
      // @ts-ignore
      await crypto.subtle.wrapKey('raw', cryptoKeyCek, key, subtleAlgorithm(alg)),
    )
  }

  throw new TypeError(
    'RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation',
  )
}

export const decrypt: RsaEsDecryptFunction = async (
  alg: string,
  key: unknown,
  encryptedKey: Uint8Array,
) => {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalidKeyInput(key, 'CryptoKey'))
  }
  checkKeyLength(alg, key)

  if (key.usages.includes('decrypt')) {
    // @ts-ignore
    return new Uint8Array(await crypto.subtle.decrypt(subtleAlgorithm(alg), key, encryptedKey))
  }

  if (key.usages.includes('unwrapKey')) {
    // @ts-ignore
    const cryptoKeyCek = await crypto.subtle.unwrapKey(
      'raw',
      encryptedKey,
      key,
      subtleAlgorithm(alg),
      ...bogusWebCrypto,
    )

    return new Uint8Array(await crypto.subtle.exportKey('raw', cryptoKeyCek))
  }

  throw new TypeError(
    'RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation',
  )
}