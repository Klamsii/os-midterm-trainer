import assert from "node:assert/strict";
import { BOOKS, SOURCES, TOPICS, buildVariants } from "../js/content.js";

const variants = buildVariants();
const questions = variants.flatMap((variant) => variant.questions);
const questionTexts = questions.map((question) => question.question.trim().toLowerCase());
const questionIds = questions.map((question) => question.id);
const expectedLanguages = ["kk", "ru", "en"];

assert.equal(variants.length, 20, "There must be exactly 20 variants.");
assert.ok(variants.every((variant) => variant.questions.length === 25), "Each variant must contain 25 questions.");
assert.equal(questions.length, 500, "The bank must contain 500 questions.");
assert.equal(new Set(questionTexts).size, 500, "Question wording must be unique across all variants.");
assert.equal(new Set(questionIds).size, 500, "Question IDs must be unique.");

for (const [index, variant] of variants.entries()) {
  assert.equal(variant.number, index + 1, "Variant numbers must be sequential.");
  assert.equal(new Set(variant.questions.map((question) => question.question)).size, 25, `Variant ${variant.number} repeats a question.`);

  for (const question of variant.questions) {
    assert.ok(question.question.length > 20, `${question.id}: prompt is too short.`);
    assert.equal(question.choices.length, 4, `${question.id}: exactly four choices are required.`);
    assert.equal(new Set(question.choices).size, 4, `${question.id}: choices must be unique.`);
    assert.ok(question.choices.includes(question.answer), `${question.id}: answer is missing from choices.`);
    assert.ok(TOPICS[question.topic], `${question.id}: unknown topic ${question.topic}.`);
    for (const language of expectedLanguages) {
      assert.ok(question.explanation[language]?.length > 35, `${question.id}: missing ${language} explanation.`);
    }
  }
}

for (const book of BOOKS) {
  for (const language of expectedLanguages) {
    assert.ok(book.title[language], `${book.id}: missing ${language} title.`);
    assert.ok(book.body[language]?.length >= 150, `${book.id}: incomplete ${language} content.`);
  }
}

assert.ok(BOOKS.length >= 10, "The library must cover all core topics.");
assert.ok(SOURCES.length >= 8, "The source list is incomplete.");

const answerDistribution = [0, 0, 0, 0];
for (const question of questions) {
  answerDistribution[question.choices.indexOf(question.answer)] += 1;
}
assert.ok(answerDistribution.every((count) => count >= 100), "Correct answers are distributed unevenly.");

console.log(`Validated ${variants.length} variants and ${questions.length} unique questions.`);
console.log(`Answer positions: ${answerDistribution.join(", ")}.`);
console.log(`Validated ${BOOKS.length} multilingual study chapters and ${SOURCES.length} sources.`);
