---
editUrl: false
next: false
prev: false
title: "InteractiveContext"
---

Defined in: packages/prompt/dist/core/index.d.mts:29

## Extends

- [`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/)\<`T`\>

## Type Parameters

### T

`T`

### O

`O` *extends* [`CoreOpts`](/api/convoker/namespaces/prompt/interfaces/coreopts/)\<`T`\>

### S

`S`

## Properties

### abort()

> **abort**: () => `void`

Defined in: packages/prompt/dist/core/index.d.mts:11

#### Returns

`void`

#### Inherited from

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`abort`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#abort)

***

### done()

> **done**: (`value`) => `void`

Defined in: packages/prompt/dist/core/index.d.mts:9

#### Parameters

##### value

`T`

#### Returns

`void`

#### Inherited from

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`done`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#done)

***

### error()

> **error**: (`err`) => `void`

Defined in: packages/prompt/dist/core/index.d.mts:10

#### Parameters

##### err

`unknown`

#### Returns

`void`

#### Inherited from

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`error`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#error)

***

### input

> **input**: `ReadStream`

Defined in: packages/prompt/dist/core/index.d.mts:14

#### Inherited from

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`input`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#input)

***

### onKeypress()

> **onKeypress**: (`handler`) => `void`

Defined in: packages/prompt/dist/core/index.d.mts:34

#### Parameters

##### handler

(`key`) => `void`

#### Returns

`void`

***

### opts

> **opts**: `O`

Defined in: packages/prompt/dist/core/index.d.mts:30

#### Overrides

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`opts`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#opts)

***

### output

> **output**: `WriteStream`

Defined in: packages/prompt/dist/core/index.d.mts:15

#### Inherited from

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`output`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#output)

***

### render()

> **render**: () => `void`

Defined in: packages/prompt/dist/core/index.d.mts:33

#### Returns

`void`

***

### setState()

> **setState**: (`updater`) => `void`

Defined in: packages/prompt/dist/core/index.d.mts:32

#### Parameters

##### updater

(`prev`) => `S`

#### Returns

`void`

***

### state

> **state**: `S`

Defined in: packages/prompt/dist/core/index.d.mts:31

***

### theme

> **theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/)

Defined in: packages/prompt/dist/core/index.d.mts:13

#### Inherited from

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`theme`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#theme)

***

### validate()

> **validate**: (`value`) => `Promise`\<`T`\>

Defined in: packages/prompt/dist/core/index.d.mts:12

#### Parameters

##### value

`T`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`validate`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#validate)

***

### value

> **value**: `T` \| `undefined`

Defined in: packages/prompt/dist/core/index.d.mts:8

#### Inherited from

[`PromptContext`](/api/convoker/namespaces/prompt/interfaces/promptcontext/).[`value`](/api/convoker/namespaces/prompt/interfaces/promptcontext/#value)
