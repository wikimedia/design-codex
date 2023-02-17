#! /bin/bash
set -ex

# Only run this command in CI, unless --force is set
if [ -z "$ZUUL_CHANGE" -a "$1" != "--force" ]
then
	echo "Not running CSS diff because no CI environment is detected. Pass --force to override."
	exit 0
fi

# Verify that there are no uncommitted changes; error out if there are
if [ $(git diff | wc -l) -ne 0 ]
then
	echo "Not running CSS diff because there are uncommitted changes."
	exit 1
fi

function buildCss() {
	npm run -w @wikimedia/codex-design-tokens build
	npm run -w @wikimedia/codex-icons build
	npm run -w @wikimedia/codex build:vite
	npx cssbeautify packages/codex/dist/codex.style.css > $1
}

OLDREV=$(git rev-parse HEAD^)
NEWREV=$(git symbolic-ref -q --short HEAD || git rev-parse HEAD)

git checkout HEAD^
buildCss $OLDREV.css
git checkout $NEWREV
buildCss $NEWREV.css
diff --color=always -u $OLDREV.css $NEWREV.css || true
rm -f $OLDREV.css $NEWREV.css
