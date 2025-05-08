import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PortfolioBarChart({ spyData, metricsData }) {
  const spyReturn = parseFloat(spyData.at(-1)?.cumulative_return || '0') * 100;

  const rawPortfolioReturn = metricsData[0]?.Return || '0%';
  const cleanedPortfolioReturn = parseFloat(
    rawPortfolioReturn.replace('%', '').trim()
  );

  const data = {
    labels: ['SPY', 'Portfolio'],
    datasets: [
      {
        label: 'Cumulative Return (%)',
        data: [spyReturn.toFixed(2), cleanedPortfolioReturn.toFixed(2)],
        backgroundColor: '#FF5733',
        borderColor: ['#fff'],
        borderWidth: 2,
        borderRadius: 100,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#ddd' } },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#eee',
      },
      datalabels: {
        display: true,
        color: '#fff',
        anchor: 'center',
        align: 'start',
        font: {
          weight: 'bold',
          size: 22,
        },
        formatter: (value) => `${value}%`,
      },
    },
    scales: {
      x: {
        ticks: { color: '#ddd' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#ddd' },
        grid: { color: '#444' },
      },
    },
  };

  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl cursor-pointer ">
      <h3 className="text-white text-3xl mb-4">
        Portfolio vs. SPY Benchmark Cumulative Returns
      </h3>
      <div style={{ height: '350px' }} className="flex justify-center">
        <Bar data={data} options={options} />
      </div>
    </Container>
  );
}

PortfolioBarChart.propTypes = {
  spyData: PropTypes.arrayOf(
    PropTypes.shape({
      cumulative_return: PropTypes.string,
    })
  ).isRequired,
  metricsData: PropTypes.arrayOf(
    PropTypes.shape({
      Return: PropTypes.string,
    })
  ).isRequired,
};
