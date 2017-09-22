module.exports = {
    apps: [
        {
            name: 'IRIS-TIME',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production',
                IRIS_URL: 'http://172-31-1-42:3001'
            }
        }
    ],
    deploy: {
        production: {
            user: 'node',
            host: '172-31-3-208',
            ref: 'origin/master',
            repo: 'https://github.com/nikhilgarg459/iris-time.git',
            path: '/srv/production',
            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
};