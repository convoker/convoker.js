---
editUrl: false
next: false
prev: false
title: "CoreOpts"
---

Defined in: packages/prompt/dist/core/index.d.mts:52

Base options for prompts.

## Extended by

- [`ConfirmOpts`](/api/convoker/namespaces/prompt/interfaces/confirmopts/)
- [`EditorOpts`](/api/convoker/namespaces/prompt/interfaces/editoropts/)
- [`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/)
- [`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/)

## Type Parameters

### T

`T`

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: packages/prompt/dist/core/index.d.mts:80

If the screen should be cleared when finishing a prompt.

***

### default?

> `optional` **default**: `T`

Defined in: packages/prompt/dist/core/index.d.mts:68

The default value.

***

### input?

> `optional` **input**: `ReadStream`

Defined in: packages/prompt/dist/core/index.d.mts:72

The standard input. Defaults to `process.stdin`.

***

### message

> **message**: `string`

Defined in: packages/prompt/dist/core/index.d.mts:56

The message of the prompt.

***

### output?

> `optional` **output**: `WriteStream`

Defined in: packages/prompt/dist/core/index.d.mts:76

The standard output. Defaults to `process.stdout`.

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: packages/prompt/dist/core/index.d.mts:84

An `AbortSignal` to cancel the prompt.

***

### theme?

> `optional` **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: packages/prompt/dist/core/index.d.mts:64

The theme of the prompt.

***

### validate?

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `T`\> \| (`value`) => `boolean` \| `T`

Defined in: packages/prompt/dist/core/index.d.mts:60

A validator function, or a Standard Schema validator.
