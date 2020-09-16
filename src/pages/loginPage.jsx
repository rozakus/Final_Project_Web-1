// import component
import React from 'react'
import { Redirect } from 'react-router-dom'

// import UI
import { Paper, TextField, Button, Typography, InputAdornment } from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    handleLogin = () => {
        let inputUser = this.inputUser.value // username or password
        let inputPassword = this.inputPassword.value // password

        if (!inputUser || !inputPassword) return console.log('input kosong')

        console.log({ inputUser }, { inputPassword })
    }

    render() {
        const { redirect } = this.state
        if (redirect) return <Redirect to='/register' />

        return (
            <div style={styles.root}>
                <Paper style={styles.loginContainer}>
                    <Typography variant='h5' style={styles.header}>Login</Typography>
                    <div style={styles.inputContainer}>
                        <TextField
                            style={{ marginBottom: 10 }}
                            label='username or email'
                            variant='outlined'
                            inputRef={(inputUser) => this.inputUser = inputUser}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            style={{ marginBottom: 10 }}
                            label='password'
                            variant='outlined'
                            inputRef={(inputPassword) => this.inputPassword = inputPassword}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <Button
                        onClick={this.handleLogin}
                        variant='contained'
                        color='primary'
                    >
                        login
                    </Button>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography variant='subtitle2'>Already have account?</Typography>
                        <Button onClick={() => this.setState({ redirect: true })}>
                            Register
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

const styles = {
    root: {
        marginTop: 50,
        backgroundColor: 'ghostwhite',
        height: '100vh',
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginContainer: {
        height: '50%',
        width: '50%',
        elevation: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    header: {
        marginBottom: 20
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
}

export default LoginPage