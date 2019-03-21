#! /bin/bash

type nodemon > /dev/null

if [ $? -eq 0 ]
then
  nodemon app.js
else
  node app.js
fi
