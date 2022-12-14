import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TrendingCoins } from "../Api";
import { Crypto } from "../App";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [Tranding, Settranding] = useState([]);
  const { currency, Symbol } = useContext(Crypto);
  const featchtandingcoin = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    Settranding(data);
  };


  useEffect(() => {
    featchtandingcoin();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = Tranding.map((coin) => {
    return (
      <div className="flex justify-center items-center" >
        <Link to={"/coin/${coin.id}"}>
          <img className="h-24" src={coin.image} alt=" " />
          <div className="text-center">
            <p>{coin.name}</p>

            <p className="text-xl">
              {Symbol}
              {coin.current_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className=" flex mx-8 md:mx-20 my-20">
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        responsive={responsive}
        autoPlay
        disableDotsControls
        items={items}
      />
    </div>
  );
};

export default Carousel;
