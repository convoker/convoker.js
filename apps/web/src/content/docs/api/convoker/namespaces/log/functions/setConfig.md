---
editUrl: false
next: false
prev: false
title: "setConfig"
---

> **setConfig**(`cfg`): `void`

Defined in: packages/log/dist/index.d.mts:47

Sets log configuration.

## Parameters

### cfg

The configuration, optionally including a theme.

#### format?

`"text"` \| `"json"`

The configuration format.

#### jsonSpace?

`number`

How much space in the JSON output of objects.
This does not change spacing in JSON logs, only for objects passed into log functions.

#### stderr?

\{ `_construct?`: (`callback`) => `void`; `_destroy?`: \{ \}; `_final?`: \{ \}; `_write?`: \{ \}; `_writev?`: (`chunks`, `callback`) => `void`; `[captureRejectionSymbol]?`: \<`K`\>(`error`, `event`, ...`args`) => `void`; `addListener?`: \{ \}; `closed?`: `boolean`; `compose?`: \{ \}; `cork?`: () => `void`; `destroy?`: \{ \}; `destroyed?`: `boolean`; `emit?`: \{ \}; `end?`: \{ \}; `errored?`: `Error` \| `null`; `eventNames?`: () => (`string` \| `symbol`)[]; `getMaxListeners?`: () => `number`; `listenerCount?`: \{ \}; `listeners?`: \{ \}; `off?`: \{ \}; `on?`: \{ \}; `once?`: \{ \}; `pipe?`: \{ \}; `prependListener?`: \{ \}; `prependOnceListener?`: \{ \}; `rawListeners?`: \{ \}; `removeAllListeners?`: \{ \}; `removeListener?`: \{ \}; `setDefaultEncoding?`: \{ \}; `setMaxListeners?`: \{ \}; `uncork?`: () => `void`; `writable?`: `boolean`; `writableAborted?`: `boolean`; `writableCorked?`: `number`; `writableEnded?`: `boolean`; `writableFinished?`: `boolean`; `writableHighWaterMark?`: `number`; `writableLength?`: `number`; `writableNeedDrain?`: `boolean`; `writableObjectMode?`: `boolean`; `write?`: \{ \}; \}

Standard error output.

#### stderr._construct?

(`callback`) => `void`

#### stderr._destroy?

\{ \}

#### stderr._final?

\{ \}

#### stderr._write?

\{ \}

#### stderr._writev?

(`chunks`, `callback`) => `void`

#### stderr.[captureRejectionSymbol]?

\<`K`\>(`error`, `event`, ...`args`) => `void`

#### stderr.addListener?

\{ \}

#### stderr.closed?

`boolean`

Is `true` after `'close'` has been emitted.

**Since**

v18.0.0

#### stderr.compose?

\{ \}

#### stderr.cork?

() => `void`

#### stderr.destroy?

\{ \}

#### stderr.destroyed?

`boolean`

Is `true` after `writable.destroy()` has been called.

**Since**

v8.0.0

#### stderr.emit?

\{ \}

#### stderr.end?

\{ \}

#### stderr.errored?

`Error` \| `null`

Returns error if the stream has been destroyed with an error.

**Since**

v18.0.0

#### stderr.eventNames?

() => (`string` \| `symbol`)[]

#### stderr.getMaxListeners?

() => `number`

#### stderr.listenerCount?

\{ \}

#### stderr.listeners?

\{ \}

#### stderr.off?

\{ \}

#### stderr.on?

\{ \}

#### stderr.once?

\{ \}

#### stderr.pipe?

\{ \}

#### stderr.prependListener?

\{ \}

#### stderr.prependOnceListener?

\{ \}

#### stderr.rawListeners?

\{ \}

#### stderr.removeAllListeners?

\{ \}

#### stderr.removeListener?

\{ \}

#### stderr.setDefaultEncoding?

\{ \}

#### stderr.setMaxListeners?

\{ \}

#### stderr.uncork?

() => `void`

#### stderr.writable?

`boolean`

Is `true` if it is safe to call `writable.write()`, which means
the stream has not been destroyed, errored, or ended.

**Since**

v11.4.0

#### stderr.writableAborted?

`boolean`

Returns whether the stream was destroyed or errored before emitting `'finish'`.

**Since**

v18.0.0, v16.17.0

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### stderr.writableCorked?

`number`

Number of times `writable.uncork()` needs to be
called in order to fully uncork the stream.

**Since**

v13.2.0, v12.16.0

#### stderr.writableEnded?

`boolean`

Is `true` after `writable.end()` has been called. This property
does not indicate whether the data has been flushed, for this use `writable.writableFinished` instead.

**Since**

v12.9.0

#### stderr.writableFinished?

`boolean`

Is set to `true` immediately before the `'finish'` event is emitted.

**Since**

v12.6.0

#### stderr.writableHighWaterMark?

`number`

Return the value of `highWaterMark` passed when creating this `Writable`.

**Since**

v9.3.0

#### stderr.writableLength?

`number`

This property contains the number of bytes (or objects) in the queue
ready to be written. The value provides introspection data regarding
the status of the `highWaterMark`.

**Since**

v9.4.0

#### stderr.writableNeedDrain?

`boolean`

