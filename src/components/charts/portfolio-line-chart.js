import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const PortfolioLineChart = ({ portfolios }) => {
  const dates = [...new Set(portfolios.map((item) => item['Date']))];
  const spyData = portfolios.filter((item) => item.Ticker === 'SPY');
  const portfoliosData = portfolios.filter((item) => item.Ticker !== 'SPY');
  const spyValues = dates.map((date) => {
    const dataPoint = spyData.find((item) => item.Date === date);
    return dataPoint ? dataPoint['Underlying Price'] : null;
  });
  const portfoliosByTicker = {};
  portfoliosData.forEach((item) => {
    if (!portfoliosByTicker[item.Ticker]) {
      portfoliosByTicker[item.Ticker] = Array(dates.length).fill(null);
    }
    const dateIndex = dates.indexOf(item.Date);
    portfoliosByTicker[item.Ticker][dateIndex] = item['Underlying Price'];
  });

  // Data for Chart.js
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'SPY Benchmark',
        data: spyValues,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
      ...Object.keys(portfoliosByTicker).map((ticker) => ({
        label: ticker,
        data: portfoliosByTicker[ticker],
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        borderWidth: 2,
        fill: false,
      })),
    ],
  };

  return <Line data={data} />;
};

PortfolioLineChart.propTypes = {
  portfolios: PropTypes.array,
};

export default PortfolioLineChart;
