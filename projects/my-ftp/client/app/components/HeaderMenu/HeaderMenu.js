import React, { Component, useState } from 'react'
import { useStateValue } from '../../hooks/state';
import {render} from 'react-dom'

import styles from './HeaderMenu.css'

const HeaderMenu = () => {
  const [{ isLogged, command, history, ipcRenderer, path }, dispatch] = useStateValue();
  const [commandIndex, setCommandIndex] = useState(0)

  const sendCommand = e => {
    dispatch({
      type: 'setState',
      state: 'command',
      value: command
    })
    ipcRenderer.send('command', { type: command });

    const tempHistory = history;
    tempHistory.push(command)

    dispatch({
      type: 'setState',
      state: 'history',
      value: tempHistory,
    })
    setCommandIndex(commandIndex+1);
    dispatch({
      type: 'setState',
      state: 'command',
      value: ''
    })
  }

  const setCommand = e => {
    dispatch({
      type: 'setState',
      state: 'command',
      value: e.target.value,
    })
  }

  const previousCommand = () => {
    console.log('Arrow up touched !');
    dispatch({
      type: 'setState',
      state: 'command',
      value: history[commandIndex-1],
    })
  }

  const logout = () => {
    dispatch({
      type: 'setState',
      state: 'isLogged',
      value: false,
    })
  }

  return(
    <div className={styles.headerMenu}>
      <div className={styles.leftSection}>
        <h5 className={styles.leftTitle}>myFTP</h5>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rightForm}>
          <input className={styles.fixedInput} type="text" value="$" disabled/>
          {isLogged &&
            <>
              <input className={styles.rightInput} type="text" name="command" id="command" placeholder="Type your commands (twice if needed) here" value={command} onKeyPress={event => {
                  if (event.key === 'Enter' && event.target.value!=='') sendCommand(event);
                  if (event.key === 'ArrowUp') previousCommand();
              }}
              onChange={setCommand}/>
              <span className={styles.logoutColumn}><button  onClick={logout} className={styles.logoutButton}><img src='https://cdn1.iconfinder.com/data/icons/interface-elements-ii-1/512/Logout-512.png' className={styles.logoutImage}/></button></span>
            </>
          }
          {!isLogged &&
            <input className={styles.rightInput} type="text" name="command" id="command" placeholder="Waiting for server connection..." disabled/>
          }
        </div>
      </div>
    </div>
  )
}

export default HeaderMenu
