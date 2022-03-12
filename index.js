// const core = require('@actions/core');
// const github = require('@actions/github');
// const { Client } = require('ssh2');
import core from '@actions/core'
import github from '@actions/github'
// import ssh2 from 'ssh2'
// const { Client } = ssh2
import { ssh } from './services/index.js'
import works from './works/index.js'

try {
    // `who-to-greet` input defined in action metadata file
    const privateKey = core.getInput('private-key')
    const ip = core.getInput('server-ip')
    const workTarget = core.getInput('work-target')
    console.log('begin ssh to server')
    const time = (new Date()).toTimeString()
    core.setOutput("time", time)

    let client = new ssh(ip, privateKey)

    client.exec(works[workTarget])



    // const conn = new Client()
    // conn.on('ready', () => {
    //     console.log('Client :: ready')
    //     conn.exec('sudo docker build -t express-img2 express-server', (err, stream) => {
    //         if (err) throw err
    //         stream.on('close', (code, signal) => {
    //             console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
    //             conn.end()
    //         }).on('data', (data) => {
    //             console.log('STDOUT: ' + data)
    //         }).stderr.on('data', (data) => {
    //             console.log('STDERR: ' + data)
    //         });
    //     });
    // }).connect({
    //     host: ip,
    //     port: 22,
    //     username: 'ubuntu',
    //     privateKey: privateKey
    // })

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)

} catch (error) {
    core.setFailed(error.message)
}