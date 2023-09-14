import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useDispatch , useSelector} from "react-redux";
import { addToCart } from "../features/slices/basketSlice";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const baseUrl = "https://dummyjson.com/products";
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.persistedReducer.basket.basket)
  console.log("cart" , cart)

  const isExistCart = (productId) => {
   return cart.some((product) => product.id === productId)
  }


  
  const getProduct = async () => {
    try {
      const response = await axios.get(baseUrl);
      if (response.status !== 200) {
        alert("Wrong");
      } else {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
     <div><Link className="linkStyle" to="/basket">Basket</Link></div>
      <div className="d-flex justfy-content-center align-items-center flex-wrap">
        {products.length > 0 &&
          products.map((product) => {
          const isAlreadyInCart = isExistCart(product.id)
            return (
              <div key={product.id}>
                <Card
                  style={{ width: "19rem", height: "41rem" }}
                  className="card"
                >
                  <Card.Img
                    variant="top"
                    src={product.images[0]}
                    style={{
                      width: "18rem",
                      height: "15rem",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>Title:{product.title}</Card.Title>
                    <Card.Text>
                      Desc:{product.description.slice(0, 20)}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Price:{product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      DisCount:{product.discountPercentage}
                    </ListGroup.Item>
                    <ListGroup.Item>Rating:{product.rating}</ListGroup.Item>
                    <ListGroup.Item>Brand:{product.brand}</ListGroup.Item>
                    <ListGroup.Item>Category:{product.category}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button
                      variant="primary"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: product.id,
                            price: product.price,
                            amount: 1,
                            images: product.images[0],
                            totalPrice: product.price,
                            title: product.title,
                            description: product.description,
                            rating: product.rating,
                            brand: product.brand,
                            category: product.category,
                            discountPercentage:product.discountPercentage
                          })
                        )
                      }
                    >
                    {isAlreadyInCart ? "Added" : "AddTo Cart"}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Product;
