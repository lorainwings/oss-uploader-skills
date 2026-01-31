#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const templatePath = process.argv[2];
const mappingPath = process.argv[3];
const outputPath = process.argv[4];

if (!templatePath || !mappingPath || !outputPath) {
  console.error('Usage: node inject-data.js <template.html> <mapping.json> <output.html>');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');
const mapping = fs.readFileSync(mappingPath, 'utf-8');

const output = template.replace(
  'const MAPPING_DATA = null;',
  `const MAPPING_DATA = ${mapping.trim()};`
);

fs.writeFileSync(outputPath, output);
console.log(`Preview generated: ${outputPath}`);
