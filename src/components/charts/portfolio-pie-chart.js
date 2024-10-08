import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Container, Spinner, Row, Col } from 'reactstrap';
import usePortfolioDataStore from '@/stores/usePortfolioDataStore';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PortfolioPieChart = () => {
  const { portfolioData, loading, latestFolderDate } = usePortfolioDataStore();
  if (loading) {
    return <Spinner className="text-customPink" />;
  }
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
        bottom: 20,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`,
        },
      },
      datalabels: {
        display: false, // Hide the datalabels by default
      },
    },
  };

  const portfolioTitles = [
    'Low-Volatility Portfolio',
    'Medium-Volatility Portfolio',
    'High-Volatility Portfolio',
  ];

  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl ">
      <h2 className="text-3xl text-white text-center mb-4">
        Portfolio Composition by Weight as of {latestFolderDate}
      </h2>
      <p className="text-center text-white text-sm mb-4">
        Hover for weight details
      </p>
      <Row>
        <Col md={4}>
          <h3 className="text-white text-center">{portfolioTitles[0]}</h3>
          <div
            className="flex justify-center items-center mt-4"
            style={{ height: '400px' }}
          >
            <Pie data={createChartData(portfolio1)} options={options} />
          </div>
        </Col>
        <Col md={4}>
          <h3 className="text-white text-center">{portfolioTitles[1]}</h3>
          <div
            className="flex justify-center items-center mt-4"
            style={{ height: '400px' }}
          >
            <Pie data={createChartData(portfolio2)} options={options} />
          </div>
        </Col>
        <Col md={4}>
          <h3 className="text-white text-center">{portfolioTitles[2]}</h3>
          <div
            className="flex justify-center items-center mt-4 "
            style={{ height: '400px' }}
          >
            <Pie data={createChartData(portfolio3)} options={options} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PortfolioPieChart;
