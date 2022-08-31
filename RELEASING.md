# Releasing a new version of Codex
To publish a new release of Codex, follow these steps:
- Prepare the release commit
- Submit the release commit to Gerrit, and ask someone to merge it
- Once merged, create and publish the tag
- Publish the release to NPM
- Update the Codex version in MediaWiki
- Update the Codex version in the LibraryUpgrader configuration

## First time doing a release
- [Create an NPM account](https://www.npmjs.com/signup), if you don't have one already
- Verify that you can [log into your NPM account](https://www.npmjs.com/login)
- Verify that you are [listed as a maintainer](https://www.npmjs.com/package/@wikimedia/codex/access)
  of the Codex package. If not, ask an existing maintainer to add you.
- Make sure that you have two-factor authentication (2FA) set up.
  2FA is required to publish Codex packages.
- Run `npm login` and follow the steps. You should only need to do this once on each computer.
  If you're not sure if you've already done this, you can run `npm whoami`; if it prints your
  NPM username, you're already logged in.

## Preparing and submitting the release commit
First, make sure that you have no uncommitted changes, and that you're on the latest version
of the main branch:
```
$ git checkout main
$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
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

For any breaking changes, below the commit message, add a bulleted list describing the changes and
how to handle them in a codebase that implements Codex:

```
## Breaking changes
- [BREAKING CHANGE] Fix inconsistencies across components with menu items (Simone This Dot)
  - Combobox, Lookup, Select: `modelValue` prop is now `selected`; use `v-model:selected` to bind
    the selected value to the component and listen for `updated:selected` events
  - Lookup: `menuItems` is now a required prop
  - TypeaheadSearch:  `searchResults` is now a required prop
  - Lookup, TypeaheadSearch: `new-input` event name has been changed to `input`
```

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

## Publishing the tag
Once the release commit is merged, pull it into your main branch, and verify that it is the latest
commit:
```
$ git checkout main
$ git pull
$ git show --stat
# This should show the release commit
```
(If it is not the latest commit, you should copy the hash of the merged commit from Gerrit, and
run `git checkout 123abc`, replacing `123abc` with the copied hash. If you're not very comfortable
with Git, feel free to ask for help with this step.)

Create and publish the tag for the release:
```
$ git tag v1.2.34
$ git push --tags origin v1.2.34
```

## Publishing to NPM
Then build all the packages, and publish them one by one. Only the `@wikimedia/codex`,
`@wikimedia/codex-icons`, and `@wikimedia/codex-search` packages are published, the other packages
are internal.
```
$ npm run build-all

$ npm publish -w @wikimedia/codex --dry-run
# Check that the list of published files looks right
$ npm publish -w @wikimedia/codex

$ npm publish -w @wikimedia/codex-icons --dry-run
$ npm publish -w @wikimedia/codex-icons

$ npm publish -w @wikimedia/codex-search --dry-run
$ npm publish -w @wikimedia/codex-search
```

## Updating MediaWiki
Once the NPM packages are published, you need to update MediaWiki core to point to the newly
published version. This involves the following steps:
- For each package (`codex`, `codex-icons` and `codex-search`):
  - Update the `src` URL in `foreign-resources.yaml`
  - Run `manageForeignResources.php make-sri` to get the new integrity hash
  - Update the integrity hash in `foreign-resources.yaml`
  - Run `manageForeignResources.php update` to update the library
- Update the `RELEASE-NOTES` file
- Generate the list of bugs for the commit message
- Submit your changes
See https://gerrit.wikimedia.org/r/c/mediawiki/core/+/791651 for an example change. Detailed
instructions follow below.

Edit the `resources/lib/foreign-resources.yaml`, and find the Codex section. It looks like this:
```
codex:
  type: tar
  src: https://registry.npmjs.org/@wikimedia/codex/-/codex-1.2.33.tgz
  integrity: sha512-wFjrN7mbwPG0P8F3pJiiT9w6s50UlGqz1badAdnvyfWfitkkz3Sa6rCcGsd8+vHHzd0qmONF3eRQ9qgZE0uDJA==
  dest:
    ...
```
Update the version number in the URL to the new version number (e.g. `codex-1.2.34.tgz`).
Then get the new integrity value by running the `make-sri` command:
```
$ php maintenance/manageForeignResources.php make-sri codex
... checking 'codex'
Integrity for https://registry.npmjs.org/@wikimedia/codex/-/codex-1.2.34.tgz
	integrity: sha512-8lZ4swHLB9KtMsx6lYOfwqLZJAZ7mfY0jy+VZic6WRDpqQDSE4QgtYg9ptYAyFlkKDTXg72RAoN2yfq6lgzfUQ==
```
Copy this integrity hash to `foreign-resources.yaml`, replacing the old integrity hash.
Then run the `update` command to update the library:
```
$ php maintenance/manageForeignResources.php update codex
... updating 'codex'

Done!
```
And verify that that updated the files for the library:
```
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   resources/lib/codex/codex.es.js
	modified:   resources/lib/codex/codex.style-rtl.css
	modified:   resources/lib/codex/codex.style.css
	modified:   resources/lib/codex/codex.umd.js
	modified:   resources/lib/foreign-resources.yaml
```
Then repeat these steps for `codex-icons` and `codex-search`.

Once all packages are updated, edit the `RELEASE-NOTES-1.NN` file in the root directory of the
MediaWiki repository. If there is already a list item about Codex, update it. For example, if
there is a list item that says `Updated Codex from v1.2.28 to v1.2.33`, update the latter version
number to `v1.2.34`. If there isn't a list item about Codex yet, add one in the
`Changed external libraries` section.

As the final step before committing your change, generate the list of bugs referenced by commits in
the new release, so that you can include it in the commit message. To generate this list, run the
following command *in the Codex repository* (not in the MediaWiki directory):
```
git log --pretty=format:%b v1.2.33..v1.2.34 | grep Bug: | sort | uniq
```
This command should output a series of lines that look like `Bug: T12345`. Copy this list to the
clipboard.

Then go back to the MediaWiki repository, and commit your change:
```
$ git commit -a
```
This will prompt you for a commit message. Type `Update Codex from v1.2.33 to v1.2.34`, then leave
a blank line, then paste the list of bugs from the preevious step. The full commit message should
look like this:
```
Update Codex from v1.2.33 to v1.2.34

Bug: T123
Bug: T456
Bug: T789
```

Finally, submit the commit to Gerrit:
```
$ git review
```

## Updating LibraryUpgrader
You also need to configure LibraryUpgrader to automatically update the repositories it manages to
the new Codex version.

If you haven't already, clone the LibraryUpgrader config repo:
```
$ git clone ssh://gerrit.wikimedia.org:29418/labs/libraryupgrader/config
```

Edit the `releases.json` file in that repository. Search for `codex`, and you should find this:
```
            "@wikimedia/codex": {
                "to": "1.2.33",
                "weight": 10
            },
            "@wikimedia/codex-icons": {
                "to": "1.2.33",
                "weight": 10
            },
            "@wikimedia/codex-search": {
                "to": "1.2.33",
                "weight": 10
            }
```
Change each of the version numbers in the `"to":` fields to the new version number.

Then commit your change and submit it to Gerrit:
```
$ git commit -am "releases: Bump Codex to 1.2.34"
$ git review
```