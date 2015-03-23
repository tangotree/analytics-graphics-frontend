#!/bin/bash

BASEDIR=/code/data
if [ "$1" == "prod" ]
then
    mv $BASEDIR/config_prod.json $BASEDIR/config.json
fi

nginx
