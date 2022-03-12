import { getGitTag } from '../services/index.js'


// const works = {
//     updateGit: `sudo rm -rf express-server && git clone git@github.com:set55/express-server.git && cd express-server && sudo git checkout ${getGitTag()}`,
//     build: 'sudo docker build -t express-img2 express-server',
//     run: 'sudo docker run -d --name=express -p 3000:80 express-img2'
// }

class works {
    constructor(gitRepo = '', repoName = '', imageName = '', containerName = '', containerPort = '') {
        this.params = {
            updateGit: `sudo rm -rf ${repoName} && git clone git@github.com:${gitRepo} && cd ${repoName} && sudo git checkout ${getGitTag()}`,
            build: `sudo docker rmi -f ${imageName} && sudo docker build -t ${imageName} ${repoName}`,
            run: `sudo docker run -d --name=${containerName} -p ${containerPort}:80 ${imageName}`
        }
    }

    workCmd(workLabel) {
        return this.params[workLabel]
    }
}

export default works