import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {ignores: ['node_modules/**', 'out/**', 'tests/golden/**']},
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {ecmaFeatures: {jsx: true}},
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {globals: {console: 'readonly', process: 'readonly', Buffer: 'readonly'}},
  },
  {
    files: ['src/videos/**/*.{ts,tsx}'],
    rules: {'@typescript-eslint/no-unused-vars': 'off'},
  },
);
