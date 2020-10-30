module.exports = {
  apps : [{
    script: 'index.js',
    name: 'moderator-bot',
    watch: '.'
  }],
  deploy : {
    production : {
      user : 'Shinoneko6778',
      host : 'ModeratorBot',
      ref  : 'origin/main',
      repo : 'https://github.com/CutieCat6778/ModeratorBot',
      path : '.',
      'pre-deploy-local': 'node index.js',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'pm2 start ecosystem.config.js'
    }
  }
};
