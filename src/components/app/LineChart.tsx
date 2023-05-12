import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  ChartOptions,
  Chart,
  LinearScale,
  TimeScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import "chart.js";

Chart.register(
  LinearScale,
  TimeScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip
);

interface Option {
  label: string;
  value: string;
}

interface Data {
  labels: string[];
  income: number[];
  expenses: number[];
}

interface DateData {
  total: number;
  upDown: number;
  data: Data;
}

interface ChartData {
  [key: string]: DateData;
}

const LineChart: React.FC = () => {
  const [date, setDate] = useState<string>("today");
  const [options] = useState<Option[]>([
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "7days" },
    { label: "Last 30 Days", value: "30days" },
    { label: "Last 6 Months", value: "6months" },
    { label: "This Year", value: "year" },
  ]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/swindon/fake-api@master/tailwindAlpineJsChartJsEx1.json"
    )
      .then((res) => res.json())
      .then((res) => {
        setChartData(res.dates);
      });
  }, []);

  const selectOption = (index: number) => {
    setSelectedOption(index);
    setDate(options[index].value);
  };

  const data = {
    labels: chartData?.[date].data.labels,
    datasets: [
      {
        label: "Income",
        backgroundColor: "rgba(102, 126, 234, 0.25)",
        borderColor: "rgba(102, 126, 234, 1)",
        pointBackgroundColor: "rgba(102, 126, 234, 1)",
        data: chartData?.[date].data.income,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (tickValue: string | number): string | number => {
            const value = Number(tickValue);
            return value > 1000
              ? value < 1000000
                ? (value / 1000).toFixed(0) + "K"
                : (value / 1000000).toFixed(0) + "M"
              : value.toFixed(0);
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },

    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
      },
    },
  };

  return (
    <div className='bg-transparent flex items-center justify-center'>
      <div className='text-black rounded shadow-xl w-full lg:w-full'>
        <div className='flex flex-wrap items-end'>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold leading-tight'>Income</h3>
          </div>
          <div className='relative'>
            <button
              className='text-xs hover:text-gray-300 h-6 focus:outline-none'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{options[selectedOption].label}</span>
              <i className='ml-1 mdi mdi-chevron-down'></i>
            </button>
            {showDropdown && (
              <div className='bg-gray-700 shadow-lg rounded text-sm absolute top-auto right-0 min-w-full w-32 z-30 mt-1 -mr-3'>
                <span className='absolute top-0 right-0 w-3 h-3 bg-gray-700 transform rotate-45 -mt-1 mr-3'></span>
                <div className='bg-gray-700 rounded w-full relative z-10 py-1'>
                  <ul className='list-reset text-xs'>
                    {options.map((item, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 hover:bg-gray-600 hover:text-white transition-colors duration-100 cursor-pointer ${
                          index === selectedOption ? "text-white" : ""
                        }`}
                        onClick={() => {
                          selectOption(index);
                          setShowDropdown(false);
                        }}
                      >
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-wrap items-end mb-5'>
          <h4
            className='text-2xl lg:text-3xl text-white font-semibold leading-tight inline-block mr-2'
            x-text="'$'+(chartData.data?chartData.data[chartData.date].total.comma_formatter():0)"
          >
            {chartData && "$" + chartData[date].total.toLocaleString()}
          </h4>
        </div>
        <div>
          <Line data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
