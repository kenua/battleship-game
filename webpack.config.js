const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   mode: "development",
   entry: {
      index: path.resolve(__dirname, "src/index"),
   },
   output: {
      filename: "[name][contenthash].js",
      clean: true,
      path: path.resolve(__dirname, "dist"),
   },
   devtool: "inline-source-map",
   devServer: {
      static: "./dist",
   },
   optimization: {
      runtimeChunk: "single",
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: "index.html",
         title: "Web Battleship",
         template: path.resolve(__dirname, "src/template.html"),
      }),
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
         },
         /*
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         },
         */

         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-env"],
               },
            },
         },
      ],
   },
};
