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

import useDailyInceptionDataStore from '@/stores/useDailyInceptionDataStore';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PortfolioBarChart = () => {
  const [activeType, setActiveType] = useState('Daily'); // Active type (Daily or Inception)
  const labels = [
    'Low-Volatility Portfolio',
    'Medium-Volatility Portfolio',
    'High-Volatility Portfolio',
  ];

  // Accessing Zustand data
  const daily = useDailyInceptionDataStore((state) => state.daily);

  // Get Daily Data
  const getDailyData = () => {
    if (!daily || daily.length === 0) {
      return labels.map(() => 0); // Return 0 if no data
    }

    return daily.map((portfolio) => {
      // Extract "DailyReturn", remove "%" and convert to number
      const dailyReturn =
        parseFloat(portfolio.DailyReturn.replace('%', '')) || 0;
      return dailyReturn;
    });
  };

  // Get Inception Data (if needed in the future)
  const getInceptionData = () => {
    if (!daily || daily.length === 0) {
      return labels.map(() => 0);
    }

    // Example processing for inception data (adjust as needed)
    return daily.map((portfolio) => {
      const inceptionReturn =
        parseFloat(portfolio.CumulativePL.replace('%', '')) || 0;
      return inceptionReturn;
    });
  };

  // Chart Data
  const chartData = {
    labels,
    datasets: [
      {
        label: `Return [%] (${activeType})`,
        data: activeType === 'Daily' ? getDailyData() : getInceptionData(),
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

  // Chart Options
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
      <h1 className="text-white text-3xl pb-4">Returns Across Portfolios</h1>
      <div className="mb-4 lg:flex lg:justify-center grid gap-2 ">
        {['Daily', 'Inception'].map((type) => (
          <Button
            key={type}
            className={`px-4 py-2 mx-2 text-white border-none ${
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

export default PortfolioBarChart;
