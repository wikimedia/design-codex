# Breaking changes

This file describes how to handle breaking changes in Codex. With this process, we aim to provide
Codex users with a predictable and trustworthy API and a consistent change management process.

## About breaking changes

### What are breaking changes?

A breaking change is one that is incompatible with the current public API and will cause code using
Codex to break. Breakage usually refers to an error but could also be a significant, disruptive, or
unexpected visual or user experience change. Examples:
- A change to an existing component prop that will cause code using the component to break if that
  code is not updated accordingly (e.g. removal of a prop).
- A change to a design token that will cause certain usages to break if they are not updated
  accordingly. This could be an error (e.g. the token must now be used with the CSS `calc()`
  function or the Less compiler will fail) or a significant and disruptive visual change (e.g. the
  page title will appear squished and overlap its container until a different line height token is
  used).
- Removal of a component (e.g. moving TypeaheadSearch from Codex to MediaWiki core).

### Identifying breaking changes

Opting to make a breaking change should be a carefully considered decision. Users of Codex must
review and update their code to account for each breaking change, so breaking changes should be
limited as much as possible. Breaking changes should either introduce new and useful features to
Codex users or fix existing inconsistencies or problems.

When a breaking change is identified and considered worthwhile, this breaking changes process should
commence.

## Deprecating changes

Before a breaking change is made, a deprecating change should be strongly considered. Making a
deprecating change is a helpful way to inform Codex users of an impending breaking change and gives
them time to update their code.

A deprecating change does the following:
- Introduces the new desired functionality, if applicable.
- Continues to support the old functionality for now.
- Throws a warning when the old functionality is used.
- Instructs developers on how to update their code to be compatible with the future breaking change.

### Examples

- [types: Generalize dialog action types](https://gerrit.wikimedia.org/r/c/design/codex/+/1122162):
  This change copied and renamed some existing TypeScript types while continuing to support the
  existing types, with deprecations noted in the docs.
- [Message: Add useI18n and update dismissButtonLabel prop](https://gerrit.wikimedia.org/r/c/design/codex/+/1049569)
  was technically a deprecating change but was not properly documented with "[DEPRECATING CHANGE]"
  in the commit message, nor a deprecation warning in the console for the old prop API. The latter
  was added in a [later patch](https://gerrit.wikimedia.org/r/c/design/codex/+/1159482).

### Announcing deprecating changes

When a deprecating change is included in a release, it must be noted in the CHANGELOG.md and should
be announced, along with information for developers on how to update their code, on the
[Wikitech-l](https://lists.wikimedia.org/postorius/lists/wikitech-l.lists.wikimedia.org/?language=en)
mailing list.

## Releasing breaking changes

Breaking changes must be made as part of a major version release (like going from v1.x.y to v2.0.0)
according to [semantic versioning](https://semver.org/). Grouping together multiple breaking changes
in a single major version bump can be a helpful way to reduce overhead, but it can also make rollout
and testing more complicated.

### Versioning

Consider using release candidates to introduce the breaking changes and fix any bugs that come up
before publishing the official new major version. For example, before Codex v2.0.0 was published, we
released v2.0.0-rc.1 and v2.0.0-rc.2.

### Planning

During the planning phase:
- Determine when the breaking changes will be made, released, and rolled out in MediaWiki.
- Inform Codex users of the timeline to ensure they can make any necessary changes in their
  codebases before the major version bump.
- Consider creating a guide to breaking changes like
  https://www.mediawiki.org/wiki/Codex/Release_Timeline/2.0/Breaking_changes.
- Determine a plan for rolling out the changes. Will there be any patches that depend on the
  breaking change? What will need to be tested and who will do that testing? Is this a
  [risky change](https://wikitech.wikimedia.org/wiki/Deployments/Risky_change_template)?
- Determine a plan for rolling back the changes if needed. Can the changes be rolled out
  incrementally to reduce their impact and make a rollback more feasible? What circumstances will
  justify a rollback versus patch fixes?

The rollout plan might look like this:
- Week 1: Open and merge patches to make the breaking changes in Codex.
- Week 2: Publish the first release candidate on Tuesday. Test on beta cluster.
- Week 3: Test the first release candidate as it rides the deployment train. If needed, make
  changes in Codex to fix bugs.
- Week 4: If more testing is needed, release the second release candidate. Otherwise, release the
  official new major version.

### Testing

As noted in the example rollout plan, there are several opportunities for testing:
- Testing the breaking changes in Codex locally and via [patchdemo](https://patchdemo.wmcloud.org/).
- Testing the core patch with the new version of Codex in patchdemo.
- Testing in the beta cluster once the core patch is merged (refer to https://meta.wikimedia.org/wiki/Wikimedia_wikis#Test_wikis).
- Testing on group 0, 1, and 2 production wikis as the core patch rides the deployment train (refer
  to https://wikitech.wikimedia.org/wiki/Deployments/Train#Groups).

Plan out what, where, and when you will test depending on the features that may be affected by the
breaking change(s).

### Releasing

During the release:
- Only include the breaking changes to minimize the potential for unexpected issues. Even small
unrelated changes can have an impact that could derail the release.
- Document the breaking changes in the CHANGELOG.md. Below the commit message, add a bulleted list
  describing the changes and how to handle them in a codebase that implements Codex:

```markdown
## Breaking changes
- [BREAKING CHANGE] Fix inconsistencies across components with menu items (Simone This Dot)
  - Combobox, Lookup, Select: `modelValue` prop is now `selected`; use `v-model:selected` to bind
    the selected value to the component and listen for `updated:selected` events
  - Lookup: `menuItems` is now a required prop
  - TypeaheadSearch:  `searchResults` is now a required prop
  - Lookup, TypeaheadSearch: `new-input` event name has been changed to `input`
```

#### npm tag

When publishing the new packages to npm, use the `--tag` option to set the tag to `next` instead of
the default, `latest`: `git --tag next`. This will ensure that Codex users won't get the
experimental release candidate, only the new version once it's stable.
Refer to https://docs.npmjs.com/cli/v11/commands/npm-publish#tag.

### Announcing

Consider announcing on Wikitech-l when the first release candidate is rolled out in MediaWiki core,
and when the final, stable version is published. Include instructions for updating code to comply
with the new version as a reminder.
