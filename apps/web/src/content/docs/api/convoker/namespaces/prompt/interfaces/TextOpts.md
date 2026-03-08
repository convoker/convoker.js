---
editUrl: false
next: false
prev: false
title: "TextOpts"
---

Defined in: packages/prompt/dist/prompts/index.d.mts:7

Options for text input.

## Extends

- [`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/)\<`string`\>

## Extended by

- [`PasswordOpts`](/api/convoker/namespaces/prompt/interfaces/passwordopts/)

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: packages/prompt/dist/core/index.d.mts:80

If the screen should be cleared when finishing a prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`clearPromptOnDone`](/api/convoker/namespaces/prompt/interfaces/coreopts/#clearpromptondone)

***

### default?

> `optional` **default**: `string`

Defined in: packages/prompt/dist/core/index.d.mts:68

The default value.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`default`](/api/convoker/namespaces/prompt/interfaces/coreopts/#default)

***

### input?

> `optional` **input**: `ReadStream`

Defined in: packages/prompt/dist/core/index.d.mts:72

The standard input. Defaults to `process.stdin`.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`input`](/api/convoker/namespaces/prompt/interfaces/coreopts/#input)

***

### maxLength?

> `optional` **maxLength**: `number`

Defined in: packages/prompt/dist/prompts/index.d.mts:19

Maximum length of the input.

***

### message

> **message**: `string`

Defined in: packages/prompt/dist/core/index.d.mts:56

The message of the prompt.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`message`](/api/convoker/namespaces/prompt/interfaces/coreopts/#message)

***

### minLength?

> `optional` **minLength**: `number`

Defined in: packages/prompt/dist/prompts/index.d.mts:15

Minimum length of the input.

***

### output?

> `optional` **output**: `WriteStream`

Defined in: packages/prompt/dist/core/index.d.mts:76

The standard output. Defaults to `process.stdout`.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`output`](/api/convoker/namespaces/prompt/interfaces/coreopts/#output)

***

### placeholder?

> `optional` **placeholder**: `string`

Defined in: packages/prompt/dist/prompts/index.d.mts:11

A placeholder, displayed when the user hasn't typed anything yet.

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

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `string`\> \| (`value`) => `string` \| `boolean`

Defined in: packages/prompt/dist/core/index.d.mts:60

A validator function, or a Standard Schema validator.

#### Inherited from

[`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/).[`validate`](/api/convoker/namespaces/prompt/interfaces/coreopts/#validate)
