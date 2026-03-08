---
editUrl: false
next: false
prev: false
title: "Props"
---

Defined in: packages/input/dist/index.d.mts:9

The Standard Schema properties interface.

## Type Parameters

### Input

`Input` = `unknown`

### Output

`Output` = `Input`

## Properties

### types?

> `readonly` `optional` **types**: [`Types`](/api/convoker/namespaces/i/namespaces/standardschemav1/interfaces/types/)\<`Input`, `Output`\>

Defined in: packages/input/dist/index.d.mts:17

Inferred types associated with the schema.

***

### validate()

> `readonly` **validate**: (`value`) => [`Result`](/api/convoker/namespaces/i/namespaces/standardschemav1/type-aliases/result/)\<`Output`\> \| `Promise`\<[`Result`](/api/convoker/namespaces/i/namespaces/standardschemav1/type-aliases/result/)\<`Output`\>\>

Defined in: packages/input/dist/index.d.mts:15

Validates unknown input values.

#### Parameters

##### value

`unknown`

#### Returns

[`Result`](/api/convoker/namespaces/i/namespaces/standardschemav1/type-aliases/result/)\<`Output`\> \| `Promise`\<[`Result`](/api/convoker/namespaces/i/namespaces/standardschemav1/type-aliases/result/)\<`Output`\>\>

***

### vendor

> `readonly` **vendor**: `string`

Defined in: packages/input/dist/index.d.mts:13

The vendor name of the schema library.

***

### version

> `readonly` **version**: `1`

Defined in: packages/input/dist/index.d.mts:11

The version number of the standard.
