import { useState } from 'react';
import PropTypes from 'prop-types';

const PortfolioStatsTable = ({ performanceData }) => {
  const [activeType, setActiveType] = useState('Inception'); // State to handle active type

  // Define the columns to be displayed in the table
  const columns = [
    'Portfolio',
    'Max Daily Return [%]',
    'Max Drawdown [%]',
    'Sharpe Ratio',
    'Sortino Ratio',
    'Total Performance [%]',
  ];

  // Function to dynamically get data for the selected type
  const getStatsData = (type) => {
    const typeKeys = Object.keys(performanceData.data[type]);

    // Filter only portfolio keys
    const portfolioKeys = typeKeys.filter(
      (key) => key.includes('Portfolio_') && key.includes('metrics')
    );

    // Extract relevant stats for each portfolio
    const stats = portfolioKeys.map((key) => {
      const portfolioData = performanceData.data[type][key]?.data?.[0];
      return {
        portfolio: key.split('_')[1], // Extract portfolio number from the key
        maxDailyReturn: portfolioData['Max Daily Return [%]'],
        maxDrawdown: portfolioData['Max Drawdown [%]'],
        sharpeRatio: portfolioData['Sharpe Ratio'],
        sortinoRatio: portfolioData['Sortino Ratio'],
        totalPerformance: portfolioData['Total Performance [%]'],
      };
    });

    return stats;
  };

  // Get the data for the currently active type
  const tableData = getStatsData(activeType);

  return (
    <div>
      {/* Buttons to switch between data types */}
      <div className="flex justify-center mb-4">
        {['Inception', 'Monthly', 'YTD'].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 mx-2 text-white ${
              activeType === type ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table to display stats */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border border-gray-300 px-4 py-2 bg-gray-100 text-center"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="border border-gray-200">
              <td className="border border-gray-300 px-4 py-2 text-center">
                Portfolio {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.maxDailyReturn ?? '-'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.maxDrawdown ?? '-'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.sharpeRatio ?? '-'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.sortinoRatio ?? '-'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.totalPerformance ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

PortfolioStatsTable.propTypes = {
  performanceData: PropTypes.object.isRequired,
};

export default PortfolioStatsTable;
