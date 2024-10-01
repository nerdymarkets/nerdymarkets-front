import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, Spinner, Button } from 'reactstrap';
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
  const [filteredData, setFilteredData] = useState(equityData);
  const [activeButton, setActiveButton] = useState('currentMonth');

  useEffect(() => {
    if (equityData.length > 0) {
      handleCurrentMonthClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equityData]);

  const getMonthFromDate = (dateString) => {
    return new Date(dateString).getMonth() + 1;
  };

  const getYearFromDate = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  const handleCurrentMonthClick = () => {
    const currentMonth = new Date().getMonth() + 1;
    let filtered = equityData.filter(
      (item) => getMonthFromDate(item['']) === currentMonth
    );

    let fallbackMonth = currentMonth;
    while (filtered.length === 0 && fallbackMonth > 0) {
      fallbackMonth--;
      filtered = equityData.filter(
        (item) => getMonthFromDate(item['']) === fallbackMonth
      );
    }

    const formattedData = filtered.map((item) => ({
      date: new Date(item['']).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      portfolio1: parseFloat(item['1.0']) || 0,
      portfolio2: parseFloat(item['2.0']) || 0,
      portfolio3: parseFloat(item['3.0']) || 0,
      spy: parseFloat(item.SPY) || 0,
    }));

    setFilteredData(formattedData);
    setActiveButton('currentMonth');
  };

  const handleLastSixMonthsClick = () => {
    const currentDate = new Date();
    const lastSixMonths = [];

    for (let i = 0; i < 6; i++) {
      const month = currentDate.getMonth() + 1 - i;
      const year = currentDate.getFullYear();
      lastSixMonths.push({ month, year });
    }

    const aggregatedData = lastSixMonths.map(({ month, year }) => {
      const monthData = equityData.filter(
        (item) =>
          getMonthFromDate(item['']) === month &&
          getYearFromDate(item['']) === year
      );
      const avgPortfolio1 =
        monthData.reduce((sum, item) => sum + parseFloat(item['1.0'] || 0), 0) /
          monthData.length || 0;
      const avgPortfolio2 =
        monthData.reduce((sum, item) => sum + parseFloat(item['2.0'] || 0), 0) /
          monthData.length || 0;
      const avgPortfolio3 =
        monthData.reduce((sum, item) => sum + parseFloat(item['3.0'] || 0), 0) /
          monthData.length || 0;
      const avgSpy =
        monthData.reduce((sum, item) => sum + parseFloat(item.SPY || 0), 0) /
          monthData.length || 0;

      return {
        month: new Date(year, month - 1).toLocaleString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        portfolio1: avgPortfolio1,
        portfolio2: avgPortfolio2,
        portfolio3: avgPortfolio3,
        spy: avgSpy,
      };
    });
    aggregatedData.sort((a, b) => new Date(a.month) - new Date(b.month));

    setFilteredData(aggregatedData);
    setActiveButton('lastSixMonths');
  };

  const labels = filteredData.map((item) =>
    activeButton === 'lastSixMonths' ? item.month : item.date || ''
  );

  const portfolio1 = filteredData.map((item) => item.portfolio1 || 0);
  const portfolio2 = filteredData.map((item) => item.portfolio2 || 0);
  const portfolio3 = filteredData.map((item) => item.portfolio3 || 0);
  const spy = filteredData.map((item) => item.spy || 0);

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
        label: 'High-Volatility Portfolio',
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
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl ">
      <h3 className="text-white text-3xl mb-4">
        All Portfolios VS SPY Benchmarks
      </h3>
      <Button
        color={activeButton === 'currentMonth' ? 'primary' : 'secondary'}
        onClick={handleCurrentMonthClick}
        className={`mr-2  ${activeButton === 'currentMonth' ? 'bg-customPink hover:bg-customPinkSecondary' : ''} border-none`}
      >
        Current
      </Button>
      <Button
        onClick={handleLastSixMonthsClick}
        className={`mr-2  ${activeButton === 'lastSixMonths' ? 'bg-customPink hover:bg-customPinkSecondary' : ''} border-none`}
      >
        6-Month Avg
      </Button>
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
