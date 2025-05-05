import { Container, Table } from 'reactstrap';
import PropTypes from 'prop-types';

export default function PortfolioStatsTable({ metricsData }) {
  const stats = metricsData?.[0];

  if (!stats) {
    return null;
  }

  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl">
      <h3 className="text-white text-3xl mb-4">Portfolio Quick Statistics</h3>
      <div className="overflow-x-auto">
        <Table dark bordered hover responsive className="text-white">
          <tbody>
            {Object.entries(stats).map(([key, value]) => (
              <tr key={key}>
                <th className="text-capitalize text-[#bbb]">{key}</th>
                <td className="text-white">{value}</td>
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
