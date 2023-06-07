module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "plugin:jsx-a11y/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "risxss/catch-potential-xss-react"
    ],
    "rules": {
        "max-lines": ["error", { "max": 200, "skipBlankLines": true }],
        "max-lines-per-function": ["error", { "max": 75, "skipBlankLines": true, "skipComments": true }],
        "complexity": ["error", 6],
        "react/react-in-jsx-scope": "off",
        "no-restricted-syntax": ["error", {
            "selector": "ExportDefaultDeclaration",
            "message": "Prefer named exports"
        }]
    }
}
