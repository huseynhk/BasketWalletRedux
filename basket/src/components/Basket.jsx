import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {removeFromCart , increament , decrement , clearBasket} from "../features/slices/basketSlice"

const Basket = () => {
  const cart = useSelector((state) => state.persistedReducer.basket.basket);
  const totalPrice = useSelector((state) => state.persistedReducer.basket.totalPrice)
  const dispatch = useDispatch()

  return (
    <>
      <nav>
        <h2 className="text-white m-2">Basket Page</h2>
        <h1 className="text-white m-2">Sum: {totalPrice}</h1>
        <button className="btn btn-warning m-2" onClick={()=> dispatch(clearBasket())}>Clear</button>
        <p>
          <Link to="/" className="linkStyle">
            Home
          </Link>
        </p>
      </nav>
      <div className="d-flex justfy-content-center align-items-center flex-wrap">
        {cart.map((product) => (
          <Card style={{ width: "19rem", height: "41rem" }} className="card">
            <Card.Img
              variant="top"
              src={product.images}
              style={{
                width: "18rem",
                height: "15rem",
                objectFit: "cover",
              }}
            />
            <Card.Body>
              <Card.Title>Title:{product.title}</Card.Title>
              <Card.Text>Desc:{product.description.slice(0, 25)}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Price:{product.price}</ListGroup.Item>
              <ListGroup.Item>
                DisCount:{product.discountPercentage}
              </ListGroup.Item>
              <ListGroup.Item>Rating:{product.rating}</ListGroup.Item>
              <ListGroup.Item>Brand:{product.brand}</ListGroup.Item>
              <ListGroup.Item>Category:{product.category}</ListGroup.Item>
              <ListGroup.Item>TotalPrice:{product.totalPrice}</ListGroup.Item>

            </ListGroup>
            <Card.Body>
              <div className="d-flex justfy-content-center align-items-center ms-5" >
               <Button variant="danger" className="me-2" onClick={()=> dispatch(removeFromCart(product))}>Delete</Button>
                <Button variant="secondary" onClick={()=> dispatch(decrement(product))}>-</Button>
                <p className="mx-2 mt-3">{product.amount}</p>
                <Button variant="success" onClick={()=> dispatch(increament(product))}>+</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

    
    </>
  );
};

export default Basket;
