const isDev = process.env.NODE_ENV === "development";

const targets = isDev
  ? { chrome: 75 }
  : {
      ie: 11,
      edge: 14,
      firefox: 45,
      chrome: 49,
      safari: 10,
    };

const presets = [
  [
    "@babel/preset-env",
    {
      targets,
      useBuiltIns: "usage",
      modules: false,
    },
  ],
  "@babel/preset-react",
];

const plugins = [
  ["babel-plugin-styled-components", { displayName: isDev }],
  "@babel/plugin-syntax-dynamic-import",
  ["@babel/plugin-proposal-class-properties", { loose: false }],
  "@babel/plugin-transform-runtime",
];

module.exports = {
  plugins,
  presets,
};
