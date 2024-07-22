#!/bin/bash

bin/compile-style.sh
bin/compile-manifest.js

cd $THUNDER_HOME
npm run start
