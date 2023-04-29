module.exports = {
  apps: [
    {
      name: 'backend-pi-iii',
      script: './dist/index.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
