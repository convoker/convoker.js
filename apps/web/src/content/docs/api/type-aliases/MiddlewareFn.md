---
editUrl: false
next: false
prev: false
title: "MiddlewareFn"
---

> **MiddlewareFn**\<`T`\> = (`input`, `next`) => `any` \| `Promise`\<`any`\>

Defined in: packages/core/dist/index.d.mts:144

Command middleware function.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/namespaces/i/interfaces/input/) = [`Input`](/api/convoker/namespaces/i/interfaces/input/)

## Parameters

### input

[`InferInput`](/api/convoker/namespaces/i/type-aliases/inferinput/)\<`T`\>

### next

() => `Promise`\<`any`\>

## Returns

`any` \| `Promise`\<`any`\>
