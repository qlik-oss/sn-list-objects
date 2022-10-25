#!/bin/sh
GREEN="\033[1;32m"
NOCOLOR="\033[0m"
if [ ! -f ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js ]; then
  echo "Run: ${GREEN}npm run sense${NOCOLOR} then copy ./sn-filter-pane-ext to ~/Qlik/Sense/Extensions/ then try this again"
  exit
else
  if [ -f ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js.map ]; then
    rm ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js.map
  fi
  rm ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js
fi
npm run build
ln ~/git/sn-filter-pane/dist/sn-filter-pane.js ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js
ln ~/git/sn-filter-pane/dist/sn-filter-pane.js.map ~/Qlik/Sense/Extensions/sn-filter-pane-ext/dist/sn-filter-pane.js.map
echo "${GREEN} Press Y/y to refresh your current Chrome tab when rebuilding: ${NOCOLOR}"
read CHOICE
if [ "$CHOICE" = 'y' ] || [ "$CHOICE" = 'Y'  ]; then
  echo "Refreshing current Chrome tab on changes"
  fswatch -o ./dist | xargs -n1 -I {} osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload' & pid=$!
  trap "kill $pid" SIGINT
else
    echo "'$CHOICE' not 'Y' or 'y'. Just running npm run build:watch"
fi
npm run build:watch
