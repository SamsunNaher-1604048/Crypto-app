import axios from "axios";
import React, { useContext, useEffect } from "react";
import { CoinList } from "../Api";
import { useState } from "react";
import { Crypto } from "../App";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const CoinTable = () => {
  const { currency, Symbol } = useContext(Crypto);
  const [Coin, Setcoin] = useState([]);
  const [Loading, Setloading] = useState(false);
  const [Search, Setsearch] = useState();
  const [Page, Setpage] = useState(1);
  const navigate = useNavigate();


  const Fetchcoin = async () => {
    Setloading(true);
    const { data } = await axios.get(CoinList(currency));
    Setcoin(data);
    if (Coin) {
      Setloading(false);
    }
  };
  

  useEffect(() => {
    Fetchcoin();
  }, [currency]);

  const Handelsearch = () => {
    if (Search) {
      return Coin.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(Search) ||
          coin.symbol.toLowerCase().includes(Search)
        );
      });
    } else {
      return Coin;
    }
  };

  const CoinDitils = (name) => {
    navigate(`/coin/${name}`);
  };

  return (
    <div className="mt-5 bg-black ">
      <div className="text-center md:text-3xl text-xl">
        <p>Cryptocurrency Price and Details</p>
      </div>
      <div className="flex justify-center mt-6">
        <input
          placeholder="Search Here........"
          className="outline-none w-5/6 h-10 bg-black border-2 p-2 rounded-lg"
          value={Search}
          onChange={(e) => Setsearch(e.target.value)}
        />
      </div>

      <div className="mt-9 md:mx-20 mx-1">
        <TableContainer>
          {Loading ? (
            <LinearProgress
              className="mx-20"
              sx={{ backgroundColor: "gold" }}
            />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market cap"].map(
                    (head, index) => {
                      return (
                        <TableCell
                          key={index}
                          style={{
                            backgroundColor: "white",
                            textAlign: "center",
                          }}
                        >
                          {head}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {Handelsearch()
                  .slice((Page - 1) * 10, (Page - 1) * 10 + 10)
                  .map((row, index) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        key={index}
                        onClick={() => {
                          CoinDitils(row.id);
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 5,
                            justifyContent: "center",
                          }}
                        >
                          <div className="text-white flex justify-center flex-col items-center ">
                            <img
                              src={row.image}
                              alt=" "
                              className="md:h-10 h-6"
                            />
                            <p className="md:text-lg text-sm text-center ">
                              {row.name}
                            </p>
                            <p className="text-sm text-center">{row.symbol}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-white text-center md:text-xl text-xs">
                            {Symbol}{" "}
                            {row.current_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p
                            className={
                              profit > 0 ? "text-green-600" : "text-red-600 "
                            }
                          >
                            {profit > 0 ? "+" : " "}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="text-white md:text-xl text-xs text-center">
                            {Symbol}{" "}
                            {row.market_cap
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              .slice(0, -6)}
                            M
                          </p>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
      <div className=" flex justify-center mt-3 pb-3">
        {Search?<></>:<Pagination
          count={Coin.length / 10}
          style={{ backgroundColor: "white", borderRadius: 10, padding: 3 }}
          onChange={(e) => {
            Setpage(e.target.textContent);
            window.scroll(0,400)
          }}
        />}
      </div>
    </div>
  );
};

export default CoinTable;
