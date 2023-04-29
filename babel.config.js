module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@api': './src/api/',
          '@config': './src/config/',
          '@modules': './src/modules/',
        },
      },
    ],
  ],
};
