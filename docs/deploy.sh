#!/bin/zsh

set -e

yarn run build

cd src/.vuepress/dist

git init
git checkout -b gh-pages
git add -A
git commit -m 'deploy'

git push -f https://github.com/ernestchu/ernestchu.github.io gh-pages
