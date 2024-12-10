import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const EtfReturnsBarChart = ({ EtfData }) => {
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
        <BarChart width={500} height={300} data={filteredData}>
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
EtfReturnsBarChart.propTypes = {
  EtfData: PropTypes.arrayOf(
    PropTypes.shape({
      '': PropTypes.string.isRequired, // Assuming this represents an identifier
      Allocation: PropTypes.string.isRequired, // Allocation is a string
      Portfolio: PropTypes.string.isRequired, // Portfolio number as a string
      Price_today: PropTypes.string.isRequired, // Today's price as a string
      Price_yesterday: PropTypes.string.isRequired, // Yesterday's price as a string
      Ticker: PropTypes.string.isRequired, // Ticker symbol
      daily_return: PropTypes.string.isRequired, // Daily return as a string
    })
  ).isRequired,
};
export default EtfReturnsBarChart;
