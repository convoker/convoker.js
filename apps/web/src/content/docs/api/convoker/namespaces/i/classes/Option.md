---
editUrl: false
next: false
prev: false
title: "Option"
---

Defined in: packages/input/dist/index.d.mts:106

An option.

## Type Parameters

### TKind

`TKind` *extends* [`Kind`](/api/convoker/namespaces/i/type-aliases/kind/)

### TRequired

`TRequired` *extends* `boolean` = `true`

### TList

`TList` *extends* `boolean` = `false`

## Constructors

### Constructor

> **new Option**\<`TKind`, `TRequired`, `TList`\>(`kind`, `names`): `Option`\<`TKind`, `TRequired`, `TList`\>

Defined in: packages/input/dist/index.d.mts:140

Creates a new option.

#### Parameters

##### kind

`TKind`

The type of this option.

##### names

`string`[]

The names of this option.

#### Returns

`Option`\<`TKind`, `TRequired`, `TList`\>

## Properties

### $default

> **$default**: [`TypeOf`](/api/convoker/namespaces/i/type-aliases/typeof/)\<`TKind`\> \| `undefined`

Defined in: packages/input/dist/index.d.mts:122

The default value of this option.

***

### $description

> **$description**: `string` \| `undefined`

Defined in: packages/input/dist/index.d.mts:118

The description of this option.

***

### $kind

> **$kind**: `TKind`

Defined in: packages/input/dist/index.d.mts:110

The kind of this option.

***

### $list

> **$list**: `TList`

Defined in: packages/input/dist/index.d.mts:130

If this option is a list.

***

### $names

> **$names**: `string`[]

Defined in: packages/input/dist/index.d.mts:114

The aliases of this option.

***

### $required

> **$required**: `TRequired`

Defined in: packages/input/dist/index.d.mts:126

If this option is required.

***

### $separator

> **$separator**: `string` \| `undefined`

Defined in: packages/input/dist/index.d.mts:134

A separator if this option is a list.

## Methods

### default()

> **default**(`value`): `this`

Defined in: packages/input/dist/index.d.mts:161

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

Defined in: packages/input/dist/index.d.mts:167

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

> **list**(`separator?`): `Option`\<`TKind`, `TRequired`, `true`\>

Defined in: packages/input/dist/index.d.mts:145

Makes this option a list.

#### Parameters

##### separator?

`string`

#### Returns

`Option`\<`TKind`, `TRequired`, `true`\>

this

***

### optional()

> **optional**(): `Option`\<`TKind`, `false`, `TList`\>

Defined in: packages/input/dist/index.d.mts:155

Makes this option optional.

#### Returns

`Option`\<`TKind`, `false`, `TList`\>

this

***

### required()

> **required**(): `Option`\<`TKind`, `true`, `TList`\>

Defined in: packages/input/dist/index.d.mts:150

Makes this option required.

#### Returns

`Option`\<`TKind`, `true`, `TList`\>

this
