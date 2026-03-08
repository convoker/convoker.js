---
editUrl: false
next: false
prev: false
title: "InferEntry"
---

> **InferEntry**\<`T`\> = `T` *extends* `object` ? `List` *extends* `true` ? `Required` *extends* `true` ? [`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\>[] : [`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\>[] \| `undefined` : `Required` *extends* `true` ? [`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\> : [`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\> \| `undefined` : `never`

Defined in: packages/input/dist/index.d.mts:91

Infers a TypeScript type from an option or positional.

## Type Parameters

### T

`T`
