// import Component
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { KeepLogin } from './actions'

// import component
import NavigationBar from './components/navigationBar'

// import pages
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import ProfilePage from './pages/profilePage'
import CartPage from './pages/cartPage'
import HistoryUser from './pages/historyUser'
import HistoryTransaction from './pages/historyTransaction'

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
    }
}

export default connect (mapStateToProps, { KeepLogin })(App)