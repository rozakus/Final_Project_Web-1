// import Component
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// import
import App from './app'
import './index.css'

// setup redux
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'

// create global store

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root')
)