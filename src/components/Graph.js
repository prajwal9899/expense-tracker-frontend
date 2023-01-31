import React from "react";
import { Doughnut } from "react-chartjs-2";
import Labels from "./Labels";
import { chartData, getTotal } from "../Helper/Helper";
import { default as api } from "../store/ApiSlice";
import { ArcElement, Chart } from "chart.js";

Chart.register(ArcElement);

const Graph = () => {
  chartData();
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

  let graphData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Doughnut {...chartData(data)} />;
  } else if (isError) {
    graphData = <div>Error</div>;
  }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              {getTotal(data) ?? 0}
            </span>
          </h3>
          <div className="flex flex-col py-10 gap-4">
            {/* labels */}
            <Labels />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
