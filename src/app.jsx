// import Component
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

// import component
import NavigationBar from './components/navigationBar'

// import pages
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import ProfilePage from './components/profilePage'
import CartPage from './pages/cartPage'

class App extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Switch>
                    <Route path='/' component={HomePage} exact />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/profile' component={ProfilePage} />
                    <Route path='/cart' component={CartPage} />
                </Switch>
            </div>
        )
    }
}

export default App