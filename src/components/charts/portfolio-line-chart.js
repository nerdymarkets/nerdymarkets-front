import { Line } from 'react-chartjs-2';
import { Container, Spinner } from 'reactstrap';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useEquityDataStore from '@/stores/useEqutiyDataStore';
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const PortfolioLineChart = () => {
  const { equityData, loading } = useEquityDataStore();
  const labels = equityData.map((item) => item[''] || '');
  const portfolio1 = equityData.map((item) => parseFloat(item['1.0']) || 0);
  const portfolio2 = equityData.map((item) => parseFloat(item['2.0']) || 0);
  const portfolio3 = equityData.map((item) => parseFloat(item['3.0']) || 0);
  const spy = equityData.map((item) => parseFloat(item.SPY));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Low-Volatility Portfolio',
        data: portfolio1,
        borderColor: '#6A5ACD',
        borderWidth: 2,
        pointBackgroundColor: '#6A5ACD',
        pointHoverRadius: 6,
        pointRadius: 4,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Medium-Volatility Portfolio',
        data: portfolio2,
        borderColor: '#FFA500',
        borderWidth: 2,
        pointBackgroundColor: '#FFA500',
        pointHoverRadius: 6,
        pointRadius: 4,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'High-Volatility Portfolio)',
        data: portfolio3,
        borderColor: '#32CD32',
        borderWidth: 2,
        pointBackgroundColor: '#32CD32',
        pointHoverRadius: 6,
        pointRadius: 4,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Portfolio SPY',
        data: spy,
        borderColor: '#FF6347',
        borderWidth: 2,
        pointBackgroundColor: '#FF6347',
        pointHoverRadius: 6,
        pointRadius: 4,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: '#444',
        },
        ticks: {
          color: '#ddd',
        },
      },
      y: {
        grid: {
          color: '#444',
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
        },
        position: 'top',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#ddd',
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-2 rounded-2xl ">
      <h3 className="text-white text-3xl mb-4">
        All Portfolios VS SPY Benchmarks
      </h3>
      {loading ? (
        <Spinner className="text-customPink" />
      ) : (
        <div style={{ height: '400px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </Container>
  );
};

export default PortfolioLineChart;
