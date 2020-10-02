// import React Component
import React from "react";

// import library
import Axios from "axios";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

// import UI
import {
  Paper,
  Button,
  Typography,
  CardMedia,
  Fab,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// import
import { URL, URL_IMG } from "../actions";

// class component
class ProductPackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cart: [],
      openErr: false,
      maxQtyErr: null,
      cateErr: "",
      loginErr: false,
      toCart: false,
      errQtyToCart: false,
      errCartEmpty: false
    };
  }

  async componentDidMount() {
    await Axios.get(URL + "/getPackage/" + this.props.location.search.slice(1))
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  }

  handleClose = () => {
    this.setState({ openErr: false, maxQtyErr: null, cateErr: "" });
  };

  handleAddToCart = async () => {
    const { data, cart } = this.state;

    if (!this.props.userId) {
      this.setState({ loginErr: true });
      return;
    }
    
    if (cart.length === 0) {
      this.setState({ errCartEmpty: true })
      return
    }

    let totQtyCart = 0
    cart.forEach(element => {
      totQtyCart += element.qty
    })

    let totQtyPkg = 0
    data.forEach(element => {
      totQtyPkg += element.max_qty
    })

    if(totQtyCart !== totQtyPkg) {
      this.setState({ errQtyToCart: true })
      return
    }

    let user_id = this.props.userId;
    let package_id = data[0].id_product_package;
    let product_id = [];
    let product_qty = [];
    let total_modal = [];
    let total_sell = data[0].package_price;
    cart.forEach((item) => {
      item.product.forEach((value) => {
        product_id.push(value.product_id);
        product_qty.push(value.prodQty);
        total_modal.push(value.modal);
      });
    });

    let body = {
      user_id,
      package_id,
      product_id,
      product_qty,
      total_modal,
      total_sell,
    };
    console.log(body);

    await Axios.post(URL + "/addtocartpkg", body)
      .then((res) => {
        console.log(res.data)
        this.setState({toCart: true})
      })
      .catch((err) => console.log(err));
  };

  pushToPackage = async (product, maxQty, cate) => {
    let tempCart = [...this.state.cart];
    const index = tempCart.findIndex(
      (item) => item.category_id === parseInt(product.category_id)
    );
    // console.log(index);
    if (index === -1) {
      // console.log("beda category");
      let tempCart = [...this.state.cart];
      tempCart.push({
        category_id: parseInt(product.category_id),
        qty: 1,
        product: [
          {
            product_name: product.product_name,
            product_id: parseInt(product.product_id),
            modal: parseInt(product.price_modal),
            prodQty: 1,
          },
        ],
      });
      this.setState({ cart: tempCart });
    } else {
      // console.log("sama category");
      const id =
        this.state.cart[index].product.findIndex(
          (item) => item.product_id === product.product_id
        ) + 1;
      // console.log(id);
      let tempCart = [...this.state.cart];
      if (this.state.cart[index].qty >= maxQty) {
        this.setState({ openErr: true, maxQtyErr: maxQty, cateErr: cate });
        // console.log("dialog true");
        return;
      }
      if (!id && this.state.cart[index].qty < maxQty) {
        tempCart[index].qty = tempCart[index].qty + 1;
        tempCart[index].product.push({
          product_name: product.product_name,
          product_id: parseInt(product.product_id),
          modal: parseInt(product.price_modal),
          prodQty: 1,
        });

        this.setState({ cart: tempCart });
      } else if (id && this.state.cart[index].qty < maxQty) {
        tempCart[index].qty = tempCart[index].qty + 1;
        tempCart[index].product[id - 1].prodQty =
          tempCart[index].product[id - 1].prodQty + 1;
        tempCart[index].product[id - 1].modal =
          tempCart[index].product[id - 1].modal + parseInt(product.price_modal);

        this.setState({ cart: tempCart });
      }
    }
  };

  renderCompos = () => {
    return this.state.cart.map((item, index) => {
      return item.product.map((product, id) => {
        return (
          <li key={id}>
            {product.product_name} = {product.prodQty} Pcs
          </li>
        );
      });
    });
  };

  renderCard = (dataProduct, maxQty, cate) => {
    return dataProduct.map((item, index) => {
      return (
        <Card
          style={styles.card}
          key={item.product_id}
          onClick={() => this.pushToPackage(item, maxQty, cate)}
        >
          <CardActionArea style={styles.contentArea}>
            <CardMedia
              image={item.image}
              component="img"
              style={styles.contentImage}
            />
            <CardContent style={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="caption" component="h2">
                {item.product_name}
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {`IDR ${item.price_sell.toLocaleString()}.00`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    });
  };

  renderDivCate = () => {
    return this.state.data.map((item, index) => {
      return (
        <Paper
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            flexBasis: 1,
            minWidth: "33%",
            borderRadius: 10,
          }}
          elevation={5}
          key={index}
        >
          <div style={{}}>
            <h2>Category {item.category} ({item.max_qty} Pcs)</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {this.renderCard(item.product, item.max_qty, item.category)}
          </div>
        </Paper>
      );
    });
  };

  render() {
    const { data, cart, openErr, maxQtyErr, cateErr, loginErr, toCart, errQtyToCart, errCartEmpty } = this.state;
    // console.log(cart);
    // console.log(data);
    if (loginErr) return <Redirect to='/login'/>
    if (toCart) return <Redirect to='/cart'/>

    return (
      <div style={styles.root}>
        <Paper style={styles.rootContainer} elevation={5}>
          <div style={styles.header}>
            <Fab
              style={{
                padding: 10,
                display: "flex",
                borderRadius: 10,
                width: "50%",
                backgroundColor: "#cbe2d6",
                color: "black",
                marginRight: 20,
              }}
            >
              <Typography variant="h6">
                Package : {data[0] ? data[0].package_name : null}
              </Typography>
            </Fab>
            <Button
              onClick={this.handleAddToCart}
              variant="contained"
              style={{
                backgroundColor: "#cbe2d6",
                borderRadius: 10,
                width: "15%",
              }}
              startIcon={<ShoppingCartIcon />}
            >
              Add to Cart
            </Button>
          </div>
          <div style={styles.content}>
            <div style={styles.leftContent}>
              <CardMedia image={data[0] ? URL_IMG + data[0].img : null} component="img" />
            </div>
            <div style={styles.rightContent}>
              <h1>Composition Package:</h1>
              <div style={{ marginLeft: 15 }}>
                <ul>{this.renderCompos()}</ul>
              </div>
            </div>
          </div>
        </Paper>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "2% 1%",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          {this.renderDivCate()}
        </div>
        <div>
          <Dialog
            open={openErr}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Sorry Customer"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Maximum quantity for category {cateErr} is {maxQtyErr}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={errQtyToCart}
            onClose={() => this.setState({errQtyToCart : false})}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title2">
              {"Sorry Customer"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description2">
                Your product composition doesn't meet the requirement of this package.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={errCartEmpty}
            onClose={() => this.setState({errCartEmpty : false})}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title3">
              {"Sorry Customer"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description3">
                Your cart is still empty. Take some product to add to cart
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    minHeight: "100vh",
    height: "auto",
    width: "100vw",
    backgroundColor: "#cbe2d6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  rootContainer: {
    width: "80%",
    height: "80%",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: 300,
    marginTop: 10,
  },
  leftContent: {
    width: "30%",
    height: "100%",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  contentImage: {
    width: "15%",
  },
  rightContent: {
    display: "flex",
    flex: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    flexDirection: "column",
  },
  card: {
    height: 70,
    margin: "5px 3px",
    borderRadius: "10px",
    padding: "0px 10px",
  },
  contentArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
};

const MapStateToProps = (state) => {
  return {
    userId: state.userReducer.id,
  };
};

export default connect(MapStateToProps)(ProductPackageDetails);