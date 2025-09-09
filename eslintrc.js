module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
      "react",
      "@typescript-eslint",
  ],
  extends: [
      "airbnb",
      "airbnb-typescript",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/jsx-runtime",
      "plugin:@next/next/recommended"
  ],
  parserOptions: {
      project: "./tsconfig.json"
  },
  rules: {},
  settings: {
      "import/resolver": {
          "node": {
              "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
      }
  }
};