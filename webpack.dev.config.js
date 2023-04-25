const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const port = 3000;

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    port: port || 3000,
    open: true,
    // page will likely have to be served in place of any 404 responses.
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
      title: "Student Career Predictor"
    }),
    new miniCssExtractPlugin(),
    new Dotenv(),
    new SpriteLoaderPlugin(),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          // "style-loader" // added styles to the head of index.html
          miniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/,
        exclude: /icons/,
        type: "asset/resource"
      },
      {
        test: /\.svg$/,
        include: path.join(__dirname, "./src/icons"),
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              spriteFilename: () => "sprite.svg",
              symbolId: (filePath) => path.basename(filePath)
            }
          }
        ]
      }
    ]
  }
};
