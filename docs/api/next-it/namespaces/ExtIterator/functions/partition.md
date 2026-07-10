---
title: partition
---

# Function: partition()

## Call Signature

> **partition**\<`T`, `S`\>(`predicate`, `iterable`): \[`S`[], `Exclude`\<`T`, `S`\>[]\]

Defined in: [ext-iterator/partition.ts:18](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/partition.ts#L18)

`partition(predicate, iterable)` splits `ITERABLE` by `PREDICATE` into matching and non-matching values.

## Usage
```ts
const [even, odd] = partition((value) => value % 2 === 0, [1, 2, 3, 4]);
```

### Type Parameters

#### T

`T`

#### S

`S`

### Parameters

#### predicate

(`value`, `index`) => `value is S`

#### iterable

`Iterable`\<`T`\>

### Returns

\[`S`[], `Exclude`\<`T`, `S`\>[]\]

### Example

It separates matching and non-matching values
```ts
expect(partition((value) => value % 2 === 0, [1, 2, 3, 4])).toEqual([
  [2, 4],
  [1, 3],
]);
```

## Call Signature

> **partition**\<`T`\>(`predicate`, `iterable`): \[`T`[], `T`[]\]

Defined in: [ext-iterator/partition.ts:22](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/partition.ts#L22)

`partition(predicate, iterable)` splits `ITERABLE` by `PREDICATE` into matching and non-matching values.

## Usage
```ts
const [even, odd] = partition((value) => value % 2 === 0, [1, 2, 3, 4]);
```

### Type Parameters

#### T

`T`

### Parameters

#### predicate

(`value`, `index`) => `unknown`

#### iterable

`Iterable`\<`T`\>

### Returns

\[`T`[], `T`[]\]

### Example

It separates matching and non-matching values
```ts
expect(partition((value) => value % 2 === 0, [1, 2, 3, 4])).toEqual([
  [2, 4],
  [1, 3],
]);
```
