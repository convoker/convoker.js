---
editUrl: false
next: false
prev: false
title: "ErrorFn"
---

> **ErrorFn**\<`T`\> = (`command`, `errors`, `input`) => `void` \| `Promise`\<`void`\>

Defined in: packages/core/dist/index.d.mts:148

Command error handler.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/namespaces/i/interfaces/input/)

## Parameters

### command

[`Command`](/api/classes/command/)\<`T`\>

### errors

`Error`[]

### input

`Partial`\<[`InferInput`](/api/convoker/namespaces/i/type-aliases/inferinput/)\<`T`\>\>

## Returns

`void` \| `Promise`\<`void`\>
