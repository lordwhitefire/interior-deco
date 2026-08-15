# Working Rule — Implementation Specs and Design Plans

## The rule

Every time the user provides an implementation `.md` file (a spec), do this automatically:

1. Read the spec file.
2. Write a design plan `.md` file in the project root, named after the page, e.g. `SERVICES-DESIGN.md`, `CONTACT-DESIGN.md`.
3. Stop and wait for the user to say "go" before writing any code.

The user should never have to ask for the plan to be written.

## What goes in the design plan

- Source-of-truth file path.
- Goal (one sentence).
- User decisions (explicitly listed).
- Files to change (table: file, change).
- Page structure (simple outline).
- Image mapping (table), with notes on what needs visual confirmation.
- Verification steps.

## Tone rules

- Simple, not complex.
- Not ambiguous — state decisions clearly.
- Comprehensive — cover everything needed to implement.
- No fluff, no long explanations.
