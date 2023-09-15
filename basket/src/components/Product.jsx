import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/slices/basketSlice";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const baseUrl = "https://dummyjson.com/products";
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.persistedReducer.basket.basket);
  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTitle, setSortTitle] = useState("");
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });
  const handleFilter =  (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };
  // Search End

  const sortProduct =  (event) => {
    const sortBy = event.target.value;
    const sortedData = [...filteredProducts];
    sortedData.sort( (a, b) => {
      if (sortBy === "title" || sortBy === "category") {
        return a[sortBy].localeCompare(b[sortBy]);
      } 
      else if (sortBy === "price" || sortBy === "rating") {
        return a[sortBy] - b[sortBy];
      }
   
      return 0;
    });
    setSortTitle(sortBy)
    setProducts(sortedData)
  };

  const isExistCart = (productId) => {
    return cart.some((product) => product.id === productId);
  };

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
      <nav className="navBar" style={{backgroundColor: "red"}}>
        <Link className="linkStyle" to="/basket">
          Basket
        </Link>

        <select className="py-2 px-1 border rounded ms-2"
         value={sortTitle} onChange={sortProduct}>
          <option value="title">Sort by Title</option>
          <option value="category">Sort by Category</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>

        <input
          type="text"
          onChange={handleFilter}
          value={searchTerm}
          placeholder="Search"
        />
      </nav>

      <div className="d-flex justfy-content-center align-items-center flex-wrap">
        {filteredProducts.length > 0 &&
          filteredProducts.map((product) => {
            const isAlreadyInCart = isExistCart(product.id);
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
                            discountPercentage: product.discountPercentage,
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
