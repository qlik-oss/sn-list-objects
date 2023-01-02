#!/bin/sh
GREEN="\033[1;32m"
NOCOLOR="\033[0m"
if [ ! -f ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js ]; then
  echo "Run: ${GREEN}yarn run sense${NOCOLOR} then copy ./sn-filter-pane-ext to ~/Qlik/Sense/Extensions/ then try this again"
  exit
else
  if [ -f ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js.map ]; then
    rm ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js.map
  fi
  rm ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js
fi
yarn run build
ln ./dist/sn-filter-pane.js ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js
ln ./dist/sn-filter-pane.js.map ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js.map
echo "${GREEN} Press Y/y to refresh your current Chrome tab when rebuilding: ${NOCOLOR}"
read CHOICE
if [ "$CHOICE" = 'y' ] || [ "$CHOICE" = 'Y'  ]; then
  echo "Refreshing current Chrome tab on changes"
  fswatch -o ./dist | xargs -n1 -I {} osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload' & pid=$!
  trap "kill $pid" SIGINT
else
    echo "'$CHOICE' not 'Y' or 'y'. Just running yarn run build:watch"
fi
yarn run build:watch