Is `true` if the stream's buffer has been full and stream will emit `'drain'`.

**Since**

v15.2.0, v14.17.0

#### stderr.writableObjectMode?

`boolean`

Getter for the property `objectMode` of a given `Writable` stream.

**Since**

v12.3.0

#### stderr.write?

\{ \}

#### stdout?

\{ `_construct?`: (`callback`) => `void`; `_destroy?`: \{ \}; `_final?`: \{ \}; `_write?`: \{ \}; `_writev?`: (`chunks`, `callback`) => `void`; `[captureRejectionSymbol]?`: \<`K`\>(`error`, `event`, ...`args`) => `void`; `addListener?`: \{ \}; `closed?`: `boolean`; `compose?`: \{ \}; `cork?`: () => `void`; `destroy?`: \{ \}; `destroyed?`: `boolean`; `emit?`: \{ \}; `end?`: \{ \}; `errored?`: `Error` \| `null`; `eventNames?`: () => (`string` \| `symbol`)[]; `getMaxListeners?`: () => `number`; `listenerCount?`: \{ \}; `listeners?`: \{ \}; `off?`: \{ \}; `on?`: \{ \}; `once?`: \{ \}; `pipe?`: \{ \}; `prependListener?`: \{ \}; `prependOnceListener?`: \{ \}; `rawListeners?`: \{ \}; `removeAllListeners?`: \{ \}; `removeListener?`: \{ \}; `setDefaultEncoding?`: \{ \}; `setMaxListeners?`: \{ \}; `uncork?`: () => `void`; `writable?`: `boolean`; `writableAborted?`: `boolean`; `writableCorked?`: `number`; `writableEnded?`: `boolean`; `writableFinished?`: `boolean`; `writableHighWaterMark?`: `number`; `writableLength?`: `number`; `writableNeedDrain?`: `boolean`; `writableObjectMode?`: `boolean`; `write?`: \{ \}; \}

Standard output.

#### stdout._construct?

(`callback`) => `void`

#### stdout._destroy?

\{ \}

#### stdout._final?

\{ \}

#### stdout._write?

\{ \}

#### stdout._writev?

(`chunks`, `callback`) => `void`

#### stdout.[captureRejectionSymbol]?

\<`K`\>(`error`, `event`, ...`args`) => `void`

#### stdout.addListener?

\{ \}

#### stdout.closed?

`boolean`

Is `true` after `'close'` has been emitted.

**Since**

v18.0.0

#### stdout.compose?

\{ \}

#### stdout.cork?

() => `void`

#### stdout.destroy?

\{ \}

#### stdout.destroyed?

`boolean`

Is `true` after `writable.destroy()` has been called.

**Since**

v8.0.0

#### stdout.emit?

\{ \}

#### stdout.end?

\{ \}

#### stdout.errored?

`Error` \| `null`

Returns error if the stream has been destroyed with an error.

**Since**

v18.0.0

#### stdout.eventNames?

() => (`string` \| `symbol`)[]

#### stdout.getMaxListeners?

() => `number`

#### stdout.listenerCount?

\{ \}

#### stdout.listeners?

\{ \}

#### stdout.off?

\{ \}

#### stdout.on?

\{ \}

#### stdout.once?

\{ \}

#### stdout.pipe?

\{ \}

#### stdout.prependListener?

\{ \}

#### stdout.prependOnceListener?

\{ \}

#### stdout.rawListeners?

\{ \}

#### stdout.removeAllListeners?

\{ \}

#### stdout.removeListener?

\{ \}

#### stdout.setDefaultEncoding?

\{ \}

#### stdout.setMaxListeners?

\{ \}

#### stdout.uncork?

() => `void`

#### stdout.writable?

`boolean`

Is `true` if it is safe to call `writable.write()`, which means
the stream has not been destroyed, errored, or ended.

**Since**

v11.4.0

#### stdout.writableAborted?

`boolean`

Returns whether the stream was destroyed or errored before emitting `'finish'`.

**Since**

v18.0.0, v16.17.0

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### stdout.writableCorked?

`number`

Number of times `writable.uncork()` needs to be
called in order to fully uncork the stream.

**Since**

v13.2.0, v12.16.0

#### stdout.writableEnded?

`boolean`

Is `true` after `writable.end()` has been called. This property
does not indicate whether the data has been flushed, for this use `writable.writableFinished` instead.

**Since**

v12.9.0

#### stdout.writableFinished?

`boolean`

Is set to `true` immediately before the `'finish'` event is emitted.

**Since**

v12.6.0

#### stdout.writableHighWaterMark?

`number`

Return the value of `highWaterMark` passed when creating this `Writable`.

**Since**

v9.3.0

#### stdout.writableLength?

`number`

This property contains the number of bytes (or objects) in the queue
ready to be written. The value provides introspection data regarding
the status of the `highWaterMark`.

**Since**

v9.4.0

#### stdout.writableNeedDrain?

`boolean`

Is `true` if the stream's buffer has been full and stream will emit `'drain'`.

**Since**

v15.2.0, v14.17.0

#### stdout.writableObjectMode?

`boolean`

Getter for the property `objectMode` of a given `Writable` stream.

**Since**

v12.3.0

#### stdout.write?

\{ \}

## Returns

`void`
