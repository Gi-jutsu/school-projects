import React from 'react'
import { render } from 'react-dom'
import { StateProvider } from './hooks/state';
import { ipcRenderer } from 'electron';
import App from './App.js'

const initialState = {
	isLogged: false,
	message: '',
	command: '',
	history: [],
  user: 'peter',
  pass: 'admin',
  host: '127.0.0.1', //10.3.3.115
  port: '3389',
	ipcRenderer: ipcRenderer,
	filesList: [],
	path: '/',
};

const reducer = (state, action) => {
	switch (action.type) {
	case 'setState':
		return({
			...state,
			[action.state]: action.value
		});
	default:
		return state;
	}
};

render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App/>
  </StateProvider>,
  document.getElementById('app')
)
