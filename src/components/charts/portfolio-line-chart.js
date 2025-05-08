import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Container } from 'reactstrap';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const PortfolioLineChart = ({ equityData, spyData }) => {
  const [normalizedEquity, setNormalizedEquity] = useState([]);
  const [normalizedSpy, setNormalizedSpy] = useState([]);

  useEffect(() => {
    if (equityData.length && spyData.length) {
      const formattedEquity = equityData.map((item) => ({
        date: new Date(item[''] || item.Date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        rawDate: item[''] || item.Date,
        value: parseFloat(item.Close),
      }));

      const formattedSpy = spyData.map((item) => ({
        date: new Date(item.datetime).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        rawDate: item.datetime,
        value: parseFloat(item.cumulative_PL),
      }));

      const spyMap = new Map(formattedSpy.map((d) => [d.rawDate, d]));
      const alignedEquity = formattedEquity.filter((d) =>
        spyMap.has(d.rawDate)
      );
      const alignedSpy = alignedEquity.map((d) => spyMap.get(d.rawDate));

      const baseEquity = alignedEquity[0]?.value || 1;
      const baseSpy = alignedSpy[0]?.value || 1;

      setNormalizedEquity(
        alignedEquity.map((item) => ({
          date: item.date,
          value: parseFloat(((item.value / baseEquity) * 100).toFixed(2)),
        }))
      );

      setNormalizedSpy(
        alignedSpy.map((item) => ({
          date: item.date,
          value: parseFloat(((item.value / baseSpy) * 100).toFixed(2)),
        }))
      );
    }
  }, [equityData, spyData]);

  const labels = normalizedEquity.map((item) => item.date);
  const equityClose = normalizedEquity.map((item) => item.value);
  const spyClose = normalizedSpy.map((item) => item.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Portfolio',
        data: equityClose,
        borderColor: '#4CAF50',
        borderWidth: 2,
        pointBackgroundColor: '#4CAF50',
        pointRadius: 4,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'SPY Benchmark',
        data: spyClose,
        borderColor: '#FF5733',
        borderWidth: 2,
        pointBackgroundColor: '#FF5733',
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
        ticks: { color: '#ddd' },
        grid: { color: '#444' },
      },
      y: {
        ticks: { color: '#ddd' },
        grid: { color: '#444' },
      },
    },
    plugins: {
      legend: {
        position: 'top', // default, but makes it explicit
        labels: {
          color: '#ddd',
        },
      },
      layout: {
        padding: {
          top: 30, // adds spacing below the legend
        },
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#eee',
      },
      datalabels: {
        color: (ctx) => {
          const datasetIndex = ctx.datasetIndex;
          return datasetIndex === 0 ? '#4CAF50' : '#FF5733';
        },
        font: {
          weight: 'bold',
          size: 13,
        },
        align: 'bottom',
        formatter: (value) => value.toFixed(1),
      },
    },
  };

  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl cursor-pointer">
      <h3 className="text-white text-3xl mb-8">Portfolio vs. SPY Benchmark</h3>{' '}
      <div style={{ height: '500px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Container>
  );
};

PortfolioLineChart.propTypes = {
  equityData: PropTypes.arrayOf(
    PropTypes.shape({
      Date: PropTypes.string,
      Close: PropTypes.string,
    })
  ).isRequired,
  spyData: PropTypes.arrayOf(
    PropTypes.shape({
      Date: PropTypes.string,
      Close: PropTypes.string,
    })
  ).isRequired,
};

export default PortfolioLineChart;
