module.exports = {
    presets: [
      "@babel/preset-env", // Transpiles modern JavaScript to older versions
      "@babel/preset-react" // Handles React-specific syntax
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties", // Handles class properties
      "@babel/plugin-proposal-optional-chaining", // Handles optional chaining
      "@babel/plugin-transform-runtime" // Optimizes runtime helpers
    ]
  };