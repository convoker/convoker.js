---
editUrl: false
next: false
prev: false
title: "TypeOf"
---

> **TypeOf**\<`T`\> = `T` *extends* [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, infer Out\> ? `Out` : `T` *extends* `"boolean"` ? `boolean` : `T` *extends* `"string"` ? `string` : `T` *extends* `"number"` ? `number` : `T` *extends* `"bigint"` ? `bigint` : `never`

Defined in: packages/input/dist/index.d.mts:83

Converts a Kind to a TypeScript type.

## Type Parameters

### T

`T` *extends* [`Kind`](/api/convoker/namespaces/i/type-aliases/kind/)
