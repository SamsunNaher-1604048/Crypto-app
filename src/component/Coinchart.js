import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Crypto } from "../App";
import { HistoricalChart } from "../Api";
import CircularProgress from "@mui/material/CircularProgress";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Coinchart = ({ Coin,days }) => {
  const [historical, Sethistorical] = useState([]);
  const { currency } = useContext(Crypto);

  const Fetchhistorical = async () => {
    if (Coin.id) {
      const { data } = await axios.get(
        HistoricalChart(Coin.id, days, currency)
      );
      Sethistorical(data.prices);
    }
  };

  useEffect(() => {
    Fetchhistorical();
  }, [days, currency]);

  const datas = {
    labels: historical.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;

      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: historical.map((coin) => coin[1]),
        label: `price (past${days} Days) in ${currency}`,
        borderColor: " #fbbf24",
      },
    ],
    
  };


  return (
    <div className="h-96 ">
      <div>{!historical ? <CircularProgress /> : <Line data={datas} />}</div>
      
    </div>
  );
};

export default Coinchart;
