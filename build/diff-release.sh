#! /bin/bash
set -e

PUBLISH_WORKSPACES="@wikimedia/codex-design-tokens @wikimedia/codex-icons @wikimedia/codex @wikimedia/codex-search"

# Verify that there are no uncommitted changes; error out if there are
if [ $(git diff | wc -l) -ne 0 ]
then
	echo "Not running release diff because there are uncommitted changes."
	exit 1
fi

if [ -n "$1" ]
then
	OLD_VERSION=$1
else
	# Get the newest release tag: list all tags beginning with 'v', sort them in reverse
	# version number order, and get the first one
	OLD_VERSION=$(git tag --list 'v*' --sort=-version:refname | head -n 1)
fi

NEWREV=$(git rev-parse HEAD)

function beautify() {
	# Run cssbeautify on CSS files
	for cssfile in $(find . -name '*.css')
	do
		npx cssbeautify $cssfile > $cssfile.pretty
		mv -f $cssfile.pretty $cssfile
	done

	# Delete minified .js files; keep unminified .mjs files
	rm -rf $(find . -name '*.js')

	# Beautify .json files by parsing them then re-stringifying them in pretty mode
	for jsonfile in $(find . -name '*.json')
	do
		node -pe 'JSON.stringify(JSON.parse(fs.readFileSync(process.argv[1])),null,"\t")' $jsonfile > $jsonfile.pretty
		mv -f $jsonfile.pretty $jsonfile
	done
}

mkdir -p tmp-diff-release
MAINDIR=$(pwd)

for WORKSPACE in $PUBLISH_WORKSPACES
do
	# Download the tarball for the old version from NPM
	# and extract it into tmp-diff-release/versionnumber/packagename/
	TARBALL=$(npm pack $WORKSPACE@$OLD_VERSION)
	mkdir -p tmp-diff-release/$OLD_VERSION/$WORKSPACE
	cd tmp-diff-release/$OLD_VERSION/$WORKSPACE
	tar -zxf $MAINDIR/$TARBALL
	beautify
	cd -
	rm -f $TARBALL

	# Build the release tarball for the current state of the repo
	# and extract it into tmp-diff-release/commithash/packagename/
	npm run -w $WORKSPACE build
	TARBALL=$(npm pack -w $WORKSPACE)
	mkdir -p tmp-diff-release/$NEWREV/$WORKSPACE
	cd tmp-diff-release/$NEWREV/$WORKSPACE
	tar -zxf $MAINDIR/$TARBALL
	beautify
	cd -
	rm -f $TARBALL
done

diff --color=always -u -r tmp-diff-release/$OLD_VERSION tmp-diff-release/$NEWREV || true
rm -rf tmp-diff-release
