// import react
import React from 'react'

// import redux
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import UI
import {
    Card,
    CardActionArea,
    CardMedia,
    CardActions,
    CardContent,
    Typography,
    Button,
    Fab,
    Paper
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import action
import { getAllProducts, getAllProducts_byCategory } from '../actions'

// class component
class Products extends React.Component {
    componentDidMount() {
        this.props.getAllProducts()
    }

    renderCard = () => {
        return this.props.products.map((item) => {
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
                        <Link to={`/productDetails?${item.id_product}`}>
                            <Fab variant="extended" size="small" style={{ padding: 20, width: '100%', backgroundColor: '#cbe2d6', color: 'black'}}>
                                <ShoppingCartIcon style={{ marginRight: 20 }} />
                            Buy
                            </Fab>
                        </Link>
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
                <Paper style={styles.filter}>
                    <Button
                        onClick={() => this.props.getAllProducts()}
                    >All Products</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(5)}
                    >Soft Drink</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(6)}
                    >Milk</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(7)}
                    >Syrup</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(8)}
                    >Juice</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(9)}
                    >Coffee</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(10)}
                    >Tea</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(11)}
                    >Chocolate</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(12)}
                    >Candy</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(13)}
                    >Jelly & Chewing Gum</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(14)}
                    >Biscuit</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(15)}
                    >Cookies & Cream </Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(16)}
                    >Wafer</Button>
                    <Button
                        onClick={() => this.props.getAllProducts_byCategory(17)}
                    >Chips</Button>
                </Paper>
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
    filter: {
        borderRadius: 20,
        padding: 5
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
export default connect(mapStateToProps, { getAllProducts, getAllProducts_byCategory })(Products)