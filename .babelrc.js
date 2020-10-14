module.exports = {
  plugins: ['@babel/plugin-transform-runtime'],
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
}
