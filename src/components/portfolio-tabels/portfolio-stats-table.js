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
    1: 'Low-Volatility Portfolio',
    2: 'Medium-Volatility Portfolio',
    3: 'High-Volatility Portfolio',
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
    <div className=" bg-customBlack lg:p-5 p-4 rounded-2xl ">
      <h1 className="text-white text-3xl pb-4">
        Portfolio Quick Statistics (Simple Growth)
      </h1>
      <div className="lg:flex lg:justify-center mb-4 grid gap-2">
        {['Inception'].map(
          (
            type // delete 'Monthly', 'YTD'
          ) => (
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
          )
        )}
      </div>
      <Table
        className="text-white"
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
              <th key={column} className="px-4 py-2 text-center">
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
