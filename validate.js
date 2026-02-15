/**
 * Validates files in the responses/ directory.
 * Each file must be named {statusCode}.json and contain a JSON array of strings.
 * Run with: npm run validate
 */

const fs = require('fs');
const path = require('path');

const responsesDir = path.join(__dirname, 'responses');

if (!fs.existsSync(responsesDir)) {
  console.error('FAIL: responses/ directory does not exist.');
  process.exit(1);
}

const files = fs.readdirSync(responsesDir);
const jsonFiles = files.filter(f => f.endsWith('.json'));

if (jsonFiles.length === 0) {
  console.error('FAIL: responses/ directory contains no .json files.');
  process.exit(1);
}

let errors = 0;
let totalMessages = 0;

for (const file of jsonFiles) {
  const filePath = path.join(responsesDir, file);
  const code = path.basename(file, '.json');

  // Filename must be a valid HTTP status code (100-599)
  const num = Number(code);
  if (isNaN(num) || num < 100 || num > 599 || !Number.isInteger(num)) {
    console.error(`FAIL: ${file} — filename is not a valid HTTP status code (must be 100-599).`);
    errors++;
    continue;
  }

  // Must be valid JSON
  let messages;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    messages = JSON.parse(raw);
  } catch (err) {
    console.error(`FAIL: ${file} — not valid JSON: ${err.message}`);
    errors++;
    continue;
  }

  // Must be a non-empty array
  if (!Array.isArray(messages) || messages.length === 0) {
    console.error(`FAIL: ${file} — must be a non-empty JSON array.`);
    errors++;
    continue;
  }

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (typeof msg !== 'string') {
      console.error(`FAIL: ${file}, index ${i}: must be a string, got ${typeof msg}.`);
      errors++;
      continue;
    }

    if (msg.trim().length === 0) {
      console.error(`FAIL: ${file}, index ${i}: message is empty or whitespace.`);
      errors++;
    }

    if (msg.length > 200) {
      console.error(`FAIL: ${file}, index ${i}: message exceeds 200 characters (${msg.length}).`);
      errors++;
    }

    // Check for duplicates within the same file
    const dupeIndex = messages.indexOf(msg);
    if (dupeIndex !== i) {
      console.error(`FAIL: ${file}, index ${i}: duplicate of index ${dupeIndex}.`);
      errors++;
    }
  }

  totalMessages += messages.length;
}

// Warn about non-JSON files
const nonJsonFiles = files.filter(f => !f.endsWith('.json'));
for (const file of nonJsonFiles) {
  console.warn(`WARN: ${file} — unexpected non-JSON file in responses/ directory.`);
}

if (errors > 0) {
  console.error(`\nValidation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log(`OK: ${jsonFiles.length} status codes, ${totalMessages} total messages.`);
}
