import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button } from 'reactstrap';
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
  const labels = [
    'Low-Volatility Portfolio',
    'Medium-Volatility Portfolio',
    'High-Volatility Portfolio',
  ];

  const getDailyData = () => {
    if (!performanceData.data || !performanceData.data.Daily) {
      return labels.map(() => 0);
    }

    return labels.map((_, index) => {
      const portfolioNumber = `Portfolio_${index + 1}`;
      return Number(
        (
          (performanceData.data.Daily[portfolioNumber]?.Portfolio_return ?? 0) *
          100
        ).toFixed(3)
      );
    });
  };

  const getAvgDailyReturnData = (type) => {
    if (!performanceData.data || !performanceData.data[type]) {
      return labels.map(() => 0);
    }

    return labels.map((_, index) => {
      const portfolioNumber = `Portfolio_${index + 1}`;
      return Number(
        (
          performanceData.data[type][portfolioNumber]?.[
            'Total Performance [%]'
          ] ?? 0
        ).toFixed(3)
      );
    });
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: `Total Return [%] (${activeType})`,
        data:
          activeType === 'Daily'
            ? getDailyData()
            : getAvgDailyReturnData(activeType),
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.9)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
          return gradient;
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        hoverBorderColor: '#fff',
        hoverBorderWidth: 3,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#ddd',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ddd',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#ddd',
          boxWidth: 20,
        },
        position: 'top',
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#ddd',
        borderColor: '#fff',
        borderWidth: 1,
        padding: 10,
      },
    },
  };

  return (
    <div className="bg-customBlack lg:p-5 p-4 rounded-2xl">
      <h1 className="text-white text-3xl pb-4">
        Dynamic Of Each Portfolio Returns
      </h1>
      <div className="mb-4 lg:flex lg:justify-center grid gap-2 ">
        {['Daily', 'Monthly', 'YTD', 'Inception'].map((type) => (
          <Button
            key={type}
            className={`px-4 py-2 mx-2 text-white border-none  ${
              activeType === type
                ? 'bg-customPink hover:bg-customPinkSecondary'
                : 'bg-gray-500'
            }`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      <div style={{ height: '400px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

PortfolioBarChart.propTypes = {
  performanceData: PropTypes.object.isRequired,
};

export default PortfolioBarChart;
