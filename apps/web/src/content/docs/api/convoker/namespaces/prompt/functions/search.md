---
editUrl: false
next: false
prev: false
title: "search"
---

> **search**\<`T`, `M`\>(`opts`): `Promise`\<`M` *extends* `true` ? `T`[] : `T`\>

Defined in: packages/prompt/dist/prompts/index.d.mts:116

Prompts the user to search through a list of options.

## Type Parameters

### T

`T`

### M

`M` *extends* `boolean` = `false`

## Parameters

### opts

[`SearchOpts`](/api/convoker/namespaces/prompt/interfaces/searchopts/)\<`T`, `M`\>

Options for search input.

## Returns

`Promise`\<`M` *extends* `true` ? `T`[] : `T`\>

The selected option.
