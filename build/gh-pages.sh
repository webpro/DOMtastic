#!/usr/bin/env bash

cat index.yml ../README.md > index.md
npm run build
npm run vendor
npm run coverage
npm run doc
rsync --recursive --delete ../dist/ dist
rsync --recursive --delete ../test/ test
rsync --recursive --delete ../vendor/ vendor
rsync --recursive --delete ../coverage/ coverage
rsync --recursive --delete ../doc/ doc
rsync --recursive --delete ../examples/ examples
rsync --recursive --delete ../benchmark/ benchmark
