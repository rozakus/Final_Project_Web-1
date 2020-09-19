// import Component
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { KeepLogin } from './actions'

// import component
import NavigationBar from './components/navigationBar'
import Footer from './components/footer'

// import pages
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import ProfilePage from './pages/profilePage'
import CartPage from './pages/cartPage'
<<<<<<< HEAD
import ProductDetails from './pages/productDetails'
=======
import HistoryUser from './pages/historyUser'
import HistoryTransaction from './pages/historyTransaction'
>>>>>>> 32f48cc5d6dd53c68f9a002362d752d13d75481b

class App extends Component {

    componentDidMount() {
        this.props.KeepLogin()
    }

    render() {
        if(this.props.role === 'admin') {
            return (
                <div>
                    <NavigationBar />
                    <Switch>
                    <Route path='/' component={HomePage} exact />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
<<<<<<< HEAD
                    <Route path='/profile' component={ProfilePage} />
                    <Route path='/cart' component={CartPage} />
                    <Route path='/productDetails' component={ProductDetails} />
                </Switch>
                <Footer />
            </div>
        )
=======
                    <Route path="/historytransaction" component={HistoryTransaction} />
                    </Switch>
                </div>
            )
        } else {

            return (
                <div>
                    <NavigationBar />
                    <Switch>
                        <Route path='/' component={HomePage} exact />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/profile' component={ProfilePage} />
                        <Route path="/historyUser" component={HistoryUser} />
                        <Route path='/cart' component={CartPage} />
                    </Switch>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer.role
>>>>>>> 32f48cc5d6dd53c68f9a002362d752d13d75481b
    }
}

export default connect (mapStateToProps, { KeepLogin })(App)