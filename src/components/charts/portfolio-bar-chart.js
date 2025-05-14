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
import useWindowDimensions from '@/hooks/useWindowDimension';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PortfolioBarChart({ spyData, metricsData }) {
  const spyReturn = parseFloat(spyData.at(-1)?.cumulative_return || '0') * 100;
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
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
        backgroundColor: function (context) {
          const index = context.dataIndex;
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          if (index === 0) {
            gradient.addColorStop(0, '#ff5c5c');
            gradient.addColorStop(1, '#b10000');
          } else {
            gradient.addColorStop(0, '#5cd65c');
            gradient.addColorStop(1, '#267326');
          }
          return gradient;
        },
        borderRadius: 12,
        barPercentage: 0.5,
        categoryPercentage: 1.5,
        borderWidth: 2,
        borderColor: '#222',
        hoverBackgroundColor: ['#ff1a1a', '#339933'],
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
          size: isMobile ? 10 : 22,
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
      <h3 className="text-white text-xl sm:text-2xl lg:text-3xl mb-4">
        Portfolio vs. SPY Benchmark Cumulative Returns
      </h3>
      <div className="flex justify-center h-full">
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
