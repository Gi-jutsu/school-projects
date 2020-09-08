const nodePath = require('path');
const moment = require('moment');
const fs = require('fs');
const Promise = require('bluebird');
const _ = require('lodash');

class FileSystem {
  constructor(client, {root, cwd} = {}) {
    this.client = client;

    this.cwd = cwd;
    this._root = nodePath.resolve(root || process.cwd());
  }

  get root() {
    return this._root;
  }

  _resolvePath(path) {
    const clientPath = (() => {
      path = nodePath.normalize(path);
      return nodePath.join(this.cwd, path);
    })();

    const fsPath = (() => {
      const resolvedPath = nodePath.join(this.root, clientPath);
      return nodePath.resolve(nodePath.normalize(resolvedPath));
    })();

    return {
      clientPath,
      fsPath
    }
  }

  currentDirectory() {
    return this.cwd;
  }

  get(fileName) {
    const statAsync = Promise.promisify(fs.stat);
    const { fsPath } = this._resolvePath(fileName);
    return statAsync(fsPath)
      .then((stat) => _.set(stat, 'name', fileName));
  }

  list(path) {
    const readdirAsync = Promise.promisify(fs.readdir);
    const accessAsync = Promise.promisify(fs.access);
    const statAsync = Promise.promisify(fs.stat);
    const { fsPath } = this._resolvePath(path);

    return readdirAsync(fsPath)
      .then(fileNames => {
        return Promise.map(fileNames, fileName => {
          const filePath = nodePath.join(fsPath, fileName);
          return statAsync(filePath)
            .then(stat => _.set(stat, 'name', fileName));
        });
      })
      .then(_.compact);
  }

  delete(path) {
    const statAsync = Promise.promisify(fs.stat);
    const rmdirAsync = Promise.promisify(fs.rmdir);
    const unlinkAsync = Promise.promisify(fs.unlink);
    const { fsPath } = this._resolvePath(path);

    return statAsync(fsPath)
      .then((stat) => {
        if (stat.isDirectory()) {
          return rmdirAsync(fsPath);
        } else {
          return unlinkAsync(fsPath);
        }
      });
  }

  mkdir(path) {
    const {fsPath} = this._resolvePath(path);
    const mkdirAsync = Promise.promisify(fs.mkdir);

    return mkdirAsync(fsPath)
      .then(() => fsPath);
  }

  rename(fileName, newFileName) {
    const renameAsync = Promise.promisify(fs.rename);
    const { fsPath: filePath } = this._resolvePath(fileName);
    const { fsPath: newFilePath } = this._resolvePath(newFileName);

    return renameAsync(filePath, newFilePath);
  }

  write(fileName) {
    const { fsPath, clientPath } = this._resolvePath(fileName);
    const stream = fs.createWriteStream(fsPath, { flags: 'w+' });

    stream.once('close', () => stream.end());
    return {
      stream,
      clientPath
    }
  }

  read(fileName) {
    const statAsync = Promise.promisify(fs.stat);
    const { fsPath, clientPath } = this._resolvePath(fileName);

    return statAsync(fsPath)
      .tap(stat => {
        if (stat.isDirectory()) throw new Error('Cannot read a directory');
      })
      .then(() => {
        const stream = fs.createReadStream(fsPath);
        return {
          stream,
          clientPath
        }
      });
  }

  chdir(path) {
    const statAsync = Promise.promisify(fs.stat);
    const {fsPath, clientPath} = this._resolvePath(path);

    return statAsync(fsPath)
      .tap((stat) => {
        if (!stat.isDirectory()) throw new Error('Not a valid directory');
      })
      .then(() => {
        this.cwd = clientPath;
        return this.currentDirectory();
      })
      .catch(error => {
        if(error.code === 'ENOENT') {
          throw new Error('Not a valid directory');
        }
      })
  }

  ls(fileStat) {
    const now = moment.utc();
    const mtime = moment.utc(new Date(fileStat.mtime));
    const timeDiff = now.diff(mtime, 'months');
    const dateFormat = timeDiff < 6 ? 'MMM DD HH:mm' : 'MMM DD  YYYY';

    return [
        fileStat.mode ? [
          fileStat.isDirectory() ? 'd' : '-',
          fileStat.mode & 256 ? 'r' : '-',
          fileStat.mode & 128 ? 'w' : '-',
          fileStat.mode & 64 ? 'x' : '-',
          fileStat.mode & 32 ? 'r' : '-',
          fileStat.mode & 16 ? 'w' : '-',
          fileStat.mode & 8 ? 'x' : '-',
          fileStat.mode & 4 ? 'r' : '-',
          fileStat.mode & 2 ? 'w' : '-',
          fileStat.mode & 1 ? 'x' : '-'
        ].join('') : fileStat.isDirectory() ? 'drwxr-xr-x' : '-rwxr-xr-x',
        '1',
        fileStat.uid || 1,
        fileStat.gid || 1,
        _.padStart(fileStat.size, 12),
        _.padStart(mtime.format(dateFormat), 12),
        fileStat.name
      ].join(' ');
  }
}

module.exports = FileSystem;
