module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    indent: 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-one-expression-per-line': 'off',
  },
  overrides: [
    {
      files: ['pages/api/**/*'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['ui-tests/**/*'],
      rules: {
        'class-methods-use-this': 'off',
      },
    },
  ],
};
