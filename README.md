# OS Midterm Trainer

An adaptive, browser-based study site for the Operating Systems midterm topics used in the AITU course.

**Live site:** <https://klamsii.github.io/os-midterm-trainer/>

## What is included

- 20 independently selectable exam variants with different question orders
- 25 English questions per variant, 500 unique statements, and five distinct exam formulations for every tested skill
- explanations in Kazakh, Russian, and English; Kazakh is selected by default
- saved attempts, topic accuracy, repeated-error detection, and a recommended next step
- a multilingual study library covering Bash, hardware, devices, disks, and kernel modules
- no account, backend, tracking, or paid service; progress stays in the browser through `localStorage`

## Evidence used for the syllabus

The blueprint follows the supplied real midterm sample, the uploaded NetAcad material, Assignment 4 topics, and the official Linux Essentials objectives. The bank emphasizes Bash scripting, command-line parameters, exit statuses, conditions, loops, architecture, memory, buses, `/dev`, partitions, mounting, and kernel modules.

The practice questions are newly written. They imitate the tested concepts and common distractors instead of copying a commercial question bank. Exact question statements do not repeat across variants, while the underlying skills recur so progress can be measured.

## Run locally

```bash
npm test
npm run serve
```

Open <http://localhost:4173>.

## Publish with GitHub Pages

Push the project to a public GitHub repository named `os-midterm-trainer`. The included Pages workflow publishes the static site from the `main` branch. In repository settings, choose **GitHub Actions** as the Pages source if it is not selected automatically.

## Limits

The site is designed to match the strongest evidence available, but no practice bank can guarantee the exact questions chosen by an instructor. The useful measure is whether the learner can explain why an answer is correct, not whether the wording looks familiar.
