# Implementation plan

## 1. Evidence and scope

1. Extract the concepts and distractor patterns from the supplied 25-question midterm sample.
2. Map those concepts to the uploaded NetAcad material and Assignment 4 chapters: **Understanding Computer Hardware** and **Turning Commands into a Script**.
3. Verify definitions and command behavior against primary documentation: GNU Bash, Linux manual pages, kernel device documentation, and Linux Essentials objectives.
4. Give the highest question weight to concepts that occur in both the real sample and the course material.

## 2. Site architecture

1. **Dashboard:** progress, accuracy, weak topic, recommended next action, and direct access to every variant.
2. **Exam runner:** one English question at a time, answer navigation, timer, saved unfinished work, and deliberate final submission.
3. **Results:** score, topic breakdown, every selected answer, the correct answer, and a localized explanation.
4. **Study library:** short chapters in Kazakh, Russian, and English with commands and examples.
5. **Analytics:** accuracy by topic, repeated mistakes, and a targeted study recommendation.
6. Store all learning data locally so the static GitHub Pages site works without a server.

## 3. Variant construction

1. Use a fixed blueprint of 25 tested concepts for balanced coverage rather than random topic selection.
2. Generate 20 distinct scenarios from unique filenames, directories, devices, variables, values, and command contexts.
3. Write every question in English and keep the assessment language fixed.
4. Provide a full explanation for every answer in Kazakh, Russian, and English; select Kazakh by default.
5. Build distractors from realistic mistakes: `$0` versus `$1`, `0` versus `1` exit status, `/dev` versus `/etc`, `lsusb` versus `lspci`, and `lsmod` versus `modprobe`.
6. Rotate answer positions deterministically so answer length or letter position does not reveal the answer.
7. Validate that all 500 question texts and IDs are unique, every answer appears among four unique choices, and all translations exist.

## 4. Adaptive behavior

1. Save each answer and attempt in `localStorage`.
2. Calculate accuracy by topic and by concept across all completed variants.
3. Identify the weakest topic and repeated wrong concepts.
4. Recommend the relevant library chapter and the next unfinished variant.
5. Keep all variants available so the learner can continue in order or jump directly to any variant.

## 5. Quality and deployment

1. Run automated content-integrity tests.
2. Test desktop and narrow-screen layouts in a real browser.
3. Verify the language switch, exam navigation, results, saved progress, and analytics.
4. Publish the static project through GitHub Actions to GitHub Pages.
