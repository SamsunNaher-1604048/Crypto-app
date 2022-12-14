import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Crypto } from "../App";

const Header = () => {
  const navigate = useNavigate();
  const { currency, Setcurrency } = useContext(Crypto);
 
  const Hendelclick = () => {
    navigate("/");
  };
  return (
    <div className=" flex flex-row justify-around ">
      <div className="mt-4 md:text-3xl text-amber-400 text-xl">
        <h1 onClick={Hendelclick}>Crypto hunter</h1>
      </div>
      <div className="mt-4">
        <select
          className="bg-black border-2 border-white  outline-none rounded-xl md:h-11 md:w-28 h-9 w-20"
          value={currency}
          onChange={(e) => Setcurrency(e.target.value)}
        >
          <option value="BDT">BDT</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
