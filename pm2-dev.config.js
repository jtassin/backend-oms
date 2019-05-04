module.exports = {
  apps: [
    {
      name: 'backend-oms',
      script: 'npx start-dev',
      instances: 1,
      autorestart: true,
      watch: true,
      source_map_support: true,
    },
  ],
};