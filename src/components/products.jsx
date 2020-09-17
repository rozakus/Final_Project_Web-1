// import react
import React from 'react'

// import library
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import UI
import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardActions,
    CardContent,
    Button,
    Fab
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import action
import { getProducts } from '../actions'

// class component
class Products extends React.Component {
    componentDidMount() {
        this.props.getProducts()
    }

    renderCard = () => {
        return this.props.products.map((item, index) => {
            return (
                <Card style={styles.card} key={item.id_product}>
                    <CardActionArea style={styles.contentArea}>
                        <CardMedia image={item.image} component="img" style={styles.contentImage} />
                        <CardContent>
                            <Typography gutterBottom variant="caption" component="h2">
                                {item.product_name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" component="p">
                                {`IDR ${item.price_sell}.00`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={styles.contentActions}>
                        <Fab variant="extended" size="small" style={{ padding: 20, width: '100%', backgroundColor: 'blue', color: 'white' }}>
                            <ShoppingCartIcon style={{ marginRight: 20 }} />
                            Buy
                        </Fab>
                    </CardActions>
                </Card>
            )
        })
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.header}>
                    <Typography style={styles.title}>Products</Typography>
                </div>
                <div style={styles.cardContainer}>
                    {this.renderCard()}
                </div>
            </div>
        )
    }
}

const styles = {
    root: {
        height: 'auto',
        width: '100%',
        backgroundColor: 'whitesmoke',
        padding: '10px'
    },
    header: {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50,
        fontWight: 600,
    },
    cardContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    card: {
        flexBasis: '12%',
        minWidth: '50px',
        height: '320px',
        margin: '10px 3px',
        borderRadius: "20px",
        padding: "10px",
        // backgroundColor: 'yellow'
    },
    contentArea: {
        height: '87%',
        // backgroundColor: 'green'
    },
    contentImage: {
        width: '100%',
        maxHeight: '150px',
        padding: '5%',
        // backgroundColor: 'red'
    },
    contentActions: {
        height: '13%',
        display: 'flex',
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    link: {
        textDecoration: 'none'
    }
}

// get global state
const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products
    }
}

// exported component
export default connect(mapStateToProps, { getProducts })(Products)