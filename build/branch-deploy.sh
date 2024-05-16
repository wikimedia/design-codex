#! /bin/bash
set -e

# Build the documentation and publish it to Netlify.
# This script is run by "npm run branch-deploy", which is run by the branchdeploy-codex CI job
# when a patch is uploaded to Gerrit. The BRANCHDEPLOY_AUTH_TOKEN and BRANCHDEPLOY_SITE_ID
# variables are stored as secrets in Jenkins and can only be viewed and changed by Jenkins admins
# through the Jenkins web UI.

CODEX_BRANCH_DEPLOY=1
CODEX_PATCH_ID=$ZUUL_CHANGE

npm run doc
npx netlify deploy \
    --auth $BRANCHDEPLOY_AUTH_TOKEN \
    --site $BRANCHDEPLOY_SITE_ID \
    --alias $ZUUL_CHANGE \
    --dir packages/codex-docs/docs/.vitepress/dist
