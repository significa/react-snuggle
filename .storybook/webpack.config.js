const path = require("path")
const includePath = path.resolve(__dirname, "..")

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: includePath,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        include: includePath,
        use: "url-loader"
      },
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve("@storybook/addon-storysource/loader")],
        enforce: "pre"
      }
    ]
  }
}
