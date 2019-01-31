const path = require('path')
const includePath = path.resolve(__dirname, '..')

module.exports = (baseConfig, env, config) => {
  /** Typescript */
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
