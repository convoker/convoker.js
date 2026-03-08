---
editUrl: false
next: false
prev: false
title: "SelectOpts"
---

Defined in: packages/prompt/dist/prompts/index.d.mts:74

Options for select input.

## Extends

- [`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/)\<`T`\>

## Extended by

- [`SearchOpts`](/api/convoker/namespaces/prompt/interfaces/searchopts/)

## Type Parameters

### T

`T`

### M

`M` *extends* `boolean` = `false`

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: packages/prompt/dist/core/index.d.mts:80

If the screen should be cleared when finishing a prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`clearPromptOnDone`](/api/convoker/namespaces/prompt/interfaces/coreopts/#clearpromptondone)

***

### default?

> `optional` **default**: `T`

Defined in: packages/prompt/dist/core/index.d.mts:68

The default value.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`default`](/api/convoker/namespaces/prompt/interfaces/coreopts/#default)

***

### initialIndex?

> `optional` **initialIndex**: `number`

Defined in: packages/prompt/dist/prompts/index.d.mts:86

The initial option selected.

***

### input?

> `optional` **input**: `ReadStream`

Defined in: packages/prompt/dist/core/index.d.mts:72

The standard input. Defaults to `process.stdin`.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`input`](/api/convoker/namespaces/prompt/interfaces/coreopts/#input)

***

### message

> **message**: `string`

Defined in: packages/prompt/dist/core/index.d.mts:56

The message of the prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`message`](/api/convoker/namespaces/prompt/interfaces/coreopts/#message)

***

### multiple?

> `optional` **multiple**: `M`

Defined in: packages/prompt/dist/prompts/index.d.mts:82

If the user can select multiple options.

***

### options

> **options**: [`SelectOption`](/api/convoker/namespaces/prompt/interfaces/selectoption/)\<`T`\>[]

Defined in: packages/prompt/dist/prompts/index.d.mts:78

Every option the user can pick from.

***

### output?

> `optional` **output**: `WriteStream`

Defined in: packages/prompt/dist/core/index.d.mts:76

The standard output. Defaults to `process.stdout`.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`output`](/api/convoker/namespaces/prompt/interfaces/coreopts/#output)

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: packages/prompt/dist/core/index.d.mts:84

An `AbortSignal` to cancel the prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`signal`](/api/convoker/namespaces/prompt/interfaces/coreopts/#signal)

***

### theme?

> `optional` **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: packages/prompt/dist/core/index.d.mts:64

The theme of the prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`theme`](/api/convoker/namespaces/prompt/interfaces/coreopts/#theme)

***

### validate?

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `T`\> \| (`value`) => `boolean` \| `T`

Defined in: packages/prompt/dist/core/index.d.mts:60

A validator function, or a Standard Schema validator.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`validate`](/api/convoker/namespaces/prompt/interfaces/coreopts/#validate)
