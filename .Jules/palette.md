## 2026-07-03 - FontAwesome Icon Decorative Hiding

**Learning:** FontAwesome icons are heavily used in the studio layout for visual decoration, but screen readers attempt to parse them if not hidden.
**Action:** Always add `aria-hidden="true"` to purely decorative `<i>` tags in HTML structures to prevent cognitive overload for screen reader users.

## 2026-07-03 - Keyboard Navigation Focus

**Learning:** Interactive elements in custom styled sidebars often lose default browser focus outlines.
**Action:** Always verify keyboard focus states and add `:focus-visible` styling (with high contrast) to ensure interactive elements are navigable without a mouse.
