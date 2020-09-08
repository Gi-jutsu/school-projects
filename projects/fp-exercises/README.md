## Hello, FP

## <a name='TOC'>🐼 Summary</a>

- [Rules](#rules)
- [Overview](#overview)
- [Exercises](#exercises)
- [Credits](#credits)

## <a name='overview'>🦊 Rules</a>

Hi, here are some rules to carry out this story oav;

- You **MUST** create a git repository named `fp-exercises`
- You **MUST** create a file called `.author` with your firstname and lastname followed by a newline.

```sh
~/fp-exercises ❯❯❯ cat -e .author
Majdi Toumi$
```

> Of course, you can talk about the subject with other developers, peer-learning is
> the key to be a better developer. Don't hesitate to ask questions or help people on slack.

> Don't forget, there is no useless question :-)

- You **MUST** return the project before Tuesday August, 31 at 4:00 pm by sending an MP on slack with the link of your github repo.
- You **MUST** add `pu-erh` user as a collaborator.
- YOU **MUST** define all functions signature by yourself :)
- YOU **MUST** use functional programming concepts

> You can learn more about FP [here](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/content/)

## <a name='overview'>🐱 Overview</a>

The purpose of theses exercises is simple, learn basic to functional programming.
You **CAN'T** use any libraries.

## <a name='exercises'>🐨 Exercises</a>

### 01 Deep Array

Filename : **`deepArrayInfos.ts`**

Write a functions that :

- calculate the sum of a deep array
- calculate the depth of the array
- find the largest value in a tree
- find the smallest value in a tree

Example of an array : `[1, [[2], 3], [4], 5, [6, 42, [[86], [[12]], 1337]], 1]`

### 02 Creating array

Filename : **`create.ts`**

Create a function `create` that takes an arbitrary number of arguments and creates an array of the arguments given.

### 03 Adding into Array

Filename : **`add.ts`**

Create a function `add` that takes an arbitrary number of arguments, and adds them all to an array.

### 04 Removing into Array

Filename : **`sub.ts`**

Create a function `sub` that subtracts all the arguments but the first from the first

### 05 Compose

Filename : **`compose.ts`**

Create a function `compose` that takes 2 functions and does function composition

> compose(g, f) should return a function that first calls f and then g on its argument.

### 06 Compose Nary

Filename : **`composeN.ts`**

Create a `compose` function that can take N arguments, and that returns a function that can take N arguments.

### 07 Partial

Filename : **`partial.ts`**

Create a function `partial` that takes a function Fn and N arguments, and returns a new function that is Fn partially applied to the arguments.

### 08 Memoize

Filename : **`memoize.ts`**

Create a function `memoize` take takes a function and memoizes it, i.e. it returns a function that does the same thing that the given function, but caches its results in a map.

### 09 GroupBy

Filename : **`groupBY.ts`**

Create a function `groupBy` that takes a function Fn and an array and groups the elements of the sequence based on the result of Fn.

### 10 Map

Filename : **`map.ts`**

Create a function `map` that reproduce the well-used **map** function :)

### 11 Filter

Filename : **`filter.ts`**

Create a function `filter` that reproduce the well-used **filter** function :)

### 12 Reduce

Filename : **`reduce.ts`**

Create a function `reduce` that reproduce the well-used **reduce** function :)

## <a name='credits'>🐵 Credits</a>

Craft with :heart: in **Paris**.
