---
editUrl: false
next: false
prev: false
title: "Command"
---

Defined in: packages/core/dist/index.d.mts:156

A command.

## Type Parameters

### T

`T` *extends* [`Input`](/api/convoker/namespaces/i/interfaces/input/) = [`Input`](/api/convoker/namespaces/i/interfaces/input/)

## Constructors

### Constructor

> **new Command**\<`T`\>(`names`, `desc?`, `version?`): `Command`\<`T`\>

Defined in: packages/core/dist/index.d.mts:211

Creates a new command.

#### Parameters

##### names

The names (aliases).

`string` | `string`[]

##### desc?

`string`

The description.

##### version?

`string`

The version.

#### Returns

`Command`\<`T`\>

## Properties

### $allowSurpassArgLimit

> **$allowSurpassArgLimit**: `boolean`

Defined in: packages/core/dist/index.d.mts:188

If you should be able to surpass the amount of positional arguments defined in the input.

***

### $allowUnknownOptions

> **$allowUnknownOptions**: `boolean`

Defined in: packages/core/dist/index.d.mts:184

If this command allows unknown options.

***

### $children

> **$children**: `Map`\<`string`, [`CommandAlias`](/api/interfaces/commandalias/)\<[`Input`](/api/convoker/namespaces/i/interfaces/input/)\>\>

Defined in: packages/core/dist/index.d.mts:176

The children of this command.

***

### $description

> **$description**: `string` \| `undefined`

Defined in: packages/core/dist/index.d.mts:164

The description of this command.

***

### $errorFn

> **$errorFn**: [`ErrorFn`](/api/type-aliases/errorfn/)\<`T`\> \| `undefined`

Defined in: packages/core/dist/index.d.mts:204

The error handler of this command.

***

### $fn

> **$fn**: [`ActionFn`](/api/type-aliases/actionfn/)\<`T`\> \| `undefined`

Defined in: packages/core/dist/index.d.mts:196

The action function of this command.

***

### $input

> **$input**: `T`

Defined in: packages/core/dist/index.d.mts:192

The input this command takes.

***

### $middlewares

> **$middlewares**: [`MiddlewareFn`](/api/type-aliases/middlewarefn/)\<`T`\>[]

Defined in: packages/core/dist/index.d.mts:200

The middlewares associated with this command.

***

### $names

> **$names**: `string`[]

Defined in: packages/core/dist/index.d.mts:160

The names (aliases) of this command.

***

### $parent

> **$parent**: `Command`\<`any`\> \| `undefined`

Defined in: packages/core/dist/index.d.mts:180

The parent of this command.

***

### $theme

> **$theme**: [`Theme`](/api/convoker/namespaces/theme/interfaces/theme/) \| `undefined`

Defined in: packages/core/dist/index.d.mts:168

The theme of this command

***

### $version

> **$version**: `string` \| `undefined`

Defined in: packages/core/dist/index.d.mts:172

The version of this command.

## Methods

### action()

> **action**(`fn`): `this`

Defined in: packages/core/dist/index.d.mts:247

Sets the action function for this command.

#### Parameters

##### fn

[`ActionFn`](/api/type-aliases/actionfn/)\<`T`\>

The action.

#### Returns

`this`

this

***

### add()

> **add**(...`commands`): `this`

Defined in: packages/core/dist/index.d.mts:259

Adds existing commands to this.

#### Parameters

##### commands

...`Command`\<`any`\>[]

The commands.

#### Returns

`this`

this

***

### alias()

> **alias**(...`aliases`): `this`

Defined in: packages/core/dist/index.d.mts:217

Adds a set of aliases to this command.

#### Parameters

##### aliases

...`string`[]

The aliases to add.

#### Returns

`this`

this

***

### allowSurpassArgLimit()

> **allowSurpassArgLimit**(): `this`

Defined in: packages/core/dist/index.d.mts:289

Allows surpassing the amount of arguments specified.

#### Returns

`this`

this

***

### allowUnknownOptions()

> **allowUnknownOptions**(): `this`

Defined in: packages/core/dist/index.d.mts:277

