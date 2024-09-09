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
  const labels = ['Monthly', 'YTD', 'Inception'];
  const portfolios = ['Portfolio_1', 'Portfolio_2', 'Portfolio_3'];

  const datasets = portfolios.map((portfolio, index) => {
    const data = labels.map((label) => {
      if (performanceData.data[label]) {
        const portfolioPath = Object.keys(performanceData.data[label]).find(
          (key) => key.includes(`${portfolio}`) && key.includes('metrics')
        );

        return portfolioPath
          ? performanceData.data[label][portfolioPath]?.data?.[0][
              'Total Performance [%]'
            ]
          : 0;
      }
      return 0;
    });

    return {
      label: `Portfolio ${index + 1}`,
      data,
      fill: false,
      borderColor: `rgba(${(index + 1) * 50}, 99, 132, 1)`,
      tension: 0.1,
    };
  });

  const spyData = labels.map((label) => {
    if (performanceData.data[label]) {
      const spyPath = Object.keys(performanceData.data[label]).find((key) =>
        key.includes('Portfolio_SPY_metrics')
      );

      return spyPath
        ? performanceData.data[label][spyPath]?.data?.[0][
            'Total Performance [%]'
          ]
        : 0;
    }
    return 0;
  });

  datasets.push({
    label: 'SPY',
    data: spyData,
    fill: false,
    borderColor: 'rgba(75, 192, 192, 1)',
    tension: 0.1,
  });

  const data = {
    labels,
    datasets,
  };

  return <Line data={data} />;
};

PortfolioLineChart.propTypes = {
  performanceData: PropTypes.object.isRequired,
};

export default PortfolioLineChart;
