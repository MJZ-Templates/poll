module.exports = {
    apps: [
        {
            name: 'backend',
            cwd: './back',
            script: './gradlew',
            args: 'bootRun',
            interpreter: 'bash',
            watch: false,
        },
        {
            name: 'frontend',
            cwd: './front',
            script: 'npm',
            args: 'run dev',
            watch: false,
        },
    ],
};
