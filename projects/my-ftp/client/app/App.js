import React, { useState } from 'react'
import {render} from 'react-dom'
import HeaderMenu from './components/HeaderMenu/HeaderMenu.js'
import Login from './components/Login/Login.js'
import CommandResult from './components/CommandResult/CommandResult.js'
import { useStateValue } from './hooks/state';
import styles from './app.global.css'

const App = () => {
  const [{ isLogged, user, password, host, port }, dispatch] = useStateValue();

  return (
      <div className="wrapper">
        <HeaderMenu/>

        <div className="app-body">
          {!isLogged &&
            <Login/>
          }
          {isLogged &&
            <CommandResult />
          }
        </div>
      </div>
  )
}

export default App;
