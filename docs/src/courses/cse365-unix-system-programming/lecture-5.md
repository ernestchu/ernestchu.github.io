# Lecture 5

### The greps

- `fgrep`: **f**ixed-string **grep** to searches for strings (not regex).
- `grep`: **g**et **r**egular **e**xpression and **p**rint to search for regular expression patterns.
- `egrep`: **e**xtended **grep** for an alternative pattern description system (extended regex)

## fgrep
#### Important `fgrep` flags

| Flag      | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `-i`      | Case **i**nsensitive                                                        |
| `-n`      | Display line **n**umbers                                                    |
| `-v`      | In**v**ert the matches                                                      |
| `-w`      | **W**hole word matches                                                      |
| `-o`      | **O**nly display the matchm not the entire line containing it               |
| `-e`      | Specify **e**xpression                                                      |
| `-A`      | Set the number of lines of context to print **a**fter each match            |
| `-B`      | Set the number of lines of context to print **b**efore each match           |
| `-C`      | Set the number of lines of **c**ontext to print before and after each match |
| `--color` | Highlight the matching pattern                                              |

#### Limitation

- cannot use it to get approximate matches
- cannot use it to get matches of more complicated patterns that cannot be described by just giving a fixed string

## grep
### Regular expression (regex) symbols
| Symbol | Description                                                                                     | Example                       |
|--------|-------------------------------------------------------------------------------------------------|-------------------------------|
| `^`    | caret, as the first symbol of a regex, requires the expression to match the front of a line.    | line begins with 'A': `^A`    |
| `$`    | dollar sign, as the last symbol of a regex, requires the expression to match the end of a line. | line ends with 'Z': `Z$`      |
| `\`    | backslash, turns off special meaning for the next character.                                    | match to a literal '$': `\$`  |
| `[]`   | brackets, matches to any one of the enclosed characters.                                        | match to any vowel: `[aeiou]` |
| `.`    | period, matches to any 1 character.                                                             | a 1-character line: `^.$`     |

::: tip Special Symbols Inside Brackets
| Symbol | Description                                                                                         | Example                   |
|--------|-----------------------------------------------------------------------------------------------------|---------------------------|
| `-`    | hyphen, inside `[]`, matches to a range.                                                            | a digit: `[0-9]`          |
| `^`    | caret, as the first symbol inside `[]`, matches any one character except those enclosed in the `[]` | not a letter: `[^a-zA-Z]` |
::: warning The Position of The Caret
If the caret was not placed as the first symbol inside `[]`, for example, `[ab^cd]`, then it just represents a literal `^'.
:::

#### Regex and state machine

Regex is derived from the finite state machine.

##### Deternimistic finite state automaton (DFA)
For the same input, there is exacly one transistion (deterministic) to the next state, for example

![a-a-star](./assets/graphs/lecture-5/svg/a-a-star.svg)

In regex, `aa*`, expressing any sting of at least one a.

##### Nondeternimistic finite state automaton (NFA)
For the same input, there can be one or more transitions (nondeterministic) to the next state, for example

![a-a-star](./assets/graphs/lecture-5/svg/a-star-a.svg)

In regex, `a*a`, expressing any sting of at least one a.

### Exercise
**Problem:** Draw the NFA for this regex: `a*a*`

::: tip Answer

![a-a-star](./assets/graphs/lecture-5/svg/a-star-a.svg)

And the simplify/deterministic regex for it: `a*`
:::

