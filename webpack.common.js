const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: {
      index: path.resolve(__dirname, "src/index"),
   },
   output: {
      filename: "[name][contenthash].js",
      clean: true,
      path: path.resolve(__dirname, "docs"),
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: "index.html",
         title: "Battleship Game",
         template: path.resolve(__dirname, "src/template.html"),
      }),
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
         },
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
