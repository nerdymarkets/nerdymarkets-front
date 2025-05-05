import PropTypes from 'prop-types';
import { Container, Table } from 'reactstrap';

export default function HistoricalOrdersTable({ orders }) {
  return (
    <Container className="bg-[#1a1a1a] lg:p-5 p-4 rounded-2xl mt-8">
      <h3 className="text-white text-3xl mb-4">
        Transactions – Historical Changes to Portfolio
      </h3>
      <div className="overflow-x-auto">
        <Table dark striped bordered responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.Time}</td>
                <td>{order.Symbol}</td>
                <td>{order.Quantity}</td>
                <td>{order.Price}</td>
                <td>{order.Value}</td>
                <td>{order.Status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

HistoricalOrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      Time: PropTypes.string.isRequired,
      Symbol: PropTypes.string.isRequired,
      Quantity: PropTypes.string.isRequired,
      Price: PropTypes.string.isRequired,
      Value: PropTypes.string.isRequired,
      Status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
