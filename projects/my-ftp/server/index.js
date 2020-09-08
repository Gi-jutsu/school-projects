const FtpServer = require('./src/FtpServer');
const [ ,, host, port ] = process.argv;

const ftpServer = new FtpServer(host, port);

/* Clean Exit */

const cleanExit = () => {
  ftpServer.close();
}

process.on('exit',cleanExit); // When app is closing
process.on('SIGINT',cleanExit); // Catches ctrl+c event
