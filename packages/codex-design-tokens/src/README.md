# Design Token Organization

* **`themes`** Each file in the `themes` directory represents the option tokens
  (i.e. the complete universe of possible token values) for a given theme. Right
  now Codex only supports a single theme, `wikimedia-ui`, but in the future
  additional themes may be defined here.
* **`application.json`** The main definition of all user-facing design tokens can
  be found here. This file defines all of the decision tokens which Codex
  components may need to rely on. Token names in this file are semantic and
  should reference the option tokens from a particular theme.
* **`modes`** Modes define variants within a given theme by overriding specific
  token values.
* **`components.json`**: Component-specific tokens. These tokens should only reference
  tokens found in `application.json` to ensure that they are not theme- or mode-
  dependent.