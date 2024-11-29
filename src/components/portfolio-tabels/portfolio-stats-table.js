import { Table } from 'reactstrap';
import useDailyInceptionDataStore from '@/stores/useDailyInceptionDataStore';

const PortfolioStatsTable = () => {
  const daily = useDailyInceptionDataStore((state) => state.daily);

  const columns = [
    'Portfolio',
    'Daily Return [%]',
    'Cumulative PL [%]',
    'Total Return [%]',
    'Previous Balance',
    'Current Balance',
  ];

  const portfolioNames = {
    1: 'Low-Volatility Portfolio',
    2: 'Medium-Volatility Portfolio',
    3: 'High-Volatility Portfolio',
  };

  const roundToTwo = (num) => {
    return num ? Number(num).toFixed(2) : '-';
  };

  const getStatsData = () => {
    if (!daily || daily.length === 0) {
      return [];
    }

    return daily.map((portfolio) => ({
      portfolio:
        portfolioNames[portfolio.Portfolio] ||
        `Portfolio ${portfolio.Portfolio}`,
      dailyReturn: portfolio.DailyReturn || '-',
      cumulativePL: portfolio.CumulativePL || '-',
      totalReturn: roundToTwo(portfolio.TotalReturn),
      previousBalance: roundToTwo(portfolio.PreviousBalance),
      currentBalance: roundToTwo(portfolio.CurrentBalance),
    }));
  };

  const tableData = getStatsData();

  return (
    <div className="bg-customBlack lg:p-5 p-4 rounded-2xl">
      <h1 className="text-white text-3xl pb-4">Portfolio Daily Statistics</h1>
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
              <td className="px-4 py-2 text-left">{row.portfolio}</td>
              <td className="px-4 py-2 text-center">{row.dailyReturn}</td>
              <td className="px-4 py-2 text-center">{row.cumulativePL}</td>
              <td className="px-4 py-2 text-center">{row.totalReturn}</td>
              <td className="px-4 py-2 text-center">{row.previousBalance}</td>
              <td className="px-4 py-2 text-center">{row.currentBalance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PortfolioStatsTable;
