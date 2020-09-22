// import Component
import React from 'react'

// import UI
import { Paper } from '@material-ui/core'

// import Component

// class component
class AdminPage extends React.Component {
    render() {
        return (
            <div style={styles.root}>
                <Paper style={styles.rootContainer} elevation={5}>
                    <div style={styles.sidebar}>
                        <h2>Users</h2>
                        <h2>Product Sales</h2>
                        <h2>Profit Sales</h2>
                    </div>
                    <div style={styles.content}>
                        <h2>content</h2>
                    </div>
                </Paper>
            </div>
        )
    }
}

const styles = {
    root: {
        padding: '100px 10px 10px 10px',
        height: 'auto',
        display: 'flex',
    },
    rootContainer: {
        minHeight: '100vh',
        height: 'auto',
        width: '100%',
        borderRadius: 20,
        padding: 10,
        display: 'flex',
    },
    sidebar: {
        width: '20%',
        height: '100%',
        backgroundColor: 'yellow',
        borderRadius: '20px 0 0 20px',
        padding: 10
    },
    content: {
        flex: 1,
        backgroundColor: 'green',
        borderRadius: '0 20px 20px 0',
        padding: 10
    }
}

export default AdminPage