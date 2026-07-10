---
title: join
---

# Function: join()

> **join**\<`T`\>(`separator`, `iterable`, `toString?`): `string`

Defined in: [ext-iterator/join.ts:25](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/join.ts#L25)

`join(separator, iterable, toString?)` joins `ITERABLE` with `SEPARATOR`, applying `TO_STRING` when provided.

## Usage
```ts
const csv = join(",", [1, 2, 3]);
```

`join` has no async sugar; materialize async input before calling it.

```ts
const csv = join(",", await Array.fromAsync(values()));
```

## Type Parameters

### T

`T`

## Parameters

### separator

`string`

### iterable

`Iterable`\<`T`\>

### toString?

(`value`, `index`) => `string`

## Returns

`string`

## Example

It joins transformed values with the separator
```ts
expect(join(" | ", new Set(["a", "b"]), (value, index) => `${index}:${value}`)).toBe(
  "0:a | 1:b"
);
```
