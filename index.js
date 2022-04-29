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
    // required
    const privateKey = core.getInput('private-key')
    const ip = core.getInput('server-ip')
    const workTarget = core.getInput('work-target')

    // not require
    const gitRepo = core.getInput('git-repo')
    const repoName = core.getInput('repo-name')
    const imageName = core.getInput('image-name')
    const containerName = core.getInput('container-name')
    const containerPort = core.getInput('container-port')
    const environment = core.getInput('environment')

    console.log('begin ssh to server')
    const time = (new Date()).toTimeString()
    core.setOutput("time", time)

    let client = new ssh(ip, privateKey)
    let worker = new works(gitRepo, repoName, imageName, containerName, containerPort, environment)

    client.exec(worker.workCmd(workTarget))


    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`)

} catch (error) {
    core.setFailed(error.message)
}