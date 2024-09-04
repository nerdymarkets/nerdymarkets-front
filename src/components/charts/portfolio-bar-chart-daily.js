import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioBarChartDaily = ({ dailyData }) => {
  const tickers = [...new Set(dailyData.map((item) => item.Ticker))];
  const portfolios = [...new Set(dailyData.map((item) => item.Portfolio))];
  const colorPalette = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
  const chartData = {
    labels: tickers,
    datasets: portfolios.map((portfolio, index) => {
      const portfolioData = dailyData.filter(
        (item) => item.Portfolio === portfolio
      );
      const data = tickers.map((ticker) => {
        const tickerData = portfolioData.find((item) => item.Ticker === ticker);
        return tickerData ? tickerData.daily_return : 0;
      });

      return {
        label: `Portfolio ${portfolio}`,
        data: data,
        backgroundColor: colorPalette[index % colorPalette.length],
        borderWidth: 1,
      };
    }),
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Daily Returns',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Daily Return',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Ticker',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
PortfolioBarChartDaily.propTypes = {
  dailyData: PropTypes.array,
};
export default PortfolioBarChartDaily;
