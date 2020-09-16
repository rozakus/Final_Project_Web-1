// import
import React, { Component } from 'react'

// import UI
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@material-ui/core'

class Product extends Component {
    constructor(props){
        super(props)
        this.state = {
            product : []
        }
    }

    render() {
        return (
            <div>
                <Typography variant='h5'>Products</Typography>
                <div style={styles.productContainer}>
                
                </div>
            </div>
        )
    }

}


export default Product