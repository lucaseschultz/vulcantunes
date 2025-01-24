import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        URL: 'readonly',
        React: 'readonly'
      }
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': typescript
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'] // Changed from 'error' to 'warn'
    }
  }
]
