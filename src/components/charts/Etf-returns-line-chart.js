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
  console.log(EtfData);
  const [activePortfolio, setActivePortfolio] = useState(1);
  const portfolioTitles = [
    'Low-Volatility Portfolio',
    'Medium-Volatility Portfolio',
    'High-Volatility Portfolio',
  ];
  const portfolios = [
    ...new Set(
      EtfData.map((item) => parseFloat(item.Portfolio)).filter((value) =>
        [1, 2, 3].includes(value)
      )
    ),
  ].sort((a, b) => a - b);
  const filteredData = EtfData.filter(
    (item) => parseFloat(item.Portfolio) === parseFloat(activePortfolio)
  ).map((item) => ({
    ticker: item.Ticker,
    dailyReturn: parseFloat((item.daily_return * 100).toFixed(2)),
  }));
  if (loading) {
    return <Spinner className="text-customPink" />;
  }

  return (
    <div className="bg-customBlack lg:p-5 p-4 rounded-2xl  ">
      <h2 className="text-3xl text-white text-center mb-4">
        Daily Returns for Each ETF
      </h2>
      <div className="lg:flex gap-2 lg:justify-center grid pb-4">
        {portfolios.map((portfolio, index) => (
          <Button
            className="bg-customPink hover:bg-customPinkSecondary border-none "
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
            formatter={(value) => `${value}%`}
            labelFormatter={(label) => `Ticker: ${label}`}
          />
          <Legend />
          <Bar dataKey="dailyReturn" name="Daily Return (%)" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EtfReturnsBarChart;
