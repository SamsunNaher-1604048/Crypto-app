import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Crypto } from "../../App";
import { SingleCoin } from "../../Api";
import Coinchart from "../Coinchart";
import { LinearProgress } from "@mui/material";

const Coinpage = () => {
  const { id } = useParams();
  const [Coin, Setcoin] = useState([]);
  const { currency, Symbol } = useContext(Crypto);
  const[day,Setday]=useState(1)

  const FetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id.toLowerCase()));
    Setcoin(data);
  };


  useEffect(() => {
    FetchCoin();
  }, []);

  return (
    <div>
      {Coin.id ? (
        <div className="flex lg:flex-row flex-col mt-9 ">
          <div className="lg:w-2/6 py-6 px-5 flex items-center flex-col w-screen  ">
            <img
              src={Coin.id ? Coin.image.large : " "}
              alt=""
              className="w-32 h-32 mb-5"
            />
            <p className=" text-center text-4xl font-bold">{Coin.name}</p>
            <p className=" text-center text-2xl mt-5 font-thin">
              Symbol: {Coin.symbol}
            </p>
            <p className=" text-center text-2xl font-thin ">
              Market Rank: {Coin.market_cap_rank}
            </p>
            <p className=" text-center text-2xl font-thin ">
              Current Price: {Symbol}
              {Coin.id ? (
                <>
                  {currency === "USD"
                    ? Coin.market_data.current_price.usd
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : Coin.market_data.current_price.bdt
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </>
              ) : (
                " "
              )}
            </p>
            <p className=" text-center text-2xl font-thin">
              Market Cap: {Symbol}
              {Coin.id ? (
                <>
                  {currency === "USD"
                    ? Coin.market_data.market_cap.usd
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        .slice(0, -6)
                    : Coin.market_data.market_cap.bdt
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        .slice(0, -6)}
                </>
              ) : (
                " "
              )}
              M
            </p>

            <div className="mt-10">
              <div>
                <button onClick={()=>Setday(30)} className="mr-5 border-2 h-9 w-36 border-amber-400 hover:bg-amber-400 hover:text-black rounded-sm">1 Month</button>
                <button  onClick={()=>Setday(90)} className="border-2 h-9 w-36 border-amber-400 hover:bg-amber-400 hover:text-black rounded-sm">3 Months</button>
              </div>
              <div className="mt-5">
                <button  onClick={()=>Setday(180)} className="mr-5 border-2 h-9 w-36 border-amber-400 hover:bg-amber-400 hover:text-black rounded-sm">6 Month</button>
                <button  onClick={()=>Setday(365)} className="border-2 h-9 w-36 border-amber-400 hover:bg-amber-400 hover:text-black rounded-sm">1 Year</button>
              </div>
            </div>
          </div>

          <div className="w-screen p-4 bg-black ">
            <Coinchart  Coin={Coin} days={day}/>
          </div>
          
        </div>

      ) : (
        <LinearProgress className="mx-20" sx={{ backgroundColor: "gold" }} />
      )}
    </div>
  );
};

export default Coinpage;
