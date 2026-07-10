---
title: first
---

# Function: first()

> **first**\<`T`\>(`iterable`): `T` \| `undefined`

Defined in: [ext-iterator/first.ts:27](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/first.ts#L27)

`first(iterable)` returns the first value of `ITERABLE`, or `undefined`
if `ITERABLE` is empty.

## Usage
```ts
const firstTodo = first([
  { todo: "Buy milk" },
  { todo: "Walk dog" },
]);

console.log(firstTodo?.todo);
```

## Type Parameters

### T

`T`

## Parameters

### iterable

`Iterable`\<`T`\>

## Returns

`T` \| `undefined`

## Examples

It returns the first value from an iterable
```ts
expect(first(["foo", "bar", "baz"])).toBe("foo");
```

It returns undefined when the iterable is empty
```ts
expect(first([])).toBeUndefined();
```
