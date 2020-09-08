import React, { useEffect } from 'react'
import {render} from 'react-dom'
import { useStateValue } from '../../hooks/state';
import styles from './CommandResult.css'

const CommandResult = () => {
  const [{ isLogged, email, pass, host, port, filesList, path, ipcRenderer }, dispatch] = useStateValue();
  const dirIcon = "https://image.flaticon.com/icons/svg/148/148953.svg";
  const fileIcon = "https://image.flaticon.com/icons/svg/148/148967.svg";
  const listIcon = "https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/folder-512.png"

  useEffect( () => {
    ipcRenderer.send('command', { type: 'list' });
  }, [])


  ipcRenderer.on('reply_command',  (event, arg) => {
    console.log(arg);
    dispatch({
      type: 'setState',
      state: 'path',
      value: arg.path,
    });
    dispatch({
      type: 'setState',
      state: 'filesList',
      value: arg.filesList,
    })
  });

  return (
    <div className={styles.container}>
      {path!==undefined &&
        <p className={styles.path}>{path}</p>
      }
      <div className={styles.filesWindow}>
        <ul className={styles.filesList}>
          {filesList.length > 0 &&
              filesList.map( file => {
                return (
                  <li key={file.name}>
                  {file.charAt(1)==='d' &&
                    <span className={styles.file}>
                      <img className={styles.fileImage} src={dirIcon}/>{file}
                    </span>
                  }
                  </li>
                )
              })
          }
          {filesList.length > 0 &&
            filesList.map( file => {
              return (
                <li key={file.name}>
                {file.charAt(1)==='-' &&
                  <span key={file} className={styles.file}>
                    <img className={styles.fileImage} src={fileIcon}/>{file}
                  </span>
                }
                </li>
              )
            })
          }
          {filesList.length===0 &&
            <p className={styles.emptyTitle}>This directory is empty.</p>
          }
        </ul>
      </div>
      <div className={styles.commandsFrame}>
        <p className={styles.title}>Here are the different commands you can use : </p>
        <ul className={styles.commandsList}>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>USER</strong>  <span className={styles.keyword}>username</span>: check if the user exist</li>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>PASS</strong>  <span className={styles.keyword}>password</span>: authenticate the user with a password</li>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>LIST</strong> : list the current directory of the server</li>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>CWD</strong>  <span className={styles.keyword}>directory</span>: change the current directory of the server</li>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>RETR</strong>  <span className={styles.keyword}>filename</span>: transfer a copy of the file FILE from the server to the client</li>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>STOR</strong>  <span className={styles.keyword}>filename</span>: transfer a copy of the file FILE from the client to the server</li>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>PWD</strong> : display the name of the current directory of the server</li>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>HELP</strong> : send helpful information to the client</li>
          <li className={styles.command}><img className={styles.fileImage} src={listIcon}/><strong>QUIT</strong> : close the connection and stop the program</li>
        </ul>
      </div>
    </div>
  )
}

export default CommandResult
