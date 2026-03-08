---
editUrl: false
next: false
prev: false
title: "convert"
---

> **convert**\<`TKind`\>(`kind`, `value`): `Promise`\<[`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\> \| [`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\>[]\>

Defined in: packages/input/dist/index.d.mts:102

Converts a value from a Kind to a TypeScript type.

## Type Parameters

### TKind

`TKind` *extends* [`Kind`](/api/convoker/namespaces/i/type-aliases/kind/)

## Parameters

### kind

`TKind`

The kind to convert to.

### value

The value to convert.

`string` | `string`[]

## Returns

`Promise`\<[`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\> \| [`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\>[]\>

The converted value.
