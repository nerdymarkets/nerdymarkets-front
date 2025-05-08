import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Container } from 'reactstrap';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PortfolioCompositionPieChart({ portfolioValues }) {
  const labels = portfolioValues.map((item) => item.symbol);
  const rawData = portfolioValues.map((item) =>
    parseFloat(item.allocation_percent)
  );
  const total = rawData.reduce((sum, val) => sum + val, 0);
  const normalizedData = rawData.map((val) => (val / total) * 100);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Allocation (%)',
        data: normalizedData,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9C27B0',
          '#FF9800',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#ddd',
        },
      },
      tooltip: {
        backgroundColor: '#000',
        bodyColor: '#eee',
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed.toFixed(1)}%`,
        },
      },
      datalabels: {
        color: '#fff',
        formatter: (value) => `${value.toFixed(1)}%`,
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
  };

  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl">
      <h3 className="text-white text-3xl mb-4">
        Current Portfolio Composition
      </h3>
      <div style={{ height: '400px' }} className="flex justify-center">
        <Pie data={chartData} options={options} />
      </div>
    </Container>
  );
}

PortfolioCompositionPieChart.propTypes = {
  portfolioValues: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      allocation_percent: PropTypes.string.isRequired,
    })
  ).isRequired,
};
