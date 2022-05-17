#! /bin/bash

status=0
node ./src/initiateGame.js
node ./src/displayGameStatus.js
while grep -q '.*,"isFinished":false.*' ./data.json ; do 
  echo ""
  read -p "Enter grid number to move: " destination
  node ./src/startGame.js $destination
  status=$?
done