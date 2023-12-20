const path = require("path");

module.exports = function override(config, env) {
  // Add polyfills for node.js core modules
  config.resolve.fallback = {
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    util: require.resolve("util/"),
    zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url/"),
    assert: require.resolve("assert/"),
  };

  return config;
};
