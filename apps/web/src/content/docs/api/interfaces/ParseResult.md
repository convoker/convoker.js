---
editUrl: false
next: false
prev: false
title: "ParseResult"
---

Defined in: packages/core/dist/index.d.mts:115

The result of the `Command.parse` function.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/namespaces/i/interfaces/input/)

## Properties

### command

> **command**: [`Command`](/api/classes/command/)\<`T`\>

Defined in: packages/core/dist/index.d.mts:119

A pointer to the command to run.

***

### errors

> **errors**: [`ConvokerError`](/api/classes/convokererror/)[]

Defined in: packages/core/dist/index.d.mts:127

Errors collected during parsing.

***

### input

> **input**: [`InferInput`](/api/convoker/namespaces/i/type-aliases/inferinput/)\<`T`\>

Defined in: packages/core/dist/index.d.mts:123

The input to pass into the command.

***

### isHelp

> **isHelp**: `boolean`

Defined in: packages/core/dist/index.d.mts:135

If this should result in displaying a help screen.

***

### isVersion

> **isVersion**: `boolean`

Defined in: packages/core/dist/index.d.mts:131

If this should result in displaying the version of the command.
