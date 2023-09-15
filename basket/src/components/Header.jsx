import React from "react";
import { useSelector } from "react-redux";
import { BsFillBasket3Fill } from "react-icons/bs";

const Header = () => {
  const totalPrice = useSelector(
    (state) => state.persistedReducer.basket.totalPrice
  );
  const totalAmount = useSelector(
    (state) => state.persistedReducer.basket.totalAmount
  );

  return (
    <>
      <div className="navBar">
        <h1>
          <span className="bskt">Sum:</span> {totalPrice}
        </h1>
        <h1>
          <span className="mx-2 bskt">
            <BsFillBasket3Fill />
          </span>
          <span className="fs-3">{totalAmount}</span>
        </h1>
      </div>
    </>
  );
};

export default Header;
