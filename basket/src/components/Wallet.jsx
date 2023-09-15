import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increamentBalans } from "../features/slices/walletSlice";
import { Link } from "react-router-dom";

const Wallet = () => {
  const [amounth, setAmounth] = useState(0);
  const walletAmounth = useSelector((state) => state.persistedReducer.wallet.balans);
  const dispatch = useDispatch();
  return (
    <div className="navBar" style={{backgroundColor:"blue"}}>
      <Link className="linkStyle" to="/basket">
        Basket
      </Link>
      <span className="bg-white text-primary p-2 rounded fs-5">Balance: {walletAmounth}</span>
      <input
        type="text"
        placeholder="Balance"
        value={amounth}
        onChange={(e) => setAmounth(e.target.value)}
      />
      <button
        className="btn btn-secondary"
        onClick={() => dispatch(increamentBalans(Number(amounth)))}
      >
        Add Amounth
      </button>
    </div>
  );
};

export default Wallet;
