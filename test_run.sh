#!/bin/sh
export PATH=/Users/sean/Installs/node/bin":"$PATH
export NODE_PATH=/Users/sean/Projects/web-engine/env-js

./bin/envjs node local_settings.js examples/loadpage.js
