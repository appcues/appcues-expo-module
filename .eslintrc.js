module.exports = {
  root: true,
  extends: ['universe/native'],
  ignorePatterns: ['build'],
  rules: {
    // sort members
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    // more intelligent sort of import statements
    'import/order': ['error'],
    'prettier/prettier': [
      'error',
      {
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
  },
};
