import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Container, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import useWindowDimensions from '@/hooks/useWindowDimension';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PortfolioPieChart = ({ portfolioData }) => {
  const { width } = useWindowDimensions();
  const [activePortfolio, setActivePortfolio] = useState(
    'Low-Volatility Portfolio'
  );

  const portfolio1 = portfolioData.filter((item) => item.Group === '1');
  const portfolio2 = portfolioData.filter((item) => item.Group === '2');
  const portfolio3 = portfolioData.filter((item) => item.Group === '3');

  const createChartData = (portfolioData) => ({
    labels: portfolioData.map((item) => item.Ticker),
    datasets: [
      {
        label: 'Portfolio Composition (Weights)',
        data: portfolioData.map((item) => item.Allocation * 100),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#66FF66',
          '#FF6666',
          '#6666FF',
          '#FF66CC',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
        bottom: `${width <= 768 ? '40' : '30'}`,
        left: `${width <= 425 ? '50' : '0'}`,
        right: `${width <= 425 ? '50' : '0'}`,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`,
        },
      },
      datalabels: {
        display: true,
        color: '#fff',
        anchor: 'end',
        align: 'end',
        offset: 5,
        formatter: (value, context) => {
          const ticker = context.chart.data.labels[context.dataIndex];
          return `${ticker}: ${value.toFixed(2)}%`;
        },
        labels: {
          outside: true,
        },
        font: {
          size: `${width <= 426 ? '8' : '16'}`,
        },
        clip: false,
      },
    },
  };

  const portfolioTitles = [
    'Low-Volatility Portfolio',
    'Medium-Volatility Portfolio',
    'High-Volatility Portfolio',
  ];

  const portfolioMap = {
    'Low-Volatility Portfolio': portfolio1,
    'Medium-Volatility Portfolio': portfolio2,
    'High-Volatility Portfolio': portfolio3,
  };

  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl ">
      <h2 className="text-3xl text-white text-center mb-4">
        Portfolio Composition by Weight as of
      </h2>
      <p className="text-center text-white text-sm mb-4">
        Hover for weight details
      </p>
      <div className="text-center mb-4">
        {portfolioTitles.map((title) => (
          <Button
            key={title}
            className={`m-2 border-none rounded-lg ${activePortfolio === title ? 'bg-customPink hover:bg-customPinkSecondary' : 'bg-gray-500'}`}
            onClick={() => setActivePortfolio(title)}
          >
            {title}
          </Button>
        ))}
      </div>

      <h3 className="text-white text-center">{activePortfolio}</h3>
      <div className="flex justify-center items-center mt-4  lg:h-[600px] h-[300px]  ">
        <Pie
          data={createChartData(portfolioMap[activePortfolio])}
          options={options}
        />
      </div>
    </Container>
  );
};
PortfolioPieChart.propTypes = {
  portfolioData: PropTypes.arrayOf(
    PropTypes.shape({
      '': PropTypes.string.isRequired,
      Date: PropTypes.string.isRequired,
      Ticker: PropTypes.string.isRequired,
      'Expiration Date': PropTypes.string.isRequired,
      Group: PropTypes.string.isRequired,
      Allocation: PropTypes.string.isRequired,
      Avg_IV_moneyness: PropTypes.string.isRequired,
      'Sharpe Ratio': PropTypes.string.isRequired,
      'Underlying Price': PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default PortfolioPieChart;
