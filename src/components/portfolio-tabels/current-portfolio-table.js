import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

export default function CurrentPortfolioTable({ portfolioValues }) {
  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl text-white">
      <h3 className="text-white text-3xl mb-4">
        Current Portfolio Composition
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-[#2c2c2c]">
            <tr>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Value ($)</th>
              <th className="px-4 py-2">Avg. Price</th>
              <th className="px-4 py-2">Unrealized Profit ($)</th>
              <th className="px-4 py-2">Unrealized Profit (%)</th>
              <th className="px-4 py-2">Allocation (%)</th>
            </tr>
          </thead>
          <tbody>
            {portfolioValues.map((item) => (
              <tr key={item.symbol} className="border-b border-gray-700">
                <td className="px-4 py-2">{item.symbol}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">${item.value}</td>
                <td className="px-4 py-2">${item.average_price}</td>
                <td className="px-4 py-2">{item.unrealized_profit}</td>
                <td className="px-4 py-2">
                  {item.unrealized_profit_percentage}%
                </td>
                <td className="px-4 py-2">
                  {parseFloat(item.allocation_percent).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

CurrentPortfolioTable.propTypes = {
  portfolioValues: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      average_price: PropTypes.string.isRequired,
      unrealized_profit: PropTypes.string.isRequired,
      unrealized_profit_percentage: PropTypes.string.isRequired,
      allocation_percent: PropTypes.string.isRequired,
    })
  ).isRequired,
};
