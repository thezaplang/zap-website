import { defineEcConfig } from 'astro-expressive-code';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const zapLang = JSON.parse(
  readFileSync(join(__dirname, 'src/zap.tmLanguage.json'), 'utf-8')
);

export default defineEcConfig({
  shiki: {
    langs: [zapLang],
  },
});
