# rjsf-team/react-jsonschema-form context
> refreshed 2026-09-30 | upstream default: main @ ad0ea07428f8

## Identity & policies
- upstream: `rjsf-team/react-jsonschema-form`, default branch `main`, primary language TypeScript/React, English-first (yes — CONTRIBUTING and docs are English-only)
- CLA/DCO: none seen (CONTRIBUTING.md asks only for adherence to the Code of Conduct; no CLA bot or DCO sign-off on PRs)
- AI-assisted PR policy: unstated (no AI/LLM/generated/Copilot wording in `CONTRIBUTING.md`, `PULL_REQUEST_TEMPLATE.md`, or `CODE_OF_CONDUCT.md`; `rjsf-team/.github` returns 404). A repo-root `CLAUDE.md` documents build/test commands for coding agents — tooling guidance, not a policy on AI-authored PRs.
- signed commits required: no (no `required_signatures` branch protection seen; fork PRs merge unsigned)
- PR template: `PULL_REQUEST_TEMPLATE.md` at the repo root (sections "Reasons for making this change" and "Checklist"). Fill it verbatim.
- external tracker: GitHub issues only

## Conventions (verified from merged PRs)
- branch naming: mixed — bare `fix-<issue>` (e.g. `fix-5318`, `fix-5332`, `fix-5333`) and `fix/<slug>` (e.g. `fix/resolve-condition-falsy-formdata`), plus `chore/<slug>` for maintenance. Bare `fix-<issue>` is fine when a PR fixes one issue.
- commit style: plain imperative, issue-first subject ("Fix 5388: ..."); no Conventional Commits prefix on fix PRs (chore PRs use `chore:`).
- test command: `pnpm test` (nx run-many across 17 projects); one package with `cd packages/<pkg> && pnpm test`; snapshot update with `pnpm run test:update` or `cd packages/<pkg> && npx vitest run -u`.
- lint/typecheck/format: `pnpm run lint`, `pnpm run typecheck`, `pnpm run cs-check`; CI also runs `knip` and build.
- how outside PRs merge: active maintainers merge external fix PRs quickly (hours to a few days; several external fixes merged within a day, e.g. #5369, #5362, #5354).

## Maintainer picture
- heath-freenome — authored #5388, very active (files and reviews fixes, often same day).
- epicfaace (Jimmy) — long-time maintainer, reviews and merges.
- In motion: a large React Compiler lint-rule series (`chore/lint-*`, #5380–#5387) and the 6.11.0 -> v7 merge (#5376). Avoid rebasing unrelated work onto those.

## Issue-area health
- CheckboxWidget `required` attribute: #5388 open, unassigned, 0 comments, label `needs triage` (updated 2026-09-29). The report is against `v7` and names core plus antd/chakra-ui/shadcn, noting daisyui was fixed there in #5356; on `main` core, antd, chakra-ui, daisyui, primereact and shadcn still pass the raw `required` to the input.
- No maintainer claims #5388 and no PR references it (open, closed, or merged) apart from #5356, which is unrelated (daisyui label rendering).

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-09-30` issue #5388 (CheckboxWidget renders HTML `required` on a required boolean field, blocking a valid `false` submit) — pr-opened https://github.com/olitreadwell/react-jsonschema-form/pull/39 (fork-internal, base `main`, commit 4167b6bd5, fork CI green on 20.x/22.x/24.x) — fix: pass `trueValueRequired` instead of the raw `required` to the input in core/antd/chakra-ui/daisyui/primereact/shadcn, plus shared-form-test coverage for the `false`-valid and `true`-only cases. Lesson: the issue was filed against `v7`, so re-check the target branch's own code (`main` still carried the bug in daisyui and primereact).

## Mined gaps (discovered, not yet attempted)
- none yet
