module.exports = api => {
  api.cache(true)

  const presets = [
    require('@babel/preset-env'),
    require('@babel/preset-typescript'),
  ]

  const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          '@/*': './src/*',
          '@/core': './src/core',
        },
      },
    ],
  ]

  return { presets, plugins }
}