import React, { useEffect } from 'react'
import { useStateValue } from '../../hooks/state';
import {render} from 'react-dom'

import styles from './Login.css'

const Login = () => {
  const [{ isLogged, user, pass, host, port, ipcRenderer, message }, dispatch] = useStateValue();

  ipcRenderer.on('reply_login',  (event, arg) => {
    dispatch({
      type: 'setState',
      state: 'isLogged',
      value: arg.isLogged,
    });
    dispatch({
      type: 'setState',
      state: 'message',
      value: arg.message,
    });
  });

  const login = () => {
    ipcRenderer.send('login', {
      host: host,
      port: port,
      user: user,
      pass: pass,
    });
  }

  return(
    <div className={styles.container}>
      <h4 className={styles.title}>myFTP</h4>
        <div className={styles.loginForm}>
          <div className={styles.loginInput}>
            <input
              className={styles.input}
              type="text" name="host" id="host"
              placeholder="Host"
              value={host}
              onChange={e => dispatch({
                type: 'setState',
                state: 'host',
                value: e.target.value
              })}
              required/>
          </div>
          <div className={styles.loginInput}>
            <input
              className={styles.input}
              type="text" name="port" id="port"
              placeholder="Port"
              value={port}
              onChange={e => dispatch({
                type: 'setState',
                state: 'port',
                value: e.target.value
              })}
              required/>
          </div>
          <div className={styles.loginInput}>
            <input
              className={styles.input}
              type="text" name="user" id="user"
              placeholder="Username"
              value={user}
              onChange={e => dispatch({
                type: 'setState',
                state: 'user',
                value: e.target.value
              })}
              required/>
          </div>
          <div className={styles.loginInput}>
            <input
              className={styles.input}
              type="password" name="password" id="password"
              placeholder="Password"
              value={pass}
              onChange={e => dispatch({
                type: 'setState',
                state: 'pass',
                value: e.target.value
              })}
              required/>
          </div>
          <p className={styles.loginMessage}>{message}</p>
          <div className={styles.loginSubmit}>
            <button className={styles.button} onClick={login}>Send</button>
          </div>
        </div>
    </div>
  )
}

export default Login
