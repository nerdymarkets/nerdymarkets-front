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

const PortfolioLineChart = ({ performanceData }) => {
  const timelines = ['YTD', 'Monthly', 'Inception'];
  const portfolios = ['Portfolio_1', 'Portfolio_2', 'Portfolio_3', 'SPY'];
  const extractPerformanceData = (portfolio) => {
    return timelines.map((timeline) => {
      const timelineData = performanceData.data[timeline][portfolio];
      if (timelineData && timelineData['Total Performance [%]'] !== undefined) {
        return timelineData['Total Performance [%]'];
      }
      return 0;
    });
  };

  const datasets = portfolios.map((portfolio, index) => {
    const data = extractPerformanceData(portfolio);

    return {
      label: portfolio === 'SPY' ? 'SPY' : `Portfolio ${index + 1}`,
      data,
      fill: false,
      borderColor:
        portfolio === 'SPY'
          ? 'rgba(75, 192, 192, 1)'
          : `rgba(${(index + 1) * 50}, 99, 132, 1)`,
      tension: 0.1,
    };
  });

  const data = {
    labels: timelines,
    datasets,
  };
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timeline',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Performance [%]',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

PortfolioLineChart.propTypes = {
  performanceData: PropTypes.object.isRequired,
};

export default PortfolioLineChart;
