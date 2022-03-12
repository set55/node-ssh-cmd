import { getGitTag } from '../services/index'


const works = {
    updateGit: `sudo rm -rf /express-server && sudo git clone git@github.com:set55/express-server.git && cd express-server && sudo git checkout ${getGitTag()}`,
    build: 'sudo docker build -t express-img2 express-server'
}

export default works