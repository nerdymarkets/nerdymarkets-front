import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useLatestPortfolio from '@/hooks/latest-portfolio';
import { Container, Spinner } from 'reactstrap';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PortfolioPieChart = () => {
  const { data, loading, latestFolderDate } = useLatestPortfolio();

  if (loading) {
    return <Spinner className="text-customPink" />;
  }

  const labels = data.map((item) => item.Ticker);
  const dataValues = data.map((item) => item.Allocation * 100);

  const latestPortfolioData = {
    labels,
    datasets: [
      {
        label: 'Portfolio Composition (Weights)',
        data: dataValues,
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
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          },
        },
      },
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'start',
        offset: 10,
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label} (${value.toFixed(2)}%)`;
        },
        textAlign: 'center',
        font: {
          size: 12,
          weight: 'bold',
        },
        padding: {
          top: 5,
          bottom: 5,
        },
      },
    },
  };
  return (
    <Container className="py-20 ">
      <h2>
        Current Portfolio Composition (Holdings by Weights){latestFolderDate}
      </h2>

      <div className="flex justify-center items-center mt-4">
        <Pie
          data={latestPortfolioData}
          options={options}
          width={1000}
          height={700}
        />
      </div>
    </Container>
  );
};

export default PortfolioPieChart;
