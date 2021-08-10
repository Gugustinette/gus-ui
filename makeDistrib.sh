#!/bin/bash

echo Making Distrib...

cp src/basic_components/*/JS/*.js dist/basic_components
echo + Basic Components Distribued

cp src/advanced_components/*/JS/*.js dist/advanced_components
echo + Advanced Components Distribued

cp src/text_components/*/*.js dist/text_components
echo + Text Components Distribued

cp src/special_components/*/JS/*.js dist/special_components
echo + Special Components Distribued

echo Distrib finished