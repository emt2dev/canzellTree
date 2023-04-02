const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VuetifyLoaderPlugin } = require('vuetify-loader');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
                implementation: require("sass"),
                sassOptions: {
                    indentedSyntax: true,
                },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "Training Calendar",
      template: "./template.html",
    }),
  ],

  devServer: {
    static: path.join(__dirname, "dist"),
  },
};
