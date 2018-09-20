#!/bin/bash

if [ $# -gt 0 ]
then
    APP_PATH=`pwd`

    STEPS=`find $APP_PATH -type d -name "step-*"`

    for item in ${STEPS}
    do
    if [ -f "$item/src/api/constants.js" ];
    then
        echo "writing api key for $item"
        sed -i '' "/const TMDB_API_KEY/s/.*/const TMDB_API_KEY = '$1'/" $item/src/api/constants.js
    else
        echo "nothing to do for $item"
    fi
    done
else
    echo please enter your api key
fi
