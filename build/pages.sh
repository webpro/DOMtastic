#!/usr/bin/env bash

GHPAGES=".stage"
cat "${GHPAGES}/index.yml" README.md > "${GHPAGES}/index.md"
npm run build
npm run vendor
npm run coverage
npm run doc
rsync --recursive --delete dist/ "${GHPAGES}/dist/"
rsync --recursive --delete test/ "${GHPAGES}/test/"
rsync --recursive --delete vendor/ "${GHPAGES}/vendor/"
rsync --recursive --delete coverage/ "${GHPAGES}/coverage/"
rsync --recursive --delete doc/ "${GHPAGES}/doc/"
rsync --recursive --delete examples/ "${GHPAGES}/examples/"
rsync --recursive --delete benchmark/ "${GHPAGES}/benchmark/"
