#!/bin/sh

#
# Autodownload Parser
#
#
PARSER=htmlparser-1.2.1
PARSER_ZIP="${PARSER}.zip"

if [ ! -d "${PARSER}" ]; then
    wget "http://about.validator.nu/htmlparser/${PARSER_ZIP}"
    unzip ${PARSER_ZIP}
fi

#
# Autodownload GWT
#
#
GWT=gwt-2.0.3
GWT_ZIP="${GWT}.zip"

if [ ! -d "${GWT}" ]; then
    wget "http://google-web-toolkit.googlecode.com/files/${GWT_ZIP}"
    unzip ${GWT_ZIP}
fi

echo "Starting GWT compile..."
CP="./src:./${PARSER}/src:./${PARSER}/super:./${GWT}/gwt-user.jar:./${GWT}/gwt-dev.jar"

# Compile a new GWT linker.  Very simple to Single Script Linker but
# removes all the "bootstrap" and client (real browser) onScriptLoad
# events, etc.
javac -cp ${CP} src/com/envjs/gwt/linker/ServerSingleScriptLinker.java

java \
    -Xmx256M \
    -cp "${CP}" \
    com.google.gwt.dev.Compiler \
    -logLevel ERROR \
    -style PRETTY \
    nu.validator.htmlparser.HtmlParser;

#    -draftCompile \
cp war/nu.validator.htmlparser.HtmlParser/nu.validator.htmlparser.HtmlParser.nocache.js ../../src/parser/htmlparser.js

#
# On innerhtml and some document-writes,some problems occurs when the
# parser being invoked with the wrong state.  This patch just prevents
# the parser from dying and throwing an exception.
#
patch ../../src/parser/htmlparser.js patch1.diff
echo "DONE"

