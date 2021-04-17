# Lecture 6
## sed
`sed` = **S**tream **Ed**itor. `sed` uses regex, just like `grep`. Each line of the input file is processed individually by your `sed` command.

You need to tell `sed`:

1. A type of action to perform when matched
1. A pattern that you are looking for
1. The exact details of the action
1. Some flags (not the command-line flags such as `sed -n`)

For example
```sh
sed 's/exersice/exercise/g'
#    │ │        │        │
#    │ │        │        └ Flag
#    │ │        └ Detail
#    │ └ Pattern
#    └ Action
#
# In the s (substitution) action, the detail is
# a fixed-string to be substituted with
```
::: warning Separator
In the example above, the symbol `/` separating four areas is called separator. A separator is specified by the **character succeeding** the action (which is `s` above). You can use symbols that other than `/` as separators. For example
```sh
sed 's,exersice,exercise,g'
```
:::
### Useful `sed` command-line flags
| Flag | Description                                                                |
|------|----------------------------------------------------------------------------|
| `-n` | No auto-printing of the pattern space                                      |
| `-e` | Execute the command sequence specified in the argument following this flag |
| `-f` | Obtain a command sequence from a file                                      |

## Substitute
```sh
s/[pattern]/[replacement]/[flags]
```
Where the `pattern` is a regex and the `replacement` is a fixed-string

### Common substitute flags
|Flag|Description|
|-|-|
|`g`|Replace all instances of the matches, otherwise `sed` defaults to the first instance only.|
|`number`|Replace only the n<sub>th</sub> instance specified by the `number`.|
|`p`|Print the line if a successful substitution is done. If `g` is used, print the line after the final substitution.|

#### Flag `g`
```sh
% cat aab_cab_B
aab
cab
B
% cat aab_cab_B | sed 's/[ab]/X/'
Xab
cXb
B
% cat aab_cab_B | sed 's/[ab]/X/g'
XXX
cXX
B
```
#### Flag `number`
```sh
% cat aab_cab_B | sed 's/[ab]/X/3'
aaX
cab
B
```
#### Flag `p`
```sh
% cat aab_cab_B | sed 's/[ab]/X/p'
Xab
Xab
cXb
cXb
B
```
The matched line are duplicate, use `p` with command-line flag `-n` instead.
```sh
% cat aab_cab_B | sed -n 's/[ab]/X/p'
Xab
cXb
```

### Reinsertion
#### Reinsert all of the matched
You can reinsert all of the matched pattern with `&`, for example
```sh
% echo "#%^&12345Hello World123454321"\
? | sed 's/[A-Za-z]\{1,\}/\nFound a word: &\n/g'
#%^&12345
Found a word: Hello
 
Found a word: World
123454321
```

### Reinsert certain groups
Same as `grep`, `\(\)` and `\number` can be used on `sed`.
```sh
% cat file | sed 's/\( p[^ ]*\)\( [^p][^ ]*\)*\( p[^ ]*\)/\1\3/'
Joe paid people
I paid people
```

### Build `grep` with `sed`
#### 1 match
```sh
#!/bin/tcsh
if ( $# == 2 ) then
    sed -n "s/$1:q/&/p" < $2
else
    sed -n "s/$1:q/&/p"
endif
```

#### 2 matches
```sh
#!/bin/tcsh
if ( $# == 2 ) then
    sed -n "s/$1:q/&/2p" < $2
else
    sed -n "s/$1:q/&/2p"
endif
```
or
```sh
#!/bin/tcsh
if ( $# == 2 ) then
    sed -n "s/$1:q.*$1:q/&/p" < $2
else
    sed -n "s/$1:q.*$1:q/&/p"
endif
```

### Nested groups
When backreferencing, the group numbers are defined in the order of their `\(` symbol, i.e., where they begin. Consquently, the outer groups come before the inner groups.
```sh
% cat file 
the quick brown fox jumped over the lazy dog
% cat file | sed 's,\(the \([a-z]* \)*the\),"\1",'
"the quick brown fox jumped over the" lazy dog
% cat file | sed 's,\(the \([a-z]* \)*the\),"\2",'
"over " lazy dog
```
However, if a group was used with the `*`, regex only backreferences the last match. As you can see above, only `over` was captured.

If we want all 5 or those word (quick brown fox jump over) to be captured, the `*` has to be the left of the `\)`, but we the `*` to be right in order to capture the repetitions! The solution to this is to add the third group.
```sh
% cat file | sed 's,\(the \(\([a-z]* \)*\)the\),"\2",'
"quick brown fox jumped over " lazy dog
```


