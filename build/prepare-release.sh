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

# Build everything (and exit if that fails)
# NOTE: If we ever embed the version number in any of the build results,
# we will have to build after incrementing the version, then leave things half-baked
# if the build fails
for WORKSPACE in $PUBLISH_WORKSPACES
do
	npm run build -w $WORKSPACE
done

# Get the old version from package.json before running npm version
OLD_VERSION="$(node -e 'console.log(require("./packages/codex/package.json").version)')"
# Update package.json in all workspaces
for WORKSPACE in $PUBLISH_WORKSPACES
do
	npm version --no-git-tag-version $1 -w $WORKSPACE
done
# Unfortunately this doesn't update package-lock.json, update that manually
npm install
# Get the updated version from package.json
NEW_VERSION="$(node -e 'console.log(require("./packages/codex/package.json").version)')"

# Get the commits in the new version and prepend them to CHANGELOG.md
NEW_COMMITS="$(git log --reverse v$OLD_VERSION.. --format="- %s (%aN)")"
TODAY="$(date -u +%Y-%m-%d)"
echo -e "# $NEW_VERSION / $TODAY\n$NEW_COMMITS\n\n$(cat CHANGELOG.md)" > CHANGELOG.md

# Display publishing preview
for WORKSPACE in $PUBLISH_WORKSPACES
do
	npm publish --dry-run -w $WORKSPACE
done

# Commit everything
git checkout -b "tag-$NEW_VERSION"
git commit -am "Tag v$NEW_VERSION"
