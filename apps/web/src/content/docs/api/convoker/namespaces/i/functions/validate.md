---
editUrl: false
next: false
prev: false
title: "validate"
---

> **validate**\<`T`\>(`entry`, `value`): `Promise`\<`T` *extends* [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `Out`\> ? `Out` : `never`\>

Defined in: packages/input/dist/index.d.mts:63

Validates a value.

## Type Parameters

### T

`T` *extends* [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `any`\>

## Parameters

### entry

`T`

The Standard Schema validator.

### value

`any`

The value to validate.

## Returns

`Promise`\<`T` *extends* [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `Out`\> ? `Out` : `never`\>

The validated value.
