---
title: perform
---

# Function: perform()

> **perform**\<`T`, `R`\>(`iterator`): `R`

Defined in: [ext-iterator/perform.ts:27](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/perform.ts#L27)

`perform(iterator)` consumes `ITERATOR` and returns its final return value.

## Usage
```ts
function* work() { yield "working"; return "done"; }
const result = perform(work());
```

`perform` has no async sugar; consume an async iterator with `for await`.

```ts
for await (const event of events()) console.log(event);
```

## Type Parameters

### T

`T`

### R

`R`

## Parameters

### iterator

`Iterator`\<`T`, `R`, `unknown`\> \| `Iterable`\<`T`, `R`, `unknown`\>

## Returns

`R`

## Example

It consumes an iterator and returns its final value
```ts
function* work() {
  yield "first";
  yield "second";
  return "done";
}
expect(perform(work())).toBe("done");
```
