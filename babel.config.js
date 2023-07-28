module.exports = function (api) {
    api.cache(true);

    return {
        env: {
            production: { presets: ["babel-preset-expo"] },
            development: { presets: ["babel-preset-expo"] },
            test: {
                presets: ["babel-preset-expo", "@babel/preset-env"],
                plugins: [
                    [
                        "@babel/plugin-transform-private-property-in-object",
                        { loose: true },
                    ],
                    [
                        "@babel/plugin-transform-private-methods",
                        { loose: true },
                    ],
                    [
                        "@babel/plugin-transform-class-properties",
                        { loose: true },
                    ],
                ],
            },
        },
    };
};
