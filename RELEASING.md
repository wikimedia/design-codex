# Releasing a new version of Codex

Publishing a new release of Codex requires these steps:

0. Review the latest changes and regression tests.
1. Prepare the release commit, submit for review, get it merged.
2. Create and publish the Git tag.
3. Publish the release to npm.
4. Pull the new versions into MediaWiki.
5. Update the Codex version in the LibraryUpgrader configuration.
6. Document and announce the new release.

## Prerequisites

Do the following before you conduct your first release:
- [Create an npm account](https://www.npmjs.com/signup), if you don't have one already.
- Verify that you can [log into your npm account](https://www.npmjs.com/login).
- Verify that you are [listed as a maintainer](https://www.npmjs.com/package/@wikimedia/codex/access)
  of the Codex package. If not, ask an existing maintainer to add you.
- Set up two-factor authentication (2FA) set up (required).
- Run `npm login` and follow the steps. You should only need to do this once on each computer.
  If you're not sure if you've already done this, run `npm whoami`; if it prints your npm username,
  you're already logged in.

---

## Step 0: Pre-release

### Planning

- Ensure someone will be around to review your release-related patches and merge them relatively
  quickly.
- Ensure any final patches that should be merged are merged. Consider waiting to merge last-minute
  patches until after the release to avoid introducing last-minute bugs.

### Regression tests

Check the [Codex UI regressions report](https://pixel.wmcloud.org/reports/codex/index.html) and
confirm that any failures are expected and related to merged patches.

---

## Step 1: Release commit

### Prepare and submit the release commit

1: Confirm you have no uncommitted changes and that you're on the latest version of the main branch:
```bash
git checkout main
git status
# This should output something like:
# On branch main
# Your branch is up to date with 'origin/main'.
# nothing to commit, working tree clean

git pull
```

2: Generate a diff of this release and review it for any unexpected changes:
```bash
./build/diff-release.sh
```

3: Run the `prepare-release.sh` script. This script takes the new version number as an argument:
```bash
./build/prepare-release.sh 1.2.34
```

The script creates a new branch, starts a commit to update the version number in the right places,
and adds the changes in that release to `CHANGELOG.md`.

4: Changes in `CHANGELOG.md` are automatically sorted based on commit prefixes, but may need to be
manually organized into the following categories: Features, Styles (includes tokens), Icons, Code,
Documentation. List any new design tokens.

For any deprecating or breaking changes, below the relevant commit message, add a bulleted list
describing the changes and how to handle them in a codebase that implements Codex:

```markdown
## Deprecating changes
- [DEPRECATING CHANGE] icons: Unify capitalization (Winston Sung)

This release renames `cdxIconWikiText` to `cdxIconWikitext`, and `cdxIconNoWikiText` to
`cdxIconNoWikitext`. The old names are deprecated, but can still be used.
```

5: Commit the changes locally with the appropriate version number:

```bash
git commit --all
```

This will prompt you for a commit message. Your commit message should look like this, Where `v1.2.34` is the new version number, and `T1234567` is the Phabricator task for the release:
```
Tag v1.2.34

Bug: T1234567
```

6: Submit this commit to Gerrit for review:
```bash
git review
```

### Get the Codex patch merged

Ask someone else to review the release commit in Gerrit and merge it. Ideally, this should happen
quickly, before any other changes are merged (if other changes are merged in the meantime, you
should regenerate the release commit). It's best to talk to a reviewer ahead of time to make sure
they're available to merge your release commit immediately after you submit it.

---

## Step 2: Publish the tag

1: Once the release commit is merged, pull it to your main branch:
```bash
git checkout main
git pull
git show --stat
# This should show the release commit
```

2: Create and publish the tag for the release:
```bash
git tag v1.2.34
git push --tags origin v1.2.34
```

---

## Step 3: Publish to npm

1: Build all the packages:
```bash
npm run build-all
```

2: Publish the packages one by one. Only the `@wikimedia/codex`, `@wikimedia/codex-design-tokens`,
and `@wikimedia/codex-icons` packages are published, the other packages are internal.
```bash
npm publish -w @wikimedia/codex --dry-run
# Check that the list of published files looks right.
npm publish -w @wikimedia/codex

npm publish -w @wikimedia/codex-design-tokens --dry-run
npm publish -w @wikimedia/codex-design-tokens

npm publish -w @wikimedia/codex-icons --dry-run
npm publish -w @wikimedia/codex-icons
```

---

## Step 4: Update MediaWiki

### Prepare your local repository

1: In MediaWiki core, pull down the latest version of `master`.
```bash
git checkout master
git pull
```

2: Install dependencies.
```bash
# For Docker, add `docker compose exec mediawiki` before this command.
php maintenance/run.php update
```

3: Create a feature branch to work on.
```bash
git checkout -b feature-branch
```

### Update Codex packages in MediaWiki

1: Edit `resources/lib/foreign-resources.yaml` and find the Codex section. It looks like this:
```yaml
codex:
  ...
  version: 1.2.33
  purl: pkg:npm/@wikimedia/codex@1.2.33
  type: tar
  src: https://registry.npmjs.org/@wikimedia/codex/-/codex-1.2.33.tgz
  integrity: sha512-wFjrN7mbwPG0P8F3pJiiT9w6s50UlGqz1badAdnvyfWfitkkz3Sa6rCcGsd8+vHHzd0qmONF3eRQ9qgZE0uDJA==
  dest:
    ...
```

2: Update the version number in the `version` and `purl` fields and in the `src` URL to the new
version number (e.g. `codex-1.2.34.tgz`).
```yaml
codex:
  ...
  version: 1.2.34
  purl: pkg:npm/@wikimedia/codex@1.2.34
  type: tar
  src: https://registry.npmjs.org/@wikimedia/codex/-/codex-1.2.34.tgz
  integrity: sha512-wFjrN7mbwPG0P8F3pJiiT9w6s50UlGqz1badAdnvyfWfitkkz3Sa6rCcGsd8+vHHzd0qmONF3eRQ9qgZE0uDJA==
  dest:
    ...
```

3: Get the new `integrity` value by running `make-sri`:
```bash
# For Docker, add `docker compose exec mediawiki` before this command
php maintenance/run.php manageForeignResources make-sri codex
# This will output an integrity hash that looks like this:
#    integrity: sha512-8lZ4swHLB9KtMsx6lYOfwqLZJAZ7mfY0jy+VZic6WRDpqQDSE4QgtYg9ptYAyFlkKDTXg72RAoN2yfq6lgzfUQ==
```

4: Copy this integrity hash to `foreign-resources.yaml`, replacing the old integrity hash.

5: Run the `update` command to update the library:
```bash
# For Docker, add `docker compose exec mediawiki` before this command
php maintenance/run.php manageForeignResources update codex
```

6: Verify that that updated the files for the library:
```bash
git status
# This should output something like:
# On branch master
# Your branch is up to date with 'origin/master'.
#
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git restore <file>..." to discard changes in working directory)
#	    modified:   resources/lib/codex/codex.js
#     modified:   resources/lib/codex/codex.style-rtl.css
#     modified:   resources/lib/codex/codex.style.css
#     modified:   resources/lib/codex/codex.umd.cjs
#     modified:   resources/lib/foreign-resources.yaml
```

7: Repeat these steps for `codex-design-tokens` and `codex-icons`.

8: Run the following command to update `foreign-resources.cdx.json`:
```bash
# For Docker, add `docker compose exec mediawiki` before this command
php maintenance/run.php manageForeignResources make-cdx
```

9: Update `package.json` with the latest version of the `codex` and `codex-icons` packages:
```bash
npm install @wikimedia/codex@1.2.34 @wikimedia/codex-icons@1.2.34 --save-dev --save-exact
```

### Edit release notes

Once all packages are updated, edit the `RELEASE-NOTES-1.NN` file in the root directory of the
MediaWiki repository. Make sure to edit the latest release notes.

If there is already a list item about Codex, update it. For example, if
there is a list item that says `Updated Codex from v1.2.28 to v1.2.33`, update the latter version
number to `v1.2.34`. If there isn't a list item about Codex yet, add one in the
`Changed external libraries` section.

### Add default design tokens

If any new design tokens have been introduced as part of the release, add them to `mediawiki.skin.defaults.less`. Example of a commit that adds new tokens: https://gerrit.wikimedia.org/r/c/mediawiki/core/+/907988/2/resources/src/mediawiki.less/mediawiki.skin.defaults.less.

### Generate bug list

Before committing your change, generate a list of bugs referenced by commits in the new release, so
that you can include it in the commit message. To generate this list, run the following command
*in the Codex repository* (not in the MediaWiki directory):
```bash
git log --pretty=format:%b v1.2.33..v1.2.34 | grep Bug: | sort | uniq
```

This command should output a series of lines that look like `Bug: T12345`. Copy this list to the
clipboard.

### Commit the changes

Go back to the MediaWiki repository, and commit your change:
```bash
git commit --all
```

This will prompt you for a commit message. Type `Update Codex from v1.2.33 to v1.2.34`, then leave
a blank line, then paste the list of bugs from the previous step. The full commit message should
look like this:
```
Update Codex from v1.2.33 to v1.2.34

Bug: T123
Bug: T456
Bug: T789
```

### Submit the change

Submit the commit to Gerrit:
```bash
git review
```

See https://gerrit.wikimedia.org/r/c/mediawiki/core/+/1155734 for an example change.

### Patch demo

Before merging the core patch, create a [Patchdemo](https://patchdemo.wmflabs.org/) to create a
MediaWiki instance based on the core patch:
- Add the MediaWiki core patch that updates the Codex version.
- Check "Proxy articles from wikipedia.org" to import content into your project. TypeaheadSearch
relies on content.
- Click the button "Create Demo". Patchdemo should take 2-3 minutes to generate the wiki instance.

Test TypeaheadSearch and any features affected by the Codex release.

### Get the patch merged

Once tests pass and the Patchdemo looks good, get a reviewer to merge the patch.

---

## Step 5: Update LibraryUpgrader

1: If you haven't already, clone the LibraryUpgrader config repo:
```bash
git clone ssh://git@gitlab.wikimedia.org/repos/ci-tools/libup-config.git
```

2: Edit the `releases.json` file in that repository. Search for `codex`, and you should find this:
```json
            "@wikimedia/codex": {
                "to": "1.2.33",
                "weight": 10
            },
            "@wikimedia/codex-design-tokens": {
                "to": "1.2.33",
                "weight": 10
            },
            "@wikimedia/codex-icons": {
                "to": "1.2.33",
                "weight": 10
            }
```

3: Change each of the version numbers in the `"to":` fields to the new version number.

4: Commit the change:
```bash
git checkout -b codex-1.2.34
git commit --all
```

Your commit message should look like this:
```
releases: Bump Codex to 1.2.34

Bug: T123456
```

5: Submit it to GitLab:
```bash
git push origin codex-1.2.34
```

6: Open a merge request in GitLab and assign a reviewer.

---

## Step 6: Document and announce

Once the MediaWiki core patch has been merged, announce the new release to Codex stakeholders.

Currently, we only announce releases internally, in WMF Slack. Make a post in the
#talk-to-design-system-team channel announcing the new version number and listing out the following:
- Notable new features: list any new features you think Codex users should know about.
- Notable bug fixes: Highlight bug tasks resolved by the new release.
- Be sure to @mention and thank any contributors to the release from outside the Design System Team.

### Close tasks

Close all tasks included in the release. These should be in the Pending Release column of the
[Codex workboard](https://phabricator.wikimedia.org/tag/codex/).

Complete the checklist in the release task and close it as well.
