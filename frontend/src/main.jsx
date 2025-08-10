import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store.js'
import { Provider } from 'react-redux'

import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
 
)
  