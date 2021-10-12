---
sidebarDepth: 3
---

# About

Codex is a toolkit for building user interfaces within the Wikimedia Design System. Codex contains
two packages:

- **Design tokens**: for writing styles consistent with the [Wikimedia Design Style Guide](https://design.wikimedia.org/style-guide/components/links.html) 
- **Vue 3 components**: for building usable, accessible, translatable [Vue 3](https://v3.vuejs.org/) applications

Codex features:
- Wide-ranging support for internationalization and global usage
- Web accessibility baked in
- Comprehensive browser and device support

Read our [guiding principles](#guiding-principles) for details.

## Usage and contributions

Visit [getting started](/introduction/getting-started) to learn how to use this library.

If you'd like to contribute, head over to the [contributing section](/contributing/guidelines) to
learn about ways you can contribute, our processes, and how to develop this library.

## Maintainers

Codex is maintained by the Design Systems Team of the Wikimedia Foundation. It is designed and
developed by contributors from the Wikimedia Foundation, Wikimedia Deutschland, and the Wikimedia
volunteer community.

To contact us or to learn more about current and future work, visit our [task tracking board](https://phabricator.wikimedia.org/project/board/5587/) or the [Design Systems Team page](https://www.mediawiki.org/wiki/Design_Systems_Team) on mediawiki.org.

## Guiding principles

### Who we're serving

#### Set high accessibility, internationalization, and browser/device coverage standards

Wikimedia intends to serve everyone. We will follow [Wikimedia's accessibility principles](https://design.wikimedia.org/style-guide/design-principles_accessibility.html) and aim to support many languages.

We will adhere to MediaWiki's [browser support matrix](https://www.mediawiki.org/wiki/Compatibility#Browsers).
Components should be thoughtfully designed and developed to work across device widths.

#### Designed and built for the wider MediaWiki ecosystem

We intend to serve those working both within MediaWiki (core, skins, and extensions) and in the
wider ecosystem, including web-based tools, static web applications, Jamstack applications, and
some of our mobile apps. Platform-agnosticism will enable us to use this library as we continue
expanding this ecosystem.

To keep our code flexible, we will aim to avoid entirely MediaWiki-specific components. When they
can't be avoided, we will clearly denote and separate out the MediaWiki-specific parts.

#### Prioritize developer experience of library users

We want to make building user interfaces straightforward, fast, and enjoyable. We aim to serve users
of varying experience levels and to reduce barriers to onboarding new users. When possible, we will
prefer to house complexity in the library code rather than exposing it to the library user.

### Collaboration principles

#### Transparency

We work in the open and aim to provide consumers as much information as possible about what we're
working on and how we're prioritizing that work.

#### Enable rather than enforce

The Codex maintainers welcome contributions from everyone and wish to collaboratively build
resources to enable others to easily contribute to the library.

#### Knowledge sharing rather than knowledge silos

Contributors should have support and access to resources that allow them to understand and influence
the system's workflows, methodologies, standards, and infrastructure.

### Code design patterns

#### Composition over complexity

Smaller components are easier to understand and more reusable.
    
#### Clarity over brevity

It's better for code to be easily understandable than to be as short or as clever as possible.

#### Use existing patterns

Sticking to patterns established in the wider front-end community enables more people to contribute.
Following consistent patterns within the library makes the code easier to write, review, and
maintain.

#### Keep the template simple

The template within [single file Vue components (SFCs)](https://v3.vuejs.org/guide/single-file-component.html#introduction)
can be a tool to clearly illustrate what a component is and does. Consider moving everything but the
most basic JavaScript code to the `<script>`.
