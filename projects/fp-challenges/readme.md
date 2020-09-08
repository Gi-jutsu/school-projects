## Hello, FP

## <a name='TOC'>🐼 Summary</a>

- [Rules](#rules)
- [Overview](#overview)
- [Challenges](#challenges)
- [Credits](#credits)

## <a name='overview'>🦊 Rules</a>

Hi, here are some rules to carry out this story oav;

- You **MUST** create a git repository named `fp-challenges`
- You **MUST** create a file called `.author` with your firstname and lastname followed by a newline.

```sh
~/fp-exercises ❯❯❯ cat -e .author
Majdi Toumi$
```

> Of course, you can talk about the subject with other developers, peer-learning is
> the key to be a better developer. Don't hesitate to ask questions or help people on slack.

> Don't forget, there is no useless question :-)

- You **MUST** return the project before Monday August, 31 at 4:00 pm by sending an MP on slack with the link of your github repo.
- You **MUST** add `pu-erh` user as a collaborator.
- YOU **MUST** define all functions signature by yourself :)
- YOU **MUST** use functional programming concepts

> You can learn more about FP [here](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/content/)

## <a name='overview'>🐱 Overview</a>

The purpose of theses exercises is simple, practice functional programming.
You **CAN'T** use any libraries.

## <a name='challenges'>🐨 Challenges</a>

### Hanoï

Filename : **`hanoi.ts`**

You have to solve the famous Hanoï problem ;

There are three stakes with base, numbered 1, 2 and 3, and N perforated discs which are two to two of different sizes.

Initially, the N discs are stacked in ascending order of size on stake no.1.

The object of the game is to move these n discs from stake n ° 1 to stake n ° 3, respecting the following rules:

- You only move one disk at a time and the moved disk must be on one of the other two stakes; this is called displacement.
- A disc should never be placed on top of a disc smaller than itself.

1) Determine the minimum number of displacements necessary to solve the problem by function of N (the number of disks).
2) Assume it takes 42 seconds to move a disc, how long will the game last with thirty discs working day and night ?

> Hello, [wikipédia](https://en.wikipedia.org/wiki/Tower_of_Hanoi)

### 8 Queens

Filename : **`8queens.ts`**

You have to solve the famous Queens problem ;

It consists in placing 8 queens on a 8 × 8 chessboard without them interfering with each other.
A queen can take all the parts located on the same row, on the same column or on the same diagonals itself.

> Hello, [wikipédia](https://en.wikipedia.org/wiki/Eight_queens_puzzle)

Now, you can create a file called **`Nqueens.ts`** that must solve the same proble for N queens on a NxN chessboard.

## <a name='credits'>🐵 Credits</a>

Craft with :heart: in **Paris**.
