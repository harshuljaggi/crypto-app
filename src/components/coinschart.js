import React, { useEffect, useState, useCallback } from "react";
import { fetchResterData } from "./common/ajax";
import * as Utils from "./common/utils";
import Links from "./common/links";
import Dropdown from "./UI/dropdown";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CHART_DURATION = ["7", "30", "180", "360", "720"]; // Chart duration in days

const CoinsChart = (props) => {
  const [chartData, setChartData] = useState([]);
  const [duration, setDuration] = useState("7"); // start with 7 day duration selected in dropdown

  // Converts fetched data into time-series plotable format supported by charting library
  const parseChartData = useCallback(
    (data) => {
      const timeSeriesData = data.map((val) => {
        return {
          date: Utils.getDate(
            val[0],
            duration === "7" || duration === "30" ? true : false
          ),
          price: val[1],
        };
      });
      return timeSeriesData;
    },
    [duration]
  );

  useEffect(() => {
    const init = async () => {
      console.log("fetching chart data.");
      const result = await fetchResterData(
        Links.getChartDataURL(
          props.selectedCoin,
          props.selectedCurrency,
          duration
        )
      );
      if (result) {
        setChartData(parseChartData(result.prices));
      }
    };
    init();
  }, [duration, props.selectedCurrency, props.selectedCoin, parseChartData]);

  // handler for dropwdown change of chart duration in days
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  return (
    <React.Fragment>
      <Dropdown
        labelName={"Duration (In Days)"}
        selected={duration}
        handleChange={handleDurationChange}
        values={CHART_DURATION}
      />
      <LineChart
        width={props.chartWidth}
        height={props.chartHeight}
        data={chartData}
        margin={{
          top: 30,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          minTickGap={8}
          label={{ value: "Date", position: "insideBottomRight", offset: -10 }}
        />
        <YAxis dataKey="price" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dot={false}
          dataKey="price"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </React.Fragment>
  );
};

export default CoinsChart;
