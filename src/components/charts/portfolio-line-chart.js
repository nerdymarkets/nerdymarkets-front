import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Container,
  Spinner,
  Input,
  Button,
  FormGroup,
  Label,
} from 'reactstrap';
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

  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [useCustomDates, setUseCustomDates] = useState(false);
  const firstDate = equityData.length > 0 ? equityData[0][''] : null;
  const lastDate =
    equityData.length > 0 ? equityData[equityData.length - 1][''] : null;
  useEffect(() => {
    if (equityData.length > 0) {
      handleLast31Days();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equityData]);

  const handleLast31Days = () => {
    const currentDate = new Date();
    const past31Days = new Date();
    past31Days.setDate(currentDate.getDate() - 31);

    const filtered = equityData.filter((item) => {
      const itemDate = new Date(item['']);
      return itemDate >= past31Days && itemDate <= currentDate;
    });
    const formattedData = filtered.map((item) => ({
      date: new Date(item['']).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      portfolio1: parseFloat(item['1']) || 0,
      portfolio2: parseFloat(item['2']) || 0,
      portfolio3: parseFloat(item['3']) || 0,
      spy: parseFloat(item.SPY) || 0,
    }));

    setFilteredData(formattedData);
  };

  const handleFilterDates = () => {
    if (startDate && endDate) {
      const filtered = equityData.filter((item) => {
        const itemDate = new Date(item['']);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return itemDate >= startDateObj && itemDate <= endDateObj;
      });

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
    }
  };

  const handleToggleCustomDates = () => {
    if (!useCustomDates) {
      handleLast31Days();
    }
    setUseCustomDates(!useCustomDates);
  };

  const labels = filteredData.map((item) => item.date || '');
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
          callback: function (value) {
            if (useCustomDates) {
              return '';
            }
            return this.getLabelForValue(value);
          },
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
        All Portfolios vs. SPY Benchmark
      </h3>

      <div className="mb-4">
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={useCustomDates}
              onChange={handleToggleCustomDates}
            />
            <p className="text-white">Use Custom Date Range</p>
          </Label>
        </FormGroup>
      </div>
      <div className="flex  justify-center">
        {useCustomDates && (
          <div>
            <div className="mb-1.5 flex  gap-x-4">
              <div>
                <label className="text-white">Start Date: </label>
                <Input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={firstDate}
                  max={lastDate}
                />
              </div>
              <div>
                <label className="text-white">End Date: </label>
                <Input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || firstDate}
                  max={lastDate}
                />
              </div>
            </div>
            <div>
              <Button
                onClick={handleFilterDates}
                disabled={!startDate || !endDate}
                className="rounded-lg bg-customPink hover:bg-customPinkSecondary border-none"
              >
                Apply Filter
              </Button>
            </div>
          </div>
        )}
      </div>

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
