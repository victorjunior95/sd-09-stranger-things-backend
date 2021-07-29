module.exports = {
  apps: [
    {
      name: 'app',
      script: './index.js',
      exec_mode: 'cluster',
      instances: 2,
      max_memory_restart: '200M',
      watch: './'
    },
  ]
};