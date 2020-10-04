module.exports = {
  apps : [{
    script: 'index.js',
    name: 'shinoneko',
    watch: '.'
  }],
  deploy : {
    production : {
      user : 'Valder-3127',
      host : 'shinoneko-djs',
      ref  : 'origin/master',
      repo : 'https://github.com/Valder-3127/shinoneko-djs',
      path : '.',
      'pre-deploy-local': 'node index.js',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'pm2 start ecosystem.config.js'
    }
  }
};
