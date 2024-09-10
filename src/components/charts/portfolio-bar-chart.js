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

  const labels = ['Portfolio 1', 'Portfolio 2', 'Portfolio 3'];

  const getDailyData = () => {
    return labels.map((label, index) => {
      const portfolioNumber = `Portfolio_${index + 1}`;
      return performanceData.data.Daily[portfolioNumber]?.Portfolio_return ?? 0;
    });
  };

  const getAvgDailyReturnData = (type) => {
    return labels.map((label, index) => {
      const portfolioNumber = `Portfolio_${index + 1}`;
      return (
        performanceData.data[type][portfolioNumber]?.[
          'Avg. Daily Return [%]'
        ] ?? 0
      );
    });
  };
  const chartData = {
    labels,
    datasets: [
      {
        label:
          activeType === 'Daily'
            ? 'Portfolio Return (Daily)'
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
