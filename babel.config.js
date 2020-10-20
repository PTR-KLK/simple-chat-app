module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        "dotenv-import",
        {
          allowUndefined: true,
          moduleName: "@env",
          path: ".env",
          safe: false,
        },
      ],
    ],
    presets: ["babel-preset-expo"],
  };
};
