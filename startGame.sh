#! /bin/bash

status=0
node ./initiateGame.js
node ./displayGameStatus.js
while [[ status -eq 0 ]]; do 
  echo ""
  read -p "Enter grid number to move: " destination
  node ./startGame.js $destination
  # node ./displayGameStatus.js $destination
  status=$?
done