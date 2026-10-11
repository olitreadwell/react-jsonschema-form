# rjsf-team/react-jsonschema-form context
> refreshed 2026-10-11 | upstream default: main @ 1280ca7fc7995a234c14a873f6cee961118f96c2

## Identity & policies
- upstream: `rjsf-team/react-jsonschema-form`, default branch `main`, primary language TypeScript/React, English-first (yes — CONTRIBUTING and docs are English-only). Active: pushed 2026-10-11, 15.9k stars, 158 open issues.
- CLA/DCO: none seen (CONTRIBUTING.md asks only for adherence to the Code of Conduct; no CLA bot or DCO sign-off on PRs)
- AI-assisted PR policy: unstated (no AI/LLM/generated/Copilot wording in `CONTRIBUTING.md`, `PULL_REQUEST_TEMPLATE.md`, or `CODE_OF_CONDUCT.md`; `rjsf-team/.github` returns 404). A repo-root `CLAUDE.md` documents build/test commands for coding agents — tooling guidance, not a policy on AI-authored PRs.
- signed commits required: no (no `required_signatures` branch protection seen; fork PRs merge unsigned)
- PR template: `PULL_REQUEST_TEMPLATE.md` at the repo root (sections "Reasons for making this change" and "Checklist"). Fill it verbatim.
- external tracker: GitHub issues only

## Conventions (verified from merged PRs)
- branch naming: mixed — bare `fix-<issue>` (e.g. `fix-5318`, `fix-5332`, `fix-5333`), `fix/<slug>` (e.g. `fix/ref-keyword-property-crash`), `chore/<slug>` (`chore/lint-*`) and `chore-<slug>` (`chore-cs-check-ci`). Bare `fix-<issue>` is fine when a PR fixes one issue.
- commit style: plain imperative, issue-first subject ("Fix 5388: ..."); Conventional Commits prefixes used on many recent PRs (`fix(utils): ...`, `chore: ...`, `docs: ...`). Match the neighbouring commits.
- test command: `pnpm test` (nx run-many across 18 projects); one package with `pnpm --filter @rjsf/<pkg> run test`; snapshot update with `pnpm run test:update`.
- lint/typecheck/format: `pnpm run lint`, `pnpm run typecheck`, `pnpm run cs-check`; CI also runs `knip` and build.
- CI that gates merge (`.github/workflows/ci.yml`, PRs to `main`): `pnpm install --frozen-lockfile` then `pnpm run lint`, `knip` (22.x only), `pnpm run build-serial` twice (once with `VITE_SHOW_NETLIFY_BADGE`), `pnpm run typecheck`, `pnpm test`, on Node 20.x/22.x/24.x. Deploy runs only on `main`.
- how outside PRs merge: active maintainers merge external fix PRs quickly (hours to a few days; several external fixes merged within a day, e.g. #5369, #5362, #5354, #5459).

## Maintainer picture
- heath-freenome — most active (fix PRs + reviews, often same day); owned #5464, #5469-adjacent fixes and the `chore/lint-*` series.
- jimmycallin — very active in Oct 2026, merging/linting reworks (#5470, #5471, #5481, #5482) and form-store work (#5438).
- epicfaace (Jimmy) — long-time maintainer, reviews and merges.
- In motion (Oct 2026): v7 line, React Compiler lint rules, `experiment/form-model-store` (#5438), schema-identity perf (#5481), anyOf/oneOf label work (#5484, #5486). Avoid rebasing unrelated work onto those.

## Issue-area health
- CheckboxWidget `required` attribute: #5388 open, 0 comments, label `bug` (updated 2026-10-02). The report is against `v7`; on `main` core, antd, chakra-ui, daisyui, primereact and shadcn still pass the raw `required` to the input (see gap ledger).
- Open PR backlog was light earlier in the year but is now ~25 open PRs (Oct 2026), many maintainer-authored; expect review to lag a little behind the daily merge activity.
- Good area for a drive-by: docs (`packages/docs/docs/**`) has had no maintainer churn since the v6 changes, so small verified doc fixes do not conflict with in-flight work.

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-09-30` issue #5388 (CheckboxWidget renders HTML `required` on a required boolean field, blocking a valid `false` submit) — pr-opened https://github.com/olitreadwell/react-jsonschema-form/pull/39 (fork-internal, base `main`, commit 4167b6bd5, fork CI green on 20.x/22.x/24.x) — fix: pass `trueValueRequired` instead of the raw `required` to the input in core/antd/chakra-ui/daisyui/primereact/shadcn, plus shared-form-test coverage for the `false`-valid and `true`-only cases. Lesson: the issue was filed against `v7`, so re-check the target branch's own code (`main` still carried the bug in daisyui and primereact).
- `2026-10-11` self-found trivial pass (typos + dead links in current docs and two comments) — pr-opened https://github.com/olitreadwell/react-jsonschema-form/pull/40 (fork-internal, base `main`, branch `chore/docs-typos-and-dead-links`) — 12 one-line meaning-preserving fixes in 10 files: `ui:ArrayFieldItemButonsTemplate` -> `...ButtonsTemplate`, `explicity`/`explicitely` -> `explicitly` (utility-functions.md, orderProperties.ts jsdoc, daisyui README), `sematic-ui-react` -> `semantic-ui-react`, `funciton` -> `function`, `cirle` -> `circle`, `botttom` -> `bottom`, `supercedes` -> `supersedes` (DemoFrame.tsx comment), `http://json-schema.org/documentation.html` (404) -> `https://json-schema.org/`, `tree/main/packages/material-ui` (404) -> `tree/main/packages/mui` (both replacements curl-verified 200). Lesson: two "typos" in the v6 guide are deliberate and must NOT be fixed — `RJSF_ADDITONAL_PROPERTIES_FLAG` is the removed constant being named, and `defaultSupercedesUndefined` is the real API option; the versioned_docs copies carry the same misspellings but are frozen release snapshots and were left alone.

## Mined gaps (discovered, not yet attempted)
- `2026-10-11` `packages/semantic-ui/src/TitleField/TitleField.tsx:32` renders `<Grid colums={2}>` — `colums` is not a Semantic UI React `Grid` prop (it is `columns`), so the two-column layout likely never applies. Needs a rendered-output check first: the fix changes layout, so it is a bug fix, not a trivial typo.
- `2026-10-11` `json-schema.org/documentation.html` still 404s in `packages/docs/versioned_docs/version-{3.2.1,4.2.3,5.24.10}/advanced-customization/internals.md`, and `explicity`/`botttom`/`overriden`/`alls` remain in those versioned snapshots. Frozen docs, so only pick this up if maintainers say versioned docs should be corrected.
