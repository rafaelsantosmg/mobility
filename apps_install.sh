#!/bin/bash

printf "\n> Instalando o front-end\n"
frontFolder="./app/frontend"
rm -rf "${frontFolder}/node_modules"
yarn --cwd ${frontFolder} install

printf "\n> Instalando o back-end\n"
backFolder="./app/backend"
rm -rf "${backFolder}/node_modules"
yarn --cwd ${backFolder} install
