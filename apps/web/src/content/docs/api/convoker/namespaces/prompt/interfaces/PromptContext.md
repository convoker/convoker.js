---
editUrl: false
next: false
prev: false
title: "PromptContext"
---

Defined in: packages/prompt/dist/core/index.d.mts:6

## Extended by

- [`InteractiveContext`](/api/convoker/namespaces/prompt/interfaces/interactivecontext/)

## Type Parameters

### T

`T`

## Properties

### abort()

> **abort**: () => `void`

Defined in: packages/prompt/dist/core/index.d.mts:11

#### Returns

`void`

***

### done()

> **done**: (`value`) => `void`

Defined in: packages/prompt/dist/core/index.d.mts:9

#### Parameters

##### value

`T`

#### Returns

`void`

***

### error()

> **error**: (`err`) => `void`

Defined in: packages/prompt/dist/core/index.d.mts:10

#### Parameters

##### err

`unknown`

#### Returns

`void`

***

### input

> **input**: `ReadStream`

Defined in: packages/prompt/dist/core/index.d.mts:14

***

### opts

> **opts**: [`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/)\<`T`\>

Defined in: packages/prompt/dist/core/index.d.mts:7

***

### output

> **output**: `WriteStream`

Defined in: packages/prompt/dist/core/index.d.mts:15

***

### theme

> **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: packages/prompt/dist/core/index.d.mts:13

***

### validate()

> **validate**: (`value`) => `Promise`\<`T`\>

Defined in: packages/prompt/dist/core/index.d.mts:12

#### Parameters

##### value

`T`

#### Returns

`Promise`\<`T`\>

***

### value

> **value**: `T` \| `undefined`

Defined in: packages/prompt/dist/core/index.d.mts:8
