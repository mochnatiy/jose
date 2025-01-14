# Class: JWKInvalid

## [💗 Help the project](https://github.com/sponsors/panva)

Support from the community to continue maintaining and improving this module is welcome. If you find the module useful, please consider supporting the project by [becoming a sponsor](https://github.com/sponsors/panva).

---

An error subclass thrown when a JWK is invalid.

**`example`** Checking thrown error is this one using a stable error code

```js
if (err.code === 'ERR_JWK_INVALID') {
  // ...
}
```

**`example`** Checking thrown error is this one using `instanceof`

```js
if (err instanceof jose.errors.JWKInvalid) {
  // ...
}
```

## Table of contents

### Constructors

- [constructor](util_errors.JWKInvalid.md#constructor)

### Properties

- [code](util_errors.JWKInvalid.md#code)

### Accessors

- [code](util_errors.JWKInvalid.md#code-1)

## Constructors

### constructor

• **new JWKInvalid**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

## Properties

### code

• **code**: `string` = `'ERR_JWK_INVALID'`

A unique error code for the particular error subclass.

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JWK_INVALID"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JWK_INVALID"``
