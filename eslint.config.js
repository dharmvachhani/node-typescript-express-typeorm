import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintParserTs from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: eslintParserTs,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      import: pluginImport,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],

      // Unused import handling
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],

      // Import order and grouping
      'import/order': [
        'warn',
        {
          groups: ['external', 'builtin', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            { pattern: '@common/**', group: 'internal', position: 'after' },
            { pattern: '@config', group: 'internal', position: 'after' },
            { pattern: '@config/**', group: 'internal', position: 'after' },
            { pattern: '@constants/**', group: 'internal', position: 'after' },
            { pattern: '@database/**', group: 'internal', position: 'after' },
            { pattern: '@middlewares/**', group: 'internal', position: 'after' },
            { pattern: '@modules/**', group: 'internal', position: 'after' },
            { pattern: '@providers/**', group: 'internal', position: 'after' },
            { pattern: '@router/**', group: 'internal', position: 'after' },
            { pattern: '@utils/**', group: 'internal', position: 'after' },
            { pattern: '@src/**', group: 'internal', position: 'after' },
            { pattern: '@**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // Best practices
      'no-debugger': 'warn',
    },
  },
];
