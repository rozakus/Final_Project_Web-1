// import React Component
import React from "react";

// import library
import Axios from "axios";
import {connect} from 'react-redux'

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
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// import
import { URL } from "../actions";

// class component
class ProductPackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      productName: [],
      productId0: [],
      productId1: [],
      productId2: [],
      qty0: [],
      qty1: [],
      qty2: [],
      modal0: [],
      modal1: [],
      modal2: [],
      cate1: false,
      cate2: false,
      cate3: false
    };
  }

  async componentDidMount() {
    await Axios.get(URL + "/getPackage/" + this.props.location.search.slice(1))
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  }

  handleAddToCart = () => {
    const { data, productId0, productId1, productId2, qty0, qty1, qty2, modal0, modal1, modal2 } = this.state;

    console.log("add to cart");
    const user_id = this.props.userId
    const package_id = data[0].id_product_package
    const product_id = [...productId0, ...productId1, ...productId2]
    const product_qty = [...qty0, ...qty1, ...qty2]
    const total_modal = [...modal0, ...modal1, ...modal2]
    const total_sell = data[0].package_price
    const body = {
      user_id,
      package_id,
      product_id,
      product_qty,
      total_modal,
      total_sell
    }
    console.log(body)
  };

  pushToPackage = async (product) => {
    const { productName, productId1, productId2, productId0, qty1, qty2, qty0, modal1, modal2, modal0, data } = this.state;
    console.log(product);

    const tProductName = [...productName];
    const tProductId1 = [...productId1]
    const tProductId2 = [...productId2]
    const tProductId0 = [...productId0]
    const tQty1 = [...qty1]
    const tQty2 = [...qty2]
    const tQty0 = [...qty0]
    const tModal1 = [...modal1]
    const tModal2 = [...modal2]
    const tModal0 = [...modal0]
    
    if (product.category_id == data[0].product[0].category_id) {
      console.log(product.product_id)
      let checkId = tProductId0.filter(item => item == parseInt(product.product_id))
      console.log(checkId)
      const checkQty = tQty0.reduce((a, b) => a + b, 0)
      // console.log(checkQty)
      // console.log(data[0].max_qty)
      if (checkQty < data[0].max_qty) {
        tProductName.push(product.product_name);
        if (checkId.length === 0) {
          console.log('belum ada di array')
          tProductId0.push(parseInt(product.product_id))
          tQty0.push(1)
          tModal0.push(parseInt(product.price_modal))
        } else {
          console.log('ada di array')
          const id = tProductId0.findIndex(item => item == product.product_id)
          // console.log(id)
          tQty0[id] = tQty0[id] + 1
          tModal0[id] = tModal0[id] + parseInt(product.price_modal)
        }
      }
    } else if (product.category_id == data[1].product[1].category_id) {
      let checkId = tProductId1.filter(item => item == product.product_id)
      const checkQty = tQty1.reduce((a, b) => a + b, 0)
      if (checkQty < data[1].max_qty) {
        tProductName.push(product.product_name);
        if (checkId.length === 0) {
          tProductId1.push(product.product_id)
          tQty1.push(1)
          tModal1.push(parseInt(product.price_modal))
        } else {
          const id = tProductId1.findIndex(item => item == product.product_id)
          tQty1[id] = tQty1[id] + 1
          tModal1[id] = tModal1[id] + parseInt(product.price_modal)
        }
      }

    } else {
      let checkId = tProductId2.filter(item => item == product.product_id)
      const checkQty = tQty2.reduce((a, b) => a + b, 0)
      if (checkQty < data[2].max_qty) {
        tProductName.push(product.product_name);
        if (checkId.length === 0) {
          tProductId2.push(product.product_id)
          tQty2.push(1)
          tModal2.push(parseInt(product.price_modal))
        } else {
          const id = tProductId2.findIndex(item => item == product.product_id)
          tQty2[id] = tQty2[id] + 1
          tModal2[id] = tModal2[id] + parseInt(product.price_modal)
        }
      }
    }

    this.setState({ 
      productName: tProductName,
      productId0: tProductId0,
      productId1: tProductId1,
      productId2: tProductId2,
      qty0: tQty0,
      qty1: tQty1,
      qty2: tQty2,
      modal0: tModal0,
      modal1: tModal1,
      modal2: tModal2,
    });
  };

  renderCard = (dataProduct) => {
    return dataProduct.map((item, index) => {
      return (
        <Card
          style={styles.card}
          key={item.product_id}
          onClick={() => this.pushToPackage(item)}
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
            <h2>Category {item.category}</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {this.renderCard(item.product)}
          </div>
        </Paper>
      );
    });
  };

  render() {
    const { data, productId0, productId1, productId2, qty0, qty1, qty2, modal0, modal1, modal2 } = this.state;
    console.log("selectedProductPackage : ", data);
    console.log(productId0)
    console.log(productId1)
    console.log(productId2)
    console.log(qty0)
    console.log(qty1)
    console.log(qty2)
    console.log(modal0)
    console.log(modal1)
    console.log(modal2)

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
              <CardMedia image={data[0] ? data[0].img : null} component="img" />
            </div>
            <div style={styles.rightContent}>
              <h1>Composition Package:</h1>
              <div style={{ marginLeft: 15 }}>
                <ul>
                  {this.state.productName.map((item, index) => {
                    return <li>{item}</li>;
                  })}
                </ul>
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
    userId: state.userReducer.id
  }
}

export default connect(MapStateToProps)(ProductPackageDetails);
