import "./App.css";
import Product from "./components/Product.jsx";
import Basket from "./components/Basket.jsx";
import Wallet from "./components/Wallet.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
