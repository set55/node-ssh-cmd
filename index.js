const core = require('@actions/core');
const github = require('@actions/github');
const { Client } = require('ssh2');

try {
    // `who-to-greet` input defined in action metadata file
    const privateKey = core.getInput('private-key');
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    // const time = (new Date()).toTimeString();
    // core.setOutput("time", time);

    const conn = new Client();
    conn.on('ready', () => {
        console.log('Client :: ready');
        conn.exec('touch 2', (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: '13.215.50.118',
        port: 22,
        username: 'ubuntu',
        privateKey: privateKey
    });

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}