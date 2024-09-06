import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const UserStatisticsPieChart = ({ keyMetrics }) => {
  const { totalActiveSubscribers, totalUsers } = keyMetrics;
  const data = {
    labels: ['Active Subscribers', 'Total Users'],
    datasets: [
      {
        label: 'User Statistics',
        data: [totalActiveSubscribers, totalUsers],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 16,
            family: 'Arial, sans-serif',
          },
          color: '#FFFFFF',
        },
      },
    },
  };
  return (
    <div
      style={{ width: '400px', height: '400px' }}
      className="mt-10 cursor-pointer"
    >
      <h2 className="text-3xl mb-4">User Statistics</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

UserStatisticsPieChart.propTypes = {
  keyMetrics: PropTypes.shape({
    totalActiveSubscribers: PropTypes.number.isRequired,
    totalUsers: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserStatisticsPieChart;
