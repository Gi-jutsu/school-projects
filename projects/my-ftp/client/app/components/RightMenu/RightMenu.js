import React, { Component } from 'react'
import {render} from 'react-dom'

import styles from './RightMenu.css'

class RightMenu extends Component {
  render() {
    return(
      <div className={styles.container}>
        <h1>myFTP</h1>
          <form method="post" class="login-form" onSubmit="login">
            <div class="login-input">
              <input type="email" name="email" id="email" placeholder="Email" required />
            </div>
            <div class="login-input">
              <input type="password" name="password" id="password" placeholder="Password" required />
            </div>
            <div class="login-input">
              <input type="submit" value="Login" />
            </div>
          </form>
      </div>
    )
  }
}

export default RightMenu
