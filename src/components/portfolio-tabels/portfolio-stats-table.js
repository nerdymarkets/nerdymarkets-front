import { Container, Table } from 'reactstrap';
import PropTypes from 'prop-types';

export default function PortfolioStatsTable({ metricsData }) {
  const stats = metricsData?.[0];

  if (!stats) {
    return null;
  }

  const formatCurrency = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return value;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(num);
  };
  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl cursor-pointer">
      <h3 className="text-white text-xl sm:text-2xl lg:text-3xl mb-4">
        Portfolio Quick Statistics
      </h3>
      <div className="overflow-x-auto">
        <Table dark bordered hover responsive className="text-white">
          <tbody>
            {Object.entries(stats).map(([key, value]) => (
              <tr key={key}>
                <th className="text-capitalize text-[#bbb]">{key}</th>
                <td className="text-white">
                  {key === 'Starting Capital' ? formatCurrency(value) : value}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

PortfolioStatsTable.propTypes = {
  metricsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
