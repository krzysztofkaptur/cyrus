module.exports = {
  apps: [
    {
      name: 'Cyrus API Docs',
      script: 'npm run docs:preview',
      error_file: './pm2-error.log',
      out_file: './pm2-out.log',
    },
  ],
}
