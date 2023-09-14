import "./App.css";
import Product from "./components/Product.jsx";
import Basket from "./components/Basket.jsx";
import { BrowserRouter , Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Product/> } />
        <Route path="/basket" element={ <Basket/> } />
      </Routes>
    </BrowserRouter>
 
    </>
  );
}

export default App;
