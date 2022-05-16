#! /bin/bash

status=0
node ./initiateGame.js
node ./displayGameStatus.js
while grep -q '.*,"isFinished":false.*' ./data.json ; do 
  echo ""
  read -p "Enter grid number to move: " destination
  node ./startGame.js $destination
  status=$?
done