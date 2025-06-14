import js       from '@eslint/js';
import globals  from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,cjs,mjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType:  'script',                         // CommonJS
      globals: {
        ...globals.node,       // ← require , module , __dirname…
      },
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,       // describe , test , expect …
      },
    },
  },
]);
