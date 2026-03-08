---
editUrl: false
next: false
prev: false
title: "PasswordOpts"
---

Defined in: packages/prompt/dist/prompts/index.d.mts:32

Options for password input.

## Extends

- [`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/)

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: packages/prompt/dist/core/index.d.mts:80

If the screen should be cleared when finishing a prompt.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`clearPromptOnDone`](/api/convoker/namespaces/prompt/interfaces/textopts/#clearpromptondone)

***

### confirm?

> `optional` **confirm**: `boolean`

Defined in: packages/prompt/dist/prompts/index.d.mts:40

If the user should be asked to confirm the password, by typing it again.

***

### default?

> `optional` **default**: `string`

Defined in: packages/prompt/dist/core/index.d.mts:68

The default value.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`default`](/api/convoker/namespaces/prompt/interfaces/textopts/#default)

***

### input?

> `optional` **input**: `ReadStream`

Defined in: packages/prompt/dist/core/index.d.mts:72

The standard input. Defaults to `process.stdin`.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`input`](/api/convoker/namespaces/prompt/interfaces/textopts/#input)

***

### mask?

> `optional` **mask**: `string`

Defined in: packages/prompt/dist/prompts/index.d.mts:36

The mask for the password input.

***

### maxLength?

> `optional` **maxLength**: `number`

Defined in: packages/prompt/dist/prompts/index.d.mts:19

Maximum length of the input.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`maxLength`](/api/convoker/namespaces/prompt/interfaces/textopts/#maxlength)

***

### message

> **message**: `string`

Defined in: packages/prompt/dist/core/index.d.mts:56

The message of the prompt.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`message`](/api/convoker/namespaces/prompt/interfaces/textopts/#message)

***

### minLength?

> `optional` **minLength**: `number`

Defined in: packages/prompt/dist/prompts/index.d.mts:15

Minimum length of the input.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`minLength`](/api/convoker/namespaces/prompt/interfaces/textopts/#minlength)

***

### output?

> `optional` **output**: `WriteStream`

Defined in: packages/prompt/dist/core/index.d.mts:76

The standard output. Defaults to `process.stdout`.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`output`](/api/convoker/namespaces/prompt/interfaces/textopts/#output)

***

### placeholder?

> `optional` **placeholder**: `string`

Defined in: packages/prompt/dist/prompts/index.d.mts:11

A placeholder, displayed when the user hasn't typed anything yet.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`placeholder`](/api/convoker/namespaces/prompt/interfaces/textopts/#placeholder)

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: packages/prompt/dist/core/index.d.mts:84

An `AbortSignal` to cancel the prompt.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`signal`](/api/convoker/namespaces/prompt/interfaces/textopts/#signal)

***

### theme?

> `optional` **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: packages/prompt/dist/core/index.d.mts:64

The theme of the prompt.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`theme`](/api/convoker/namespaces/prompt/interfaces/textopts/#theme)

***

### validate?

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `string`\> \| (`value`) => `string` \| `boolean`

Defined in: packages/prompt/dist/core/index.d.mts:60

A validator function, or a Standard Schema validator.

#### Inherited from

[`TextOpts`](/api/convoker/namespaces/prompt/interfaces/textopts/).[`validate`](/api/convoker/namespaces/prompt/interfaces/textopts/#validate)
