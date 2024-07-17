#!/usr/bin/bash

# Prebuild Clean
cd $THUNDER_HOME
rm -rf ./dist/*

# Electron Builder
npm run dist

# Postbuild Clean
rm -rf ./dist/win-unpacked
rm ./dist/*.yml
rm ./dist/*.yaml

# Rename App
mv ./dist/distant-thunder*exe ./dist/Chalcedony.exe
