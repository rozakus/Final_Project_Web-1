// import component
import React from 'react'
import { Redirect } from 'react-router-dom'

// import UI
import { Paper, TextField, Button, Typography, InputAdornment } from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    handleRegister = () => {
        let inputUsername = this.inputUsername.value // username or password
        let inputEmail = this.inputEmail.value // username or password
        let inputPassword = this.inputPassword.value // password
        let inputPasswordConfirm = this.inputPasswordConfirm.value // password

        if (!inputUsername || !inputEmail || !inputPassword || !inputPasswordConfirm) return console.log('input kosong')

        console.log({ inputUsername }, { inputEmail }, { inputPassword }, { inputPasswordConfirm })
    }

    render() {
        const { redirect } = this.state
        if (redirect) return <Redirect to='/login' />

        return (
            <div style={styles.root}>
                <Paper style={styles.registerContainer}>
                    <Typography variant='h5' style={styles.header}>Register</Typography>
                    <div style={styles.inputContainer}>
                        <TextField
                            style={{ marginBottom: 10 }}
                            label='username'
                            variant='outlined'
                            inputRef={(inputUsername) => this.inputUsername = inputUsername}
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
                            label='email'
                            variant='outlined'
                            inputRef={(inputEmail) => this.inputEmail = inputEmail}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
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
                        <TextField
                            style={{ marginBottom: 10 }}
                            label='confirm password'
                            variant='outlined'
                            inputRef={(inputPasswordConfirm) => this.inputPasswordConfirm = inputPasswordConfirm}
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
                        onClick={this.handleRegister}
                        variant='contained'
                        color='primary'
                    >
                        Register
                    </Button>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography variant='subtitle2'>Already have account?</Typography>
                        <Button onClick={() => this.setState({ redirect: true })}>
                            Login
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
    registerContainer: {
        height: '80%',
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

export default RegisterPage