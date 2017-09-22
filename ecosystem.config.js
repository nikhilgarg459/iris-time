module.exports = {
    apps: [
        {
            name: 'IRIS-TIME',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production',
                IRIS_URL: 'http://52.15.127.7:3001'
            }
        }
    ],
    deploy: {
        production: {
            user: 'node',
            host: '18.221.45.30',
            ref: 'origin/master',
            repo: 'https://github.com/nikhilgarg459/iris-time.git',
            path: '/srv/production',
            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
};