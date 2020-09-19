// import Component
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

// import component
import NavigationBar from './components/navigationBar'
import Footer from './components/footer'

// import pages
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import ProfilePage from './pages/profilePage'
import CartPage from './pages/cartPage'
import ProductDetails from './pages/productDetails'

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
                    <Route path='/productDetails' component={ProductDetails} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default App