Let's now look at how to use `grep`
```sh{5}
grep -h
usage: grep [-abcDEFGHhIiJLlmnOoqRSsUVvwxZ] [-A num] [-B num] [-C[num]]
	[-e pattern] [-f file] [--binary-files=value] [--color=when]
	[--context[=num]] [--directories=action] [--label] [--line-buffered]
	[--null] [pattern] [file ...]
```
So, in short, we can use `grep [regex] [filenames]`.
::: details A Simple Example
```
% grep -w -e 'three$' -e 'four$' lewis.txt 
very large house with a housekeeper called Mrs. Macready and three
shall be only a statue of a Faun in her horrible house until the four
time of those four thrones at Cair Paravel).  Once you were all four
else--namely a little dwarf who stood with his back to it about four
there's sugar, and some matches.  And if someone will get two or three
"Four thrones in Cair Paravel," said the Witch.  "How if only three
hill and came straight across and stood before Aslan.  The three
flashing so quickly that they looked like three knives and three
```
:::
::: details More Examples
```sh
grep '^word'         files # “word” at the start of a line
grep 'word$'         files # “word” at the end of a line
grep '^word$'        files # lines containing only “word”
grep '\^s'           files # lines containing “^s”
grep '[Ww]ord'       files # search for “Word” or “word”
grep 'B[oO][bB]'     files # search for BOB, Bob, BOb or BoB
grep '^$'            files # search for blank lines
grep '[0-9][0-9]'    files # search for pairs of numeric digits
grep '[^a-zA-Z0-9]'  files # anything not a letter or number
grep '^.$'           files # lines with exactly one character
grep '"word"'        files # "word" within double quotes
grep '"*word"*'      files # “word”, with or without quotes
grep '^\.'           files # any line that starts with “.”
grep '^\.[a-z][a-z]' files # line start with “.” followed by 2 lower-case letters
```
:::

## Regex vs. Wildcards
Let's see the similarity and difference between **regex** and **csh wildcards**

| In regex | In csh wilcard | Meaning                    |
|----------|----------------|----------------------------|
| `\`      | `\`            | Same                       |
| `[]`     | `[]`           | Same?                      |
| `.`      | `?`            | Same but different symbols |
| `*`      | `*`            | Different                  |

### The brackets `[]`
How `grep` and csh treat a `[` **without** `]`?
#### `grep`
```sh{9}
% cat x
a[a
b]b
cxc
d[]d
e]]e
fx]f\f
% grep '[' x
grep: brackets ([ ]) not balanced
% grep '\[' x
a[a
d[]d
# grep consider a single unquoted [ as an incomplete pattern
```
#### csh wildcard
```sh
% ls
[	[]	]	]]	x	x]
% ls [
[
% ls \[
[
# csh do not think a [ without ] as a wildcard parttern but plain text
```
#### What if we want to find a "]"?
```sh{1,6,8}
% grep ']' x
b]b
d[]d
e]]e
fx]f\f
% ls ]
]
% ls *]*
[]	]	]]	x]
# Both of them treat it as plain text
```
#### What if we want to a "]" in the set?
```sh
% grep '[x]]' x
fx]f\f
# the regex was interprete as [x] followed by ]
% grep '[x\]]' x
fx]f\f
# this got interprete as [x\] (x or \) followed by ]
% grep '[]x]' x
b]b
cxc
d[]d
e]]e
fx]f\f
# this one finally works. Because empty sets don't make sense
# grep knew ] as the first element wasn't the end.
```
### Exercise
How would grep interprete `[^][^\]`
::: tip Answer
```
┌ a special [ which indicates the start of the set.
│┌ a special ^ which indicates a negate set.
││┌ a normal ], because it os the first element of a negate set.
│││┌ a normal [, because [ isn't special inside a [].
││││┌ a normal ^, one of the element in the set.
│││││┌ a normal \, because \ isn't special inside a [].
││││││┌ a special ] which indicates the end of the set.
│││││││
[^][^\]
```
```sh{1,8}
% cat x
a[a
b]b
cxc
d[]d
e]]e
fx]f\f
% grep '[^][^\]' x
a[a
b]b
cxc
d[]d
e]]e
fx]f\f
```
:::

### Time for wilcards
```sh
% ls
[	[]	]	]]	x	x]
% ls ]
]               # same as regex
% ls *]*
[]	]	]]	x]  # incomparable
% ls [
[               # different then regex
% ls [x[]
[	x           # same as regex
% ls [x]]
x]              # same as regex
% ls []x]
]	x           # same as regex
% ls []
[]              # different then regex, wilcard consider it as normal []
% ls [x\]]
]	x           # different than regex, the \ isn't normal in the set
```

::: danger Final Remarks
consider `grep 'AB*C' AB*C`

- For the first argument `'AB*C'`, notice the strong quotes, the shell send this argument as-is without quotes. And `grep` interprete it with regex rules.
- Whereas for the second argument `AB*C`, the shell first do the wilcard expansion on it then send the resulting file name(s) to `grep`.

:::
