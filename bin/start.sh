#!/bin/bash

bin/compile-style.sh
bin/compile-manifest.sh

cd $THUNDER_HOME
npm run start