Allows unknown options.

#### Returns

`this`

this

***

### defaultErrorScreen()

> **defaultErrorScreen**(`errors`): `void`

Defined in: packages/core/dist/index.d.mts:299

The default error screen.

#### Parameters

##### errors

`Error`[]

The errors.

#### Returns

`void`

***

### description()

> **description**(`desc`): `this`

Defined in: packages/core/dist/index.d.mts:223

Adds a description to this command.

#### Parameters

##### desc

`string`

The description.

#### Returns

`this`

this

***

### error()

> **error**(`fn`): `this`

Defined in: packages/core/dist/index.d.mts:253

Sets the error function for this command.

#### Parameters

##### fn

[`ErrorFn`](/api/type-aliases/errorfn/)\<`T`\>

The error handler.

#### Returns

`this`

this

***

### fullCommandPath()

> **fullCommandPath**(): `string`

Defined in: packages/core/dist/index.d.mts:294

Gets the full command path (name including parents).

#### Returns

`string`

The full command path.

***

### handleErrors()

> **handleErrors**(`errors`, `input?`): `Promise`\<`Command`\<`T`\>\>

Defined in: packages/core/dist/index.d.mts:306

Handles a set of errors.

#### Parameters

##### errors

`Error`[]

The errors to handle.

##### input?

`Partial`\<[`InferInput`](/api/convoker/namespaces/i/type-aliases/inferinput/)\<`T`\>\>

The parsed input, if possible.

#### Returns

`Promise`\<`Command`\<`T`\>\>

this

***

### input()

> **input**\<`TInput`\>(`input`): `Command`\<`TInput`\>

Defined in: packages/core/dist/index.d.mts:235

Sets the input for this command.

#### Type Parameters

##### TInput

`TInput` *extends* [`Input`](/api/convoker/namespaces/i/interfaces/input/)

#### Parameters

##### input

`TInput`

#### Returns

`Command`\<`TInput`\>

this

***

### parse()

> **parse**(`argv`): `Promise`\<[`ParseResult`](/api/interfaces/parseresult/)\<`T`\>\>

Defined in: packages/core/dist/index.d.mts:283

Parses a set of command-line arguments.

#### Parameters

##### argv

`string`[]

The arguments to parse.

#### Returns

`Promise`\<[`ParseResult`](/api/interfaces/parseresult/)\<`T`\>\>

A parse result.

***

### run()

> **run**(`argv?`): `Promise`\<`Command`\<`T`\>\>

Defined in: packages/core/dist/index.d.mts:312

Runs a command.

#### Parameters

##### argv?

`string`[]

The arguments to run the command with. Defaults to your runtime's `argv` equivalent.

#### Returns

`Promise`\<`Command`\<`T`\>\>

this

***

### subCommand()

#### Call Signature

> **subCommand**(`names`, `builder`): `this`

Defined in: packages/core/dist/index.d.mts:265

Creates a new subcommand and adds it.

##### Parameters

###### names

The aliases of the subcommand.

`string` | `string`[]

###### builder

[`Builder`](/api/type-aliases/builder/)

A builder to create the command.

##### Returns

`this`

#### Call Signature

> **subCommand**(`names`, `desc?`, `version?`): `Command`\<`any`\>

Defined in: packages/core/dist/index.d.mts:272

Creates a new subcommand and adds it.

##### Parameters

###### names

The aliases of the subcommand.

`string` | `string`[]

###### desc?

`string`

The description of the subcommand.

###### version?

`string`

The version of the subcommand.

##### Returns

`Command`\<`any`\>

***

### use()

> **use**(...`fns`): `this`

Defined in: packages/core/dist/index.d.mts:241

Adds a chain of middlewares.

#### Parameters

##### fns

...[`MiddlewareFn`](/api/type-aliases/middlewarefn/)\<`T`\>[]

The middlewares to use.

#### Returns

`this`

this

***

### version()

> **version**(`version`): `this`

Defined in: packages/core/dist/index.d.mts:229

Adds a version to this command.

#### Parameters

##### version

`string`

The version.

#### Returns

`this`

this
