import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { BsWalletFill } from "react-icons/bs";
import { FaCommentDollar } from "react-icons/fa";
import { decrementAmounth } from "../features/slices/walletSlice";

import { Link } from "react-router-dom";
import {
  removeFromCart,
  increament,
  decrement,
  clearBasket,
  filterProduct,
  sortData,
} from "../features/slices/basketSlice";

const Basket = () => {
  const products = useSelector((state) => state.persistedReducer.basket.basket);

  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    (state) => state.persistedReducer.basket.filteredBasket
  );
  const myBalance = useSelector(
    (state) => state.persistedReducer.wallet.balans
  );
  const totalPrice = useSelector(
    (state) => state.persistedReducer.basket.totalPrice
  );
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  // console.log("FilteredProducts:", filteredProducts);

  const searchProduct = (event) => {
    const searchTerm = event.target.value;
    // console.log("SearchTerm:", searchTerm);
    setSearchValue(searchTerm);
    dispatch(filterProduct(searchTerm));
  };

  const sortProduct = (event) => {
    const sortValue = event.target.value;
    setSortBy(sortValue);
    dispatch(sortData(sortValue));
  };

  const handlePayment = () => {
    if (myBalance >= totalPrice) {
      dispatch(decrementAmounth(totalPrice));
      dispatch(clearBasket())
    } else {
      alert("Balance is not enough");
    }
  };

  return (
    <>
      <nav className="navBar" style={{ backgroundColor: "red" }}>
        <h2 className="text-white m-2">Basket Page</h2>

        <button
          className="btn btn-warning text-white px-3"
          onClick={() => dispatch(clearBasket())}
        >
          Clear
        </button>

        <button
          className="btn  btn-warning text-white fs-3"
          onClick={handlePayment}
        >
          <span>Pay: </span>
          <span>
            <FaCommentDollar />
          </span>
        </button>

        <span className="fs-1">
          <span className="text-warning">
            <BsWalletFill />
          </span>
          <span className="text-white fs-2"> {myBalance}</span>
        </span>

        <select
          className="py-2 px-1 border rounded ms-2"
          value={sortBy}
          onChange={sortProduct}
        >
          <option value="title">Sort by Title</option>
          <option value="category">Sort by Category</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
        <div>
          <Link to="/" className="linkStyle">
            Home
          </Link>
          <Link to="/wallet" className="linkStyle">
            Wallet
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search"
          onChange={searchProduct}
          value={searchValue}
        />
      </nav>
      {/* <div className="d-flex justfy-content-center align-items-center flex-wrap">
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
      </div> */}
      <div className="d-flex justfy-content-center align-items-center flex-wrap">
        {searchValue === "" ? (
          products.map((product) => {
            return (
              <div key={product.id}>
                <Card
                  style={{ width: "19rem", height: "41rem" }}
                  className="card"
                >
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
                    <div className="d-flex justfy-content-center align-items-center ms-5">
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => dispatch(removeFromCart(product))}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => dispatch(decrement(product))}
                      >
                        -
                      </Button>
                      <p className="mx-2 mt-3">{product.amount}</p>
                      <Button
                        variant="success"
                        onClick={() => dispatch(increament(product))}
                      >
                        +
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : filteredProducts.length === 0 ? (
          <p>No matching products found</p>
        ) : (
          filteredProducts.map((product) => {
            return (
              <div key={product.id}>
                <Card
                  style={{ width: "19rem", height: "41rem" }}
                  className="card"
                >
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
                    <div className="d-flex justfy-content-center align-items-center ms-5">
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => dispatch(removeFromCart(product))}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => dispatch(decrement(product))}
                      >
                        -
                      </Button>
                      <p className="mx-2 mt-3">{product.amount}</p>
                      <Button
                        variant="success"
                        onClick={() => dispatch(increament(product))}
                      >
                        +
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Basket;
