#!/bin/bash

mongoimport --jsonArray --drop --db $1 --collection gambler --file ../../db/gambler.json

