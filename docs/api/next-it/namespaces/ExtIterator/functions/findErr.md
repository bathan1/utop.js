---
title: findErr
---

# Function: findErr()

## Call Signature

> **findErr**\<`T`, `S`\>(`predicate`, `iterable`): `S`

Defined in: [ext-iterator/findErr.ts:22](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/findErr.ts#L22)

`findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws
RangeError if no such value is found.

## Usage
```ts
const firstOpen = findErr((todo) => !todo.done, todos);
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

`S`

### Examples

It returns the first value that satisfies `CALLBACKFN`
```ts
expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
```

It throws when no value satisfies `CALLBACKFN`
```ts
expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
```

## Call Signature

> **findErr**\<`T`\>(`predicate`, `iterable`): `T`

Defined in: [ext-iterator/findErr.ts:26](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/findErr.ts#L26)

`findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws
RangeError if no such value is found.

## Usage
```ts
const firstOpen = findErr((todo) => !todo.done, todos);
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

`T`

### Examples

It returns the first value that satisfies `CALLBACKFN`
```ts
expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
```

It throws when no value satisfies `CALLBACKFN`
```ts
expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
```
