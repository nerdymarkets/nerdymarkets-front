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
import useWindowDimensions from '@/hooks/useWindowDimension';

const PortfolioLineChart = ({ equityData, spyData }) => {
  const [normalizedEquity, setNormalizedEquity] = useState([]);
  const [normalizedSpy, setNormalizedSpy] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  useEffect(() => {
    if (spyData.length) {
      const lastDate = new Date(spyData.at(-1).datetime);
      const firstDate = new Date(lastDate);
      firstDate.setDate(firstDate.getDate() - 30);
      setStartDate(firstDate.toISOString().split('T')[0]);
      setEndDate(lastDate.toISOString().split('T')[0]);
    }
  }, [spyData]);
  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    const parseDate = (d) => new Date(d);
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const formattedEquity = equityData
      .filter((item) => {
        const date = parseDate(item[''] || item.Date);
        return date >= start && date <= end;
      })
      .map((item) => ({
        date: new Date(item[''] || item.Date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        rawDate: item[''] || item.Date,
        value: parseFloat(item.Close),
      }));

    const formattedSpy = spyData
      .filter((item) => {
        const date = parseDate(item.datetime);
        return date >= start && date <= end;
      })
      .map((item) => ({
        date: new Date(item.datetime).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        rawDate: item.datetime,
        value: parseFloat(item.cumulative_PL),
      }));

    const spyMap = new Map(formattedSpy.map((d) => [d.rawDate, d]));
    const alignedEquity = formattedEquity.filter((d) => spyMap.has(d.rawDate));
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
  }, [equityData, spyData, startDate, endDate]);
  const visibleCount = isMobile ? 5 : normalizedEquity.length;

  const labels = normalizedEquity.slice(-visibleCount).map((item) => item.date);
  const equityClose = normalizedEquity
    .slice(-visibleCount)
    .map((item) => item.value);
  const spyClose = normalizedSpy
    .slice(-visibleCount)
    .map((item, index) => normalizedSpy.slice(-visibleCount)[index].value);

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
        position: 'top',
        labels: {
          color: '#ddd',
        },
      },
      layout: {
        padding: {
          top: 30,
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
    <Container className="bg-[#1a1a1a]  p-3  rounded-2xl ">
      <h3 className="text-white text-xl sm:text-2xl lg:text-3xl mb-8">
        Portfolio vs. SPY Benchmark
      </h3>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2 ">
          <label className="text-white">Starტ</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-black p-1.5 rounded-2xl cursor-pointer bg-gray-300"
          />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <label className="text-white">End</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-black p-1.5 rounded-2xl cursor-pointer bg-gray-300"
          />
        </div>
      </div>
      <div style={{ height: '500px' }}>
        <Line
          data={chartData}
          options={chartOptions}
          className="cursor-pointer"
        />
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
