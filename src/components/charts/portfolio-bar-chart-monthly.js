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

const PortfolioBarChartMonthly = ({ monthlyData }) => {
  // Extract the array from the monthlyData object
  const monthlyDataArray = Object.values(monthlyData).flat();

  // Extract unique days
  const days = Array.from(
    new Set(
      monthlyDataArray
        .map((dayData) => {
          const dayMatch = dayData.key.match(/\/(\d{4}-\d{2}-\d{2})\//); // Extract date in YYYY-MM-DD format
          return dayMatch ? dayMatch[1] : null; // Return the extracted date or null
        })
        .filter((day) => day) // Filter out any null values
    )
  );

  // Extract unique portfolios
  const portfolios = Array.from(
    new Set(
      monthlyDataArray.map(
        (dayData) =>
          dayData.key.match(/Portfolio_(\d+)_metrics_this_month\.csv/)[1]
      )
    )
  );

  // Preparing data for each portfolio
  const datasets = portfolios.map((portfolio, index) => {
    // Filter data for the current portfolio
    const portfolioData = monthlyDataArray.filter((dayData) =>
      dayData.key.includes(`Portfolio_${portfolio}_metrics_this_month.csv`)
    );

    // Extract 'Total Performance [%]' for each day
    const data = days.map((day) => {
      const dayPortfolioData = portfolioData.find((dayData) =>
        dayData.key.includes(`/${day}/`)
      );
      if (!dayPortfolioData || !dayPortfolioData.data[0]) {
        return 0;
      }
      const { 'Total Performance [%]': totalPerformance } =
        dayPortfolioData.data[0];
      return totalPerformance;
    });

    return {
      label: `Portfolio ${portfolio}`,
      data: data,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'][index % 3],
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: days,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Monthly Total Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Performance [%]',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

PortfolioBarChartMonthly.propTypes = {
  monthlyData: PropTypes.object.isRequired,
};

export default PortfolioBarChartMonthly;
