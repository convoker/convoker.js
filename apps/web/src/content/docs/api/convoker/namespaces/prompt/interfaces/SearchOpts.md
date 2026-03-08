---
editUrl: false
next: false
prev: false
title: "SearchOpts"
---

Defined in: packages/prompt/dist/prompts/index.d.mts:94

Options for search input.

## Extends

- [`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/)\<`T`, `M`\>

## Type Parameters

### T

`T`

### M

`M` *extends* `boolean` = `false`

### Q

`Q` = `string`

## Properties

### clearPromptOnDone?

> `optional` **clearPromptOnDone**: `boolean`

Defined in: packages/prompt/dist/core/index.d.mts:80

If the screen should be cleared when finishing a prompt.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`clearPromptOnDone`](/api/convoker/namespaces/prompt/interfaces/selectopts/#clearpromptondone)

***

### default?

> `optional` **default**: `T`

Defined in: packages/prompt/dist/core/index.d.mts:68

The default value.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`default`](/api/convoker/namespaces/prompt/interfaces/selectopts/#default)

***

### initialIndex?

> `optional` **initialIndex**: `number`

Defined in: packages/prompt/dist/prompts/index.d.mts:86

The initial option selected.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`initialIndex`](/api/convoker/namespaces/prompt/interfaces/selectopts/#initialindex)

***

### input?

> `optional` **input**: `ReadStream`

Defined in: packages/prompt/dist/core/index.d.mts:72

The standard input. Defaults to `process.stdin`.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`input`](/api/convoker/namespaces/prompt/interfaces/selectopts/#input)

***

### message

> **message**: `string`

Defined in: packages/prompt/dist/core/index.d.mts:56

The message of the prompt.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`message`](/api/convoker/namespaces/prompt/interfaces/selectopts/#message)

***

### minQueryLength?

> `optional` **minQueryLength**: `number`

Defined in: packages/prompt/dist/prompts/index.d.mts:102

Minimum length for a query string.

***

### multiple?

> `optional` **multiple**: `M`

Defined in: packages/prompt/dist/prompts/index.d.mts:82

If the user can select multiple options.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`multiple`](/api/convoker/namespaces/prompt/interfaces/selectopts/#multiple)

***

### options

> **options**: [`SelectOption`](/api/convoker/namespaces/prompt/interfaces/selectoption/)\<`T`\>[]

Defined in: packages/prompt/dist/prompts/index.d.mts:78

Every option the user can pick from.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`options`](/api/convoker/namespaces/prompt/interfaces/selectopts/#options)

***

### output?

> `optional` **output**: `WriteStream`

Defined in: packages/prompt/dist/core/index.d.mts:76

The standard output. Defaults to `process.stdout`.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`output`](/api/convoker/namespaces/prompt/interfaces/selectopts/#output)

***

### placeholder?

> `optional` **placeholder**: `string`

Defined in: packages/prompt/dist/prompts/index.d.mts:98

Placeholder for the search input.

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: packages/prompt/dist/core/index.d.mts:84

An `AbortSignal` to cancel the prompt.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`signal`](/api/convoker/namespaces/prompt/interfaces/selectopts/#signal)

***

### theme?

> `optional` **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: packages/prompt/dist/core/index.d.mts:64

The theme of the prompt.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`theme`](/api/convoker/namespaces/prompt/interfaces/selectopts/#theme)

***

### validate?

> `optional` **validate**: [`StandardSchemaV1`](/api/convoker/namespaces/i/interfaces/standardschemav1/)\<`any`, `T`\> \| (`value`) => `boolean` \| `T`

Defined in: packages/prompt/dist/core/index.d.mts:60

A validator function, or a Standard Schema validator.

#### Inherited from

[`SelectOpts`](/api/convoker/namespaces/prompt/interfaces/selectopts/).[`validate`](/api/convoker/namespaces/prompt/interfaces/selectopts/#validate)

## Methods

### filter()?

> `optional` **filter**(`query`, `option`): `boolean`

Defined in: packages/prompt/dist/prompts/index.d.mts:109

Filters a single option.

#### Parameters

##### query

`Q`

The search query.

##### option

[`SelectOption`](/api/convoker/namespaces/prompt/interfaces/selectoption/)\<`T`\>

The option to filter.

#### Returns

`boolean`

***

### transformQuery()?

> `optional` **transformQuery**(`query`): `Q`

Defined in: packages/prompt/dist/prompts/index.d.mts:103

#### Parameters

##### query

`string`

#### Returns

`Q`
