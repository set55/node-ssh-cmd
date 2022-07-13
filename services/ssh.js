import ssh2 from 'ssh2'
const { Client } = ssh2


class ssh {
    constructor(ip, privateKey, userName) {
        this.ip = ip;
        this.privateKey = privateKey;
        this.userName = userName;
        this.conn = new Client();
    }

    exec (work) {
        let conn = this.conn
        conn.on('ready', () => {
            console.log('Client :: ready')
            conn.exec(work, (err, stream) => {
                if (err) throw err
                stream.on('close', (code, signal) => {
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
                    conn.end()
                }).on('data', (data) => {
                    console.log('STDOUT: ' + data)
                }).stderr.on('data', (data) => {
                    console.log('STDERR: ' + data)
                });
            });
        }).connect({
            host: this.ip,
            port: 22,
            username: this.userName,
            privateKey: this.privateKey
        })
    }
}

export default ssh