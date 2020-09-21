// import react
import React from 'react'

// import library
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// improt UI
import {
    Card,
    CardActions,
    Fab,
    Typography,
    CardMedia,
    CardActionArea
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import action
import { getAllProductPackage } from '../actions'

class ProductPackage extends React.Component {
    componentDidMount() {
        this.props.getAllProductPackage()
    }

    renderProductPackage = () => {
        return this.props.productPackage.map((item) => {
            return (
                <Card style={styles.card} key={item.id_product_package}>
                    <Fab variant="extended" size="small" style={{ padding: 20, width: '100%', backgroundColor: '#cbe2d6', color: 'black', marginBottom: 10 }}>
                        <Typography variant="caption">{item.package_name}</Typography>
                    </Fab>
                    <CardActionArea style={styles.contentArea}>
                        <CardMedia image={item.img} component="img" style={styles.contentImage} />
                    </CardActionArea>
                    <CardActions>
                        <Link to={`/productPackageDetails?${item.id_product_package}`}>
                            <Fab variant="extended" size="small" style={{ padding: 20, width: '100%', backgroundColor: '#cbe2d6', color: 'black' }}>
                                <ShoppingCartIcon style={{ marginRight: 20 }} />
                                <Typography variant="caption"> Buy Package </Typography>
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
                    <Typography style={styles.title}>Product Package</Typography>
                </div>
                <div style={styles.cardContainer}>
                    {this.renderProductPackage()}
                </div>
            </div>
        )
    }
}

const styles = {
    root: {
        height: 'auto',
        width: '100%',
        // backgroundColor: 'whitesmoke',
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
        justifyContent: 'center',
        // alignItems: 'center',
        // flexWrap: 'wrap',
        // justifyContent: 'flex-start',
        // backgroundColor: 'green',
        padding: 10
    },
    card: {
        width: 250,
        padding: 10,
        marginRight: 20,
        borderRadius: "20px",
        elevation: '4'
    },
    contentArea: {
        height: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // backgroundColor: 'green'
    },
    contentImage: {
        width: '100%',
        padding: '5%',
        // backgroundColor: 'red'
    },
}

// get global state
const mapStateToProps = (state) => {
    return {
        productPackage: state.productReducer.productPackage
    }
}

export default connect(mapStateToProps, { getAllProductPackage })(ProductPackage)