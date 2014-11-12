#!/bin/bash

BASE_DIR=$(pwd)
PRESETS=( bare default full )

for PRESET in ${PRESETS[@]}
do
    echo "Creating standalone UMD bundle for preset \"$PRESET\""
    mkdir -p ".release/bundle/${PRESET}"
    if [ "$PRESET" = "default" ]; then ENTRY="src/index.js"; else ENTRY="src/index.${PRESET}.js"; fi
    browserify "${ENTRY}" --debug --standalone domtastic | bin/defaultify.js domtastic \$ | exorcist ".release/bundle/${PRESET}/domtastic.js.map" > ".release/bundle/${PRESET}/domtastic.js"
    cd "${BASE_DIR}/.release/bundle/${PRESET}"
    fix-sourcemaps --sourcemap "domtastic.js.map" --file domtastic.js
    uglifyjs --in-source-map domtastic.js.map --source-map domtastic.min.js.map --source-map-include-sources -m -c --screw-ie8 -o domtastic.min.js
    cd "${BASE_DIR}"
done
