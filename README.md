# `vokabeln`
## What is `vokabeln`?

`vokabeln` is a learning card style command line vocabularyy trainer for your command line that runs on the modern Deno runtime for TypeScript, giving it the stability of a compiled binary and the flexibility of JavaScript. (compiled binary coming soon)

## Installing

```sh
deno install https://raw.githubusercontent.com/libewa/vokabeln/main/main.ts
```
Unfortunately, there are no binaries available, as `deno compile` isn't supported right now, because of [this issue](https://github.com/denoland/deno/issues/10693) in deno. tl;&#xfeff;dr: Deno doesn't know where to put the database files, so the developers made it throw `NotSupported` instead:
```
error: Uncaught NotSupported: LocalStorage is not supported in this context.
    at Proxy.getItem (ext:deno_webstorage/01_webstorage.js:60:16)
    at file://[redacted]/vokabeln/main.ts:8:45
```

## Usage
### `add`
After installing `vokabeln`, you probably want to add some cards. For that, run the `add` command:
```sh
vokabeln add <set>
```
`<set>` will be the identifier you use to refer to this set of cards from now on.

### `learn`
Now that you have your cards on your computer, you can learn their content using the proven method vocabulary boxes use.
```sh
vokabeln add <set> [-a]
```
`<set>`, again, stands for the name you gave the set when adding cards, while the `-a` flag lets you skip the due date check, which I will talk about now.

#### The due date check
In the card box system, a certain amount of days need to pass before you can learn a card again. The `-a` flag lets you ignore this recommendation, but **IS NOT RECOMMENDED**! This is because learning might actually be more efficient when waiting to learn something again.[^1]

It's also not encouraged to learn an excessive amount of vocabulary per day, as you won't be able to remember everything and just be wasting your time.[^1]

### `list`

`list` is for the moments where you think that using a paper notebook would have been better. Need to scan a table? Quiz your classmates? `list` outputs a detailed list of all the cards in a set.
```sh
vokabeln list <set>
```

## Libraries
- [Deno](https://deno.land)
- [Cliffy](https://cliffy.io/)
- [hugoalh-studio/shuffle-array-deno](https://github.com/hugoalh-studio/shuffle-array-deno)

[^1]: Not medical advice!