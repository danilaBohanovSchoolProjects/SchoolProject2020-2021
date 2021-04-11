const path = require("path");

module.exports = {
  entry: [
    "./source/js/math.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false
};
