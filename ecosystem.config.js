module.exports = {
  apps : [{
    script: 'index.js',
    name: 'moddy-djs',
    watch: '.'
  }],
  deploy : {
    production : {
      user : 'CutieCat6778',
      host : 'Moddy',
      ref  : 'origin/main',
      repo : 'https://github.com/CutieCat6778/moddy-djs',
      path : '.',
      'pre-deploy-local': 'node index.js',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'pm2 start ecosystem.config.js'
    }
  }
};
