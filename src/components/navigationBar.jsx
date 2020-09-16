// import component
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

class NavigationBar extends Component {
    render() {
        return (
            <AppBar position='fixed' style={styles.root} elevation={3}>
                <Toolbar style={styles.toolbar}>
                    <div style={styles.leftContent}>
                        <Link to='/' style={styles.link}>
                            <Typography variant='h6'>Home</Typography>
                        </Link>
                    </div>
                    <div style={styles.rightContent}>
                        <Link to='/cart' style={styles.link}>
                            <Typography variant='h6' style={{ marginRight: 10 }}>Cart</Typography>
                        </Link>
                        <Link to='/profile' style={styles.link}>
                            <Typography variant='h6'>Profile</Typography>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

const styles = {
    root: {
        height: 50,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        // backgroundColor: 'ghostwhite'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0
    },
    rightContent: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    }
}

export default NavigationBar