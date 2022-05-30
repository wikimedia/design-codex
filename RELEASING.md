# Releasing a new version of Codex
To publish a new release of Codex, follow these steps:
- Prepare the release commit
- Submit the release commit to Gerrit, and ask someone to merge it
- Once merged, create and publish the tag
- Then publish the release to NPM

## Preparing and submitting the release commit
First, make sure that you have no uncommitted changes, and that you're on the latest version
of the main branch:
```
$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
$ git checkout master
$ git pull
Already up to date
```

To prepare the release commit, run the `prepare-release.sh` script. This script takes the new
version number as an argument:
```
$ ./build/prepare-release.sh 1.2.34
```

The script starts a commit to update the version number in the right places, and add the
changes in that release to `CHANGELOG.md`. Those changes then need to be manually
organized following the conventions documented in
[contributing code](https://doc.wikimedia.org/codex/main/contributing/contributing-code.html#patch-requirements).

Once organized, commit the changes locally with the appropriate version number:
```
$ git commit -am "Tag v1.2.34"
```

Then, submit this commit to Gerrit for review:
```
$ git review
```

Ask someone else to review the release commit in Gerrit and merge it. Ideally, this should happen
quickly, before any other changes are merged (if other changes are merged in the meantime, you
should regenerate the release commit). It's best to talk to a reviewer ahead of time to make sure
they're available to merge your release commit immediately after you submit it.

## After the release commit is merged
Once the release commit is merged, pull it into your main branch, and verify that it is the latest
commit:
```
$ git checkout main
$ git pull
$ git show --stat
# This should show the release commit
```
(If it is not the latest commit, you should copy the hash of the merged commit from Gerrit, and
run `git checkout THAT_HASH`. If you're not very comfortable with git, feel free to ask for help
with this step.)

Create and publish the tag for the release:
```
$ git tag v1.2.34
$ git push --tags origin v1.2.34
```

Then build all the packages, and publish them one by one. Only the `@wikimedia/codex` and
`@wikimedia/codex-icons` packages are published, the other packages are internal.
```
$ npm run build-all

$ npm publish -w @wikimedia/codex --dry-run
# Check that the list of published files looks right
$ npm publish -w @wikimedia/codex

$ npm publish -w @wikimedia/codex-icons --dry-run
$ npm publish -w @wikimedia/codex-icons
```
