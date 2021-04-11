# Lecture 4

## C-Shell Control Flow

- if
    - then
    - else
    - endif
- switch
    - case
    - default
    - breaksw
    - end
- while
    - continue
    - break
    - end

bash is not consistent in the case of a*b

```sh
% ls a*b
no matches found: a*b
% echo a*b
a*b
% touch ab a12345b
% echo a*b
ab a12345b
```
However, csh and zsh would show error regardless of what's inside the directory.

Stong quote `'`. What do you mean strong? If it strong, it can turn other special symbols into plaintexts. If a special symbol is **stronger** then it, such as `![prefix]`, then it cannot suppress the symbol

Weak quote `"`. Allow dollar sign `$` and tick execution ``[command]`` to expand inside two quotes. i.e. it's not strong enough to supress these two special symbols.

`'` > `"` > `\`
so you couldn't use a quote inside one that is stronger.

It's parsed from left to right, look at `'<-start stong quote interpretation rule. end->'`. Once it entered the **zone** by `'`, it suppresses everything until it hits next `'`. (Yet except `!`)
```sh
% echo '\\\'
\\\
% echo \'
'
% echo \''\'
'\
```


`set echo` print every command after the subsitution

`set verbose` print every command after the substution

