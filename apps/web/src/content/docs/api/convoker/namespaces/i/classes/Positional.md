---
editUrl: false
next: false
prev: false
title: "Positional"
---

Defined in: packages/input/dist/index.d.mts:172

A positional argument.

## Type Parameters

### TKind

`TKind` *extends* [`Kind`](/api/convoker/namespaces/i/type-aliases/kind/)

### TRequired

`TRequired` *extends* `boolean` = `true`

### TList

`TList` *extends* `boolean` = `false`

## Constructors

### Constructor

> **new Positional**\<`TKind`, `TRequired`, `TList`\>(`kind`): `Positional`\<`TKind`, `TRequired`, `TList`\>

Defined in: packages/input/dist/index.d.mts:197

Creates a new positional argument.

#### Parameters

##### kind

`TKind`

The positional argument.

#### Returns

`Positional`\<`TKind`, `TRequired`, `TList`\>

## Properties

### $default

> **$default**: [`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\> \| `undefined`

Defined in: packages/input/dist/index.d.mts:180

The default value of this argument.

***

### $description

> **$description**: `string` \| `undefined`

Defined in: packages/input/dist/index.d.mts:184

The description of this argument.

***

### $kind

> **$kind**: `TKind`

Defined in: packages/input/dist/index.d.mts:176

The type of this argument.

***

### $list

> **$list**: `TList`

Defined in: packages/input/dist/index.d.mts:192

If this argument is a list.

***

### $required

> **$required**: `TRequired`

Defined in: packages/input/dist/index.d.mts:188

If this argument is required.

## Methods

### default()

> **default**(`value`): `this`

Defined in: packages/input/dist/index.d.mts:218

Sets a default value.

#### Parameters

##### value

[`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\>

The default value.

#### Returns

`this`

this

***

### description()

> **description**(`desc`): `this`

Defined in: packages/input/dist/index.d.mts:224

Sets a description.

#### Parameters

##### desc

`string`

The description.

#### Returns

`this`

this

***

### list()

> **list**(): `Positional`\<`TKind`, `TRequired`, `true`\>

Defined in: packages/input/dist/index.d.mts:202

Makes this argument a list.

#### Returns

`Positional`\<`TKind`, `TRequired`, `true`\>

this

***

### optional()

> **optional**(): `Positional`\<`TKind`, `false`, `TList`\>

Defined in: packages/input/dist/index.d.mts:212

Makes this argument optional.

#### Returns

`Positional`\<`TKind`, `false`, `TList`\>

this

***

### required()

> **required**(): `Positional`\<`TKind`, `true`, `TList`\>

Defined in: packages/input/dist/index.d.mts:207

Makes this argument required.

#### Returns

`Positional`\<`TKind`, `true`, `TList`\>

this
