module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier"
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-props-no-multi-spaces': 'error',
    'consistent-return': 'error',
    'default-case': 'error',
    'import/no-cycle': 'error',
    'no-param-reassign': 'error',
    'no-else-return': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-one-expression-per-line': [
      'error',
      {
        allow: 'single-child',
      },
    ],
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    strict: ['error', 'global'],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-fragments': ['warn', 'syntax'],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
        children: true,
      },
    ],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-indent': ['warn', 2],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: false,
      },
    ],
    'import/extensions': [
      'off',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-named-as-default': 'off',
    'import/named': 'off',
    'react/display-name': 'off',
    "import/no-unresolved": "off",
    'import/no-named-as-default-member': 'off',
  },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.cjs', 'postcss.config.cjs'],
  settings: {
    react: {
      version: 'detect',
    },
    "import/resolver": {
      "node": {
        "paths": [
          "src"
        ],
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
};