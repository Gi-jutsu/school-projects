const commands = {
  'PWD': require('./Pwd.js'),
  'CWD': require('./Cwd.js'),
  'CDUP': require('./Cdup.js'),
  'LIST': require('./List.js'),
  'USER': require('./User.js'),
  'PASS': require('./Pass.js'),
  'SYST': require('./Syst.js'),
  'FEAT': require('./Feat.js'),
  'TYPE': require('./Type.js'),
  'PASV': require('./Pasv.js'),
  'PORT': require('./Port.js'),
  'DELE': require('./Dele.js'),
  'RNFR': require('./Rnfr.js'),
  'RNTO': require('./Rnto.js'),
  'RETR': require('./Retr.js'),
  'STOR': require('./Stor.js'),
  'RMD': require('./Rmd.js'),
  'MKD': require('./Mkd.js')
};

module.exports = commands;
