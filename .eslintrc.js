module.exports = {
    extends: [
        "universe",
        "universe/shared/typescript-analysis",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.d.ts"],
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
    ],
    rules: {
        "import/order": "off",
        "react-hooks/exhaustive-deps": "error",
        "prettier/prettier": [
            "warn",
            {
                tabWidth: 4,
            },
        ],
    },
};
