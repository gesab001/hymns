#!/usr/bin/env sh

git add .

echo message
read varname
git commit -m "$varname"
git push --all

ng deploy --base-href=/hymns/

