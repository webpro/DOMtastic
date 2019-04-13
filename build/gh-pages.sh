#!/usr/bin/env bash

cat index.yml ../README.md > index.md
rsync --recursive --delete ../dist/ dist
rsync --recursive --delete ../test/ test
rsync --recursive --delete ../coverage/ coverage
rsync --recursive --delete ../doc/ doc
rsync --recursive --delete ../examples/ examples
rsync --recursive --delete ../benchmark/ benchmark
