import { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';

const PortfolioStatsTable = ({ performanceData }) => {
  const [activeType, setActiveType] = useState('Inception');
  const columns = [
    'Portfolio',
    'Max Daily Return [%]',
    'Max Drawdown [%]',
    'Sharpe Ratio',
    'Sortino Ratio',
    'Total Performance [%]',
  ];

  const portfolioNames = {
    Portfolio_1: 'Low-Volatility Portfolio',
    Portfolio_2: 'Medium-Volatility Portfolio',
    Portfolio_3: 'High-Volatility Portfolio',
    SPY: 'SPY',
  };

  const roundToThree = (num) => {
    return num ? Number(num).toFixed(3) : '-';
  };

  const getStatsData = (type) => {
    if (!performanceData.data || !performanceData.data[type]) {
      return [];
    }

    const typeData = performanceData.data[type];
    const portfolioKeys = Object.keys(typeData).filter(
      (key) => key.includes('Portfolio_') || key === 'SPY'
    );

    const stats = portfolioKeys.map((key) => {
      const portfolioData = typeData[key];
      return {
        portfolio:
          portfolioNames[key] || key.replace('Portfolio_', 'Portfolio '),
        maxDailyReturn: roundToThree(portfolioData['Max Daily Return [%]']),
        maxDrawdown: roundToThree(portfolioData['Max Drawdown [%]']),
        sharpeRatio: roundToThree(portfolioData['Sharpe Ratio']),
        sortinoRatio: roundToThree(portfolioData['Sortino Ratio']),
        totalPerformance: roundToThree(portfolioData['Total Performance [%]']),
      };
    });

    return stats;
  };

  const tableData = getStatsData(activeType);

  return (
    <div className=" bg-customBlack lg:p-5 p-2 rounded-2xl ">
      <div className="lg:flex lg:justify-center mb-4 grid gap-2">
        {['Inception', 'Monthly', 'YTD'].map((type) => (
          <Button
            key={type}
            className={`px-4 py-2 mx-2 text-white border-none ${
              activeType === type
                ? 'bg-customPink hover:bg-customPinkSecondary'
                : 'bg-gray-500'
            }`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </Button>
        ))}
      </div>
      <Table
        className="font-sans text-white"
        dark
        hover
        responsive
        style={{
          borderRadius: '1rem',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} className="  px-4 py-2 text-center ">
                <p>{column}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className=" px-4 py-2 text-left ">{row.portfolio}</td>
              <td className="  px-4 py-2 text-center">{row.maxDailyReturn}</td>
              <td className=" px-4 py-2 text-center">{row.maxDrawdown}</td>
              <td className="  px-4 py-2 text-center">{row.sharpeRatio}</td>
              <td className="px-4 py-2 text-center">{row.sortinoRatio}</td>
              <td className=" px-4 py-2 text-center">{row.totalPerformance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

PortfolioStatsTable.propTypes = {
  performanceData: PropTypes.object.isRequired,
};

export default PortfolioStatsTable;
