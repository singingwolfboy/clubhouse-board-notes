var webpack = require("webpack"),
  path = require("path"),
  fileSystem = require("fs"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  WriteFilePlugin = require("write-file-webpack-plugin"),
  ChromeExtensionReloader = require("webpack-chrome-extension-reloader");

var fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "ttf",
  "woff",
  "woff2"
];

var options = {
  entry: {
    background: path.join(__dirname, "src", "js", "background.js"),
    foreground: path.join(__dirname, "src", "js", "foreground.js")
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: ["babel-loader", "react-svg-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        exclude: /node_modules/,
        use: "file-loader?name=[name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: fileExtensions
      .map(extension => "." + extension)
      .concat([".jsx", ".js", ".css"])
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(["build"]),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json",
        transform: function(content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            })
          );
        }
      }
    ]),
    new WriteFilePlugin()
  ]
};

if (process.env.NODE_ENV === "development") {
  options.plugins.push(new ChromeExtensionReloader());
}

module.exports = options;
