import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PortfolioBarChart = ({ performanceData }) => {
  const [activeType, setActiveType] = useState('Daily');
  const latestDailyKey = Object.keys(performanceData.data.Daily).find((key) =>
    key.includes('etf_returns.csv')
  );
  const labels =
    activeType === 'Daily'
      ? performanceData.data.Daily[latestDailyKey].data.map(
          (item) => item.Ticker
        )
      : ['Portfolio 1', 'Portfolio 2', 'Portfolio 3'];

  const getDailyData = () => {
    const dailyReturns = performanceData.data.Daily[latestDailyKey].data.map(
      (item) => {
        return item.daily_return;
      }
    );
    return dailyReturns;
  };
  const getAvgDailyReturnData = (type) => {
    const typeKeys = Object.keys(performanceData.data[type]);
    const portfolioKeys = typeKeys.filter(
      (key) => key.includes('Portfolio_') && key.includes('metrics')
    );
    return portfolioKeys.map((key) => {
      const portfolioData = performanceData.data[type][key];
      return portfolioData?.data?.[0]?.['Avg. Daily Return [%]'] ?? 0;
    });
  };

  const chartData = {
    labels,
    datasets: [
      {
        label:
          activeType === 'Daily'
            ? 'Daily Returns'
            : `Avg. Daily Return (${activeType})`,
        data:
          activeType === 'Daily'
            ? getDailyData()
            : getAvgDailyReturnData(activeType),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        {['Daily', 'Monthly', 'YTD', 'Inception'].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 mx-2 text-white ${
              activeType === type ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <Bar data={chartData} />
    </div>
  );
};

PortfolioBarChart.propTypes = {
  performanceData: PropTypes.object.isRequired,
};

export default PortfolioBarChart;
