import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import useEtfDataStore from '@/stores/useEtfDataStore';
import { Button, Spinner } from 'reactstrap';

const EtfReturnsBarChart = () => {
  const { EtfData, loading } = useEtfDataStore();
  const [activePortfolio, setActivePortfolio] = useState(1);

  // Portfolio Titles
  const portfolioTitles = [
    'Low-Volatility Portfolio',
    'Medium-Volatility Portfolio',
    'High-Volatility Portfolio',
  ];

  // Extract unique portfolio numbers and sort them
  const portfolios = [...new Set(EtfData.map((item) => item.Portfolio))].sort(
    (a, b) => a - b
  );

  const filteredData = EtfData.filter(
    (item) => item.Portfolio === String(activePortfolio)
  ).map((item) => ({
    ticker: item.Ticker,
    dailyReturn: (item.daily_return * 100).toFixed(2), // Converts daily return to percentage
  }));

  if (loading) {
    return <Spinner className="text-customPink" />;
  }

  return (
    <div>
      <div className="flex gap-2 justify-center pb-4">
        {portfolios.map((portfolio, index) => (
          <Button
            className="bg-customPink hover:bg-customPinkSecondary border-none"
            key={portfolio}
            onClick={() => setActivePortfolio(portfolio)}
          >
            {portfolioTitles[index]}
          </Button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ticker" />
          <YAxis />
          <Tooltip
            formatter={(value) => `${value}%`} // Adds % to tooltip values
            labelFormatter={(label) => `Ticker: ${label}`} // Tooltip label formatter
          />
          <Legend />
          <Bar dataKey="dailyReturn" name="Daily Return (%)" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EtfReturnsBarChart;
