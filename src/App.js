import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Homepage from "./component/page/Homepage";
import Coinpage from "./component/page/Coinpage";
import { createContext } from "react";

export const Crypto = createContext();

const App = () => {
  const [currency, Setcurrency] = useState("BDT");
  const [Symbol, Setsymbol] = useState("৳");


  useEffect(() => {
    if (currency === "BDT") {
      Setsymbol("৳");
    }
    if (currency === "USD") {
      Setsymbol("$");
    }
  }, [currency]);
  return (
    <BrowserRouter>
      <Crypto.Provider value={{ currency, Setcurrency, Symbol }}>
        <div className="bg-black h-screen  text-white">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coin/:id" element={<Coinpage />} />
          </Routes>
        </div>
      </Crypto.Provider>
    </BrowserRouter>
  );
};

export default App;
