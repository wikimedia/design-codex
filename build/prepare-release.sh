#! /bin/bash
set -e

PUBLISH_WORKSPACES="@wikimedia/codex-design-tokens @wikimedia/codex-icons @wikimedia/codex"

if [ -z "$1" ]
then
	echo "Version is missing! The new version number must be specified."
	echo "Usage: prepare-release.sh VERSION"
	echo "VERSION is passed to 'npm version'; it can be a version number, or a string like 'major' or 'minor'"
	exit 1
fi

# Verify that there are no uncommitted changes; error out if there are
if [ $(git diff | wc -l) -ne 0 ]
then
	echo "You have uncommitted changes. Commit or stash them, then run this command again."
	exit 1
fi

# Get the old version from package.json before running npm version
OLD_VERSION="$(node -pe 'require("./packages/codex/package.json").version')"
# Update package.json in all workspaces
for WORKSPACE in $PUBLISH_WORKSPACES
do
	npm version --no-git-tag-version $1 -w $WORKSPACE
done
# Unfortunately this doesn't update package-lock.json in older versions of NPM, update it manually
npm install
# Get the updated version from package.json
NEW_VERSION="$(node -e 'console.log(require("./packages/codex/package.json").version)')"

# Update the dependency in @wikimedia/codex on @wikimedia/codex-icons
npm install -w @wikimedia/codex --save-prod --save-exact @wikimedia/codex-icons@$NEW_VERSION
# For some reason this command only works if you run it twice, so run it again
npm install -w @wikimedia/codex --save-prod --save-exact @wikimedia/codex-icons@$NEW_VERSION

# Build everything (and exit if that fails)
# NOTE: This has to be done after the version number is updated, because the version number is
# embedded in the build results. If the build fails, this unfortunately leaves behind a
# half-updated state.
for WORKSPACE in $PUBLISH_WORKSPACES
do
	npm run build -w $WORKSPACE
done

# Get the commits in the new version
NEW_COMMITS="$(git log --reverse v$OLD_VERSION.. --format="- %s (%aN)")"
# Categorize the commits via Node.js
# The bash script pipes the commit messages to the Node script.
# Node executes the JavaScript file and captures the output.
CATEGORIZED_COMMITS="$(echo "$NEW_COMMITS" | node build/sortCommits.mjs)"
TODAY="$(date -u +%Y-%m-%d)"
CHANGELOG_HEADER="# $NEW_VERSION / $TODAY"

# Write to CHANGELOG.md
echo -e "$CHANGELOG_HEADER\n\n$CATEGORIZED_COMMITS\n\n$(cat CHANGELOG.md)" > CHANGELOG.md

# Display publishing preview
for WORKSPACE in $PUBLISH_WORKSPACES
do
	npm publish --dry-run -w $WORKSPACE
done

# Checkout new commit branch
git checkout -b "tag-$NEW_VERSION"

# After manually sorting the changes according to code contribution guidelines,
# commit all changes with
# git commit --all --message="Tag v$NEW_VERSION"
