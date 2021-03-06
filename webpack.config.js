const path = require("path");

module.exports = {
  entry: [
    "./source/js/script.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false
};
