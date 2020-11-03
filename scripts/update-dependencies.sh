#!/bin/bash
# update dependencies
set -eu

BRANCH_BASE=master
BRANCH_TARGET=feature/update-dependencies-$(date +"%Y%m%d")
COLOR_SUCCESS="\e[1;32m"
COLOR_RESET="\e[m"

cd $(dirname ${0})/..

# create branch
git checkout ${BRANCH_BASE}
git checkout -b ${BRANCH_TARGET}

# check updates
npm run check-updates -- -u

# re-install packages
rm -rf package-lock.json node_modules
npm i
npm dedupe

# test
npm run build
npm run verify

# commit
git add package.json package-lock.json
git commit -m "update dependencies"

# finished!
echo -e "
${COLOR_SUCCESS}🎉All dependencies are updated successfully.🎉${COLOR_RESET}

Push changes and merge into '${BRANCH_BASE}' branch.

    git push --set-upstream origin ${BRANCH_TARGET}
"